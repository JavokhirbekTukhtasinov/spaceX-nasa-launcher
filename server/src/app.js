const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path');
const morgan = require('morgan')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}));

app.use(morgan('combined'))
app.use(express.static(path.join(__dirname, '..', 'public')))
const planetsRouter = require('./routes/planets.router')
app.use('/planets', planetsRouter)
const launchesRouter = require('./routes/launches.router')
app.use('/launches', launchesRouter)

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
})
module.exports = app;
