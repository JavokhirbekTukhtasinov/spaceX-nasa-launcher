const express = require('express')
const launchesRouter = express.Router()
const {getLaunches , addNewLaunches} = require('../controllers/launches.controller')

launchesRouter.get('/', getLaunches)
launchesRouter.post('/', addNewLaunches)

module.exports =launchesRouter;