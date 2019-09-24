Q              = require 'q'
_              = require 'underscore'
path           = require 'path'
fs             = require 'fs'

FN_ARGS        = /^function\s*[^\(]*\(\s*([^\)]*)\)/m
FN_ARG_SPLIT   = /\s*,\s*/
STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg
REQUEST_PARAMS =
  body       : true
  query      : true
  url        : true
  headers    : true
  params     : true
  files      : true
  cookies    : true
  protocol   : true
  form       : true
  statusCode : true

SERIALIZERS =
  html :
    success : (req, res, result) ->
      res.send(result)
    fail    : (req, res, err) ->
      res.send 500, err.toString()
  json :
    success : (req, res, result) ->
      res.statusCode = if req.method == "POST" then 201 else 200
      res.json res.statusCode,
        status : 'success'
        data   : result
    fail : (req, res, err) ->
      err.statusCode = err.status || 500
      res.json err.statusCode,
        status : 'error'
        data   : err.toString()
  file : 
    success : (req, res, result) ->
      fileName = ''
      filePath = ''
      fileType = 'application/octet-stream'

      if typeof result == 'object'
        filePath = result.path
        fileName = result.name || path.basename filePath
        fileName = escape fileName
        fileType = result.type if result.type
      else
        filePath = result
        fileName = path.basename filePath
        fileName = escape fileName

      res.setHeader('Content-disposition', "attachment; filename=#{fileName}")
      res.setHeader('Content-Type', fileType) if fileType

      filestream = fs.createReadStream(filePath)
      filestream.pipe(res)
    fail : (req, res, err) ->
      err.statusCode = err.status
      res.json err.statusCode,
        status: 'error'
        data: err.message

initializeController = (app, routes, controllerName, basePath = '.') ->
  controller   = require "#{basePath}/controllers/#{controllerName}"
  [dependencies, injectors, serializers] = loadConfig controller, basePath

  for routeName, controllerAction of routes
    [method, url] = controllerAction.split /\s+/, 2
    routeConfig   = controller.requests[routeName]
    middleware    = []

    unless routeConfig
      throw new Error("Missing controller action '#{controllerAction}' on controller '#{controllerName}' for route '#{routeName}'")
    
    lastHandler = routeConfig[routeConfig.length - 1]
    lastKey     = 'json'

    # get the last handler from the routeConfig
    if typeof lastHandler == 'object'
      lastKey = Object.keys(lastHandler).pop()

    {success, fail} = serializers[lastKey]

    if (!success)
      throw new Error("Could not find a success serializer of type #{lastKey}")

    if (!fail)
      throw new Error("Could not find a fail serializer of type #{lastKey}")

    for handlers, index in routeConfig
      if typeof handlers == 'object'
        for handlerName, handler of handlers
          middleware.push addMiddleware(handler, handlerName, dependencies, injectors)
      else
        middleware.push addMiddleware(handlers, '', dependencies, injectors)

    registerRoute app, method, url, middleware, success, fail
    

registerRoute = (app, method, url, middleware, success, fail) ->
  app[method] url, (req, res) ->
    req.$scope = {}
    callMiddleware(middleware, 0, req, res)
      .then (result) ->
        success(req, res, result)
      .fail (err) ->
        fail(req, res, err)

callMiddleware = (middleware, index, req, res) ->
  middleware[index++](req, res)
    .then (result) ->
      if middleware[index]
        return callMiddleware(middleware, index, req, res)
      else
        return result

loadConfig = (controller, basePath) ->
  results = []
  config  = if controller.config then require "#{basePath}/#{controller.config}" else {}

  for option in ['dependencies', 'injectors', 'serializers']
    list = _.extend({}, config[option] || {}, controller[option] || {})
    if option == 'dependencies'
      results.push loadDependencies(list, basePath)
    else if option == 'injectors'
      results.push loadInjectors(list)
    else if option == 'serializers'
      results.push loadSerializers(list)

  return results

loadDependencies = (dependenciesList, basePath) ->
  dependencies = {}

  for name, dependency of dependenciesList
    if typeof dependency == 'string'
      dependencies[name] = require "#{basePath}/#{dependency}"
    else if typeof dependency == 'object' && dependency.path?
      dependencies[name] = require "#{basePath}/#{dependency.path}"
      dependencies[name] = dependency.filter(dependencies[name]) if dependency.filter
    else
      dependencies[name] = dependency

  return dependencies

loadInjectors = (injectorsList) ->
  injectors = {}

  for name, fn of injectorsList
    injectors[name] =
      args     : getArgs(fn)
      fn       : fn

  return injectors

loadSerializers = (serializersList) ->
  serializers = clone SERIALIZERS

  for name, serializer of serializersList
    type = typeof serializer
    if type == 'function'
      serializers[name].fail    = serializer
      serializers[name].success = (req, res, result) ->
        serializer.call {}, req, res, null, result
    else if type == 'object'
      serializers[name].fail    = serializer.fail    if serializer.fail
      serializers[name].success = serializer.success if serializer.success
    else
      throw new Error("unsuppored serializer type, expected function or object and received #{type}")

  return serializers

clone = (obj) ->
  if not obj? or typeof obj isnt 'object'
    return obj

  newInstance = {}

  for key of obj
    newInstance[key] = clone obj[key]

  return newInstance


addMiddleware = (fn, fnName, dependencies, injectors) ->
  unless typeof fn == 'function'
    throw new Error('unsupported handler type, expected object or function and received "' + typeof fn + '"')

  store    = fnName.match(/^\$.*/)
  argNames = getArgs fn
  injected = true
  injected &= Boolean(arg.match /^\$.*/) for arg in argNames
  
  # bypass injection if this is standard middleware
  if !injected && argNames?.length
    return (req, res) ->
      Q().then ->
        # if asking for 3 args, pass in a callback method
        if (fn.length == 3)
          deferred = Q.defer()
          fn(req, res, (err) ->
            if (err)
              deferred.reject(err)
            else
              deferred.resolve()
          )
          return deferred.promise
        else
          return fn(req, res)
  
  return (req, res) ->
    callWithInjectedArgs(fn, {}, argNames, req, dependencies, injectors)
      .then (result) ->
        req.$scope[fnName] = result if store
        return result

getArgs = (fn) ->
  fnStr = fn.toString().replace(STRIP_COMMENTS, "")
  args  = fnStr.match(FN_ARGS)[1].split(FN_ARG_SPLIT)

  (if args.length is 1 and args[0] is "" then [] else args)

callWithInjectedArgs = (fn, scope, argNames, req, dependencies, injectors) ->
  injectedArgs = argNames.map (arg) ->
    arg = arg.substr(1) # strip off the leading $

    if req.$scope? and "$#{arg}" of req.$scope
      return req.$scope["$#{arg}"]
    else if arg of REQUEST_PARAMS
      return req[arg]
    else if injectors[arg]
      return callWithInjectedArgs(
        injectors[arg].fn, {}, injectors[arg].args,
        req, dependencies, injectors
      )
    else if dependencies[arg]
      return dependencies[arg]
    else
      return require arg

  if not injectedArgs.length
    Q().then () -> fn.call(scope) 
  else
    Q.all(injectedArgs)
      .then (resolvedArgs) ->
        req.$scope[arg] = resolvedArgs[index] for arg, index in argNames
        return fn.apply(scope, resolvedArgs)

module.exports = (app, routeMap, basePath) ->
  for controllerName, routes of routeMap
    initializeController app, routes, controllerName, basePath
