import express from 'express'
import connectDB from './config/dbconnection.js'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config();
const app = express()
const port = process.env.PORT || 5001

app.use(cors())
app.use(express.json())

connectDB()

app.get('/',(req,res) => {
    res.send('Backend')
})

app.listen(port,() => {
    console.log('Backend is running')
})