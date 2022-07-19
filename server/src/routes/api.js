
const exporess = require('express');

const api = exporess.Router();


const planetsRouter = require('./planets.router')
api.use('/planets', planetsRouter)


const launchesRouter = require('./launches.router')
api.use('/launches', launchesRouter)



module.exports = api;
