
const mongoose = require('mongoose') 

const MONGO_URL = 'mongodb+srv://javohir:javohir199717@nasa-cluster.qr0bc.mongodb.net/nasa?retryWrites=true&w=majority'

mongoose.connection.once('open', () => {
    console.log('MongoDB is connected...')
})

mongoose.connection.on('error', (err) => {
    console.error(err);
})





const connectMongo = async () => {
   return await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}


const disconnectMongo = async () => {
    return await mongoose.disconnect()
}



module.exports = {
    connectMongo,
    disconnectMongo    
};