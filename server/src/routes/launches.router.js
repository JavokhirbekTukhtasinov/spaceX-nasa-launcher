const express = require('express')
const launchesRouter = express.Router();
const {getLaunches , addNewLaunches, abortLaunch} = require('../controllers/launches.controller')


launchesRouter.get('/', getLaunches);
launchesRouter.post('/', addNewLaunches)
launchesRouter.delete('/:id', abortLaunch)

module.exports = launchesRouter;