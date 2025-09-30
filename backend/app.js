import express from 'express'
import connectDB from './config/dbconnection.js'
import dotenv from 'dotenv'
import cors from 'cors'
import {blogModel} from './models/BlogModel.js'
import {userModel} from './models/UserModel.js'

dotenv.config();
const app = express()
const port = process.env.PORT || 5001

app.use(cors())
app.use(express.json())

connectDB()

app.get('/',(req,res) => {
    res.send('Backend')
})

app.post('/api/createuser',async(req,res) => {
    const {name,username,password} = req.body
    const newUser = new userModel({
        name,username,password
    })
    await newUser.save()
    res.send(`new user created`)
})


app.listen(port,() => {
    console.log('Backend is running')
})