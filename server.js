const { configDotenv } = require('dotenv')
const express = require('express')
const connectDb = require('./middlewares/dB')
const userRoutes = require('./routes/userRoutes')

configDotenv()

const app = express()

app.use(express.json())

connectDb()

app.use(userRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server started on ${process.env.PORT}`)
})