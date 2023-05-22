import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import admin from './route/adminRoute.js'


dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(admin)
app.use(express.static('public'))






const port = process.env.PORT ||5000
const db = process.env.DB_URL

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('connected to MongoDB')
})



app.listen(port,()=>{
    console.log(`server is listening on ${port}`)
})