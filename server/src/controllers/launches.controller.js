const {getAllLaunches , addNewLaunch, existsLaunchId, deleteLaunch} = require('../models/launches.modal')


const getLaunches = async(req, res) => {
    console.log('launches: ', getAllLaunches())
  return res.status(200).json(getAllLaunches());
}


const addNewLaunches = async (req, res) => {
  const launch = req.body;
  console.log('reqbody', req.body)
  if(!launch.destination || !launch.launchDate || !launch.rocket || !launch.mission) {
    return res.status(400).json({
        error: 'Missing required field'
    })
  }
  launch.launchDate = new Date(launch.launchDate);
  
  if(isNaN(launch.launchDate)) {
    return res.status(400).json({
        error: 'Invalid date'
    })
  }
  addNewLaunch(launch);
  return res.status(201).json(launch) 
}


const abortLaunch = async (req, res) => {
  const id = Number(req.params.id);
  if(!id) {
    return res.status(400).json({
        error: 'Missing required field'
    })
  }
  if(!existsLaunchId(id)) {
    return res.status(404).json({
        error: 'Launch not found' 
    })  
  }

  const abortedLaunch = await deleteLaunch(id);
  if(!abortedLaunch) {
    return res.status(500).json({
        error: 'Failed to abort launch'
    })
  }
  return res.status(200).json(abortedLaunch);

}


module.exports = {
    getLaunches,
    addNewLaunches,
    abortLaunch
}
