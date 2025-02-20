const { configDotenv } = require('dotenv')
const mongoose = require('mongoose')

configDotenv()
const connectDb = async () => {
    try{
    const db = await mongoose.connect(process.env.MONGODB_URL)
    console.log(`Db connected`)
} catch (err) {
    console.log(`Db Error`)
}

}



module.exports = connectDb