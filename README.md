![Open Source Love](https://img.shields.io/badge/Open%20Source-%E2%9D%A4-red.svg)
![GitHub](https://img.shields.io/github/license/thisdot/node-enterprise-setup-shell.svg)
![GitHub forks](https://img.shields.io/github/forks/thisdot/node-enterprise-setup-shell.svg)
![GitHub issues](https://img.shields.io/github/issues/thisdot/node-enterprise-setup-shell.svg)
![GitHub pull requests](https://img.shields.io/github/issues-pr/thisdot/node-enterprise-setup-shell.svg)
![GitHub contributors](https://img.shields.io/github/contributors/thisdot/node-enterprise-setup-shell.svg)
![GitHub top language](https://img.shields.io/github/languages/top/thisdot/node-enterprise-setup-shell.svg)

# Node Enterprise Setup Shell

This is the shell project to get you started with NodeJS in Enterprise.

## How to use it?

Very simple if you are starting into the NodeJS world (if you have some knowledge on it) clone this repo and start working on the enterprise project.

## Tools/Code

This project has several tools/Code already setup for you:

<ul>
    <li>NodeJS</li>
    <li>ExpressJS</li>
    <li>MongoDB Connection</li>
    <li>Routes</li>
    <li>Schema file</li>
    <li>Moca/Chai</li>
    <li>Grunt</li>
    <li>Nodemon</li>
    <li>Middlewares</li>
    <li>Test coverage with NYC</li>
</ul>

## Setup database configuration
- `cp .env.example .env`
- Set required credential in .env

## Run the project

`npm start`

If you take a look to the package.json file, you can see I'm using nodemon to run and watch your files.

## Run the test

`npm test`
If you take a look to the package.json file, you can see I'm using mocha to run and watch your files.

## Run the test coverage

`npm coverage`
If you take a look to the package.json file, you can see I'm using nyc to create the test coverage report as a html file and running my npm test commands.

## Contribute this Open Source project

<ul>
    <li>Fork the repo</li>
    <li>Star the repo</li>
    <li>Submit a PR</li>
</ul>

## License

-MIT
