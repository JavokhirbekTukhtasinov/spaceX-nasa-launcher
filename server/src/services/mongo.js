require('dotenv').config();
const mongoose = require('mongoose') 

const MONGO_URL = process.env.MONGO_URL;

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
