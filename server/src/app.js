const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path');
const morgan = require('morgan')
const api = require('./routes/api')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}));


app.use(morgan('combined'))
app.use(express.static(path.join(__dirname, '..', 'public')))


app.use('/v1', api);


app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
})
module.exports = app;
