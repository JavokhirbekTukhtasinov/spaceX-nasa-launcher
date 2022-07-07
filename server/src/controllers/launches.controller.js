const {getAllLaunches , addNewLaunch} = require('../models/launches.modal')


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



module.exports = {
    getLaunches,
    addNewLaunches
}
