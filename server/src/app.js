const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))



const planetsRouter = require('./routes/planets.router')
app.use('/planets', planetsRouter)


module.exports = app;