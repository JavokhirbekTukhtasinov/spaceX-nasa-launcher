const fs = require('fs');
const path = require('path')
const {parse} = require('csv-parse');

const planets = require('../schemas/planets.schema')

const habitablePlanets = [];




function isHabitablePlanet(planet) {
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}

const loadPlanetsData = () => {
    return new Promise( async(resolve, reject) => {
        fs.createReadStream(path.join(__dirname , '..' ,'..' , 'data', 'kepler_data.csv'))
        .pipe(parse({
          comment: '#',
          columns: true,
        }))
        .on('data', async (data) => {
          if (isHabitablePlanet(data)) {    
           await savePlanet(data)
          }
        })
        .on('error', (err) => {
            reject(err)
          console.log(err);
        })
        .on('end', async () => {
          const countOfPlanets = getAllPlanetsFromDb.length
          console.log(`${countOfPlanets} habitable planets found!`);
          resolve()
        });
    })
}




const getAllPlanetsFromDb = async(req, res) => {
  return await planets.find({})
}


const savePlanet = async(palnet) => {
  try {
  await  planets.updateOne({
      keplerName: palnet.kepler_name
    }, {
      keplerName: palnet.kepler_name,
    },
    {
      upsert: true
    } 
    )
  }catch(err){
    console.log(err)
  }
}

  module.exports = {
    loadPlanetsData,
    getAllPlanetsFromDb
  }