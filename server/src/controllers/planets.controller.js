
const {getAllPlanetsFromDb} = require('../models/planets.model')

const getAllPlanets = async(req, res) => {
  return res.status(200).json(await getAllPlanetsFromDb())
}



module.exports = {
    getAllPlanets
}
