express = require 'express'
app     = express()
builder = require './routebuilder'
routes  = require './routes'

builder app, routes, '.', 'controllers'

app.listen 8000;