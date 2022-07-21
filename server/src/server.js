const http = require('http')
const PORT = process.env.PORT || 8000;
const app = require('./app')
const {loadPlanetsData} = require('./models/planets.model')
const {loadLaunchesData} = require('./models/launches.modal')
const {connectMongo} = require('./services/mongo')
require('dotenv').config();



const server = http.createServer(app)


const startServer = async () => {
    await connectMongo()
    await loadPlanetsData();
    await loadLaunchesData();
    server.listen(PORT, () => {
        console.log(`Aplication is running on port ${PORT}...`)
    })    
}
startServer();


