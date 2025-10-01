import express from 'express'
import connectDB from './config/dbconnection.js'
import dotenv from 'dotenv'
import cors from 'cors'
import { blogModel } from './models/BlogModel.js'
import { userModel } from './models/UserModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

dotenv.config();
const app = express()
const port = process.env.PORT || 5001

app.use(cors())
app.use(express.json())

connectDB()

app.get('/', (req, res) => {
    res.send('Backend')
})

//Working fine 
app.post('/api/createuser', async (req, res) => {
    try {
        const { name, username, password } = req.body
        const exist = await userModel.findOne({ username })
        if (exist) {
            return res.status(400).json({ success: false, message: 'Username already exists' })
        } else {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, async (err, hash) => {
                    const newUser = new userModel({
                        name, username, password: hash
                    })
                    await newUser.save()
                    let token = jwt.sign({ username }, 'secret')
                    res.cookie('username', token)
                    res.json({
                        "success": true,
                        "message": "User created successfully"
                    })
                })
            })
        }

    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
})

//Login check
//backend working fine
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userModel.findOne({ username })
        if (!user) return res.status(404).json({ success: false, message: 'user not found' })

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ success: false, message: `Wrong password` })

        const token = jwt.sign({ username }, 'secret')
        //http is for security purpose , so that no one can access our cookie
        res.cookie('username', token, { httpOnly: true })
        res.json({ success: true, message: 'Logged in successfully', username: user.username, name: user.name });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
})

//create blog
app.post('/api/createblog', async (req, res) => {
    const { authorName, authorUsername, title, content } = req.body
    const newBlog = new blogModel({
        authorName, authorUsername, title, content
    })
    await newBlog.save()
    res.status(200).json({ success: true, msg: 'Blog posted' })
})

//sending blogs to frontend done
app.get('/api/blogs', async (req, res) => {
    try {
        const blogs = await blogModel.find();
        res.status(200).json({ success: true, blogs })
    } catch (err) {
        res.status(500).json({ success: false, message: 'server error' })
    }
})

//My blog functionality
app.get('/api/myblog/:user', async (req, res) => {
    try {
        const user = req.params.user
        const myblog = await blogModel.find({ authorUsername: user }).sort({ createdAt: -1 })
        res.status(200).json({ success: true, myblog });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
})

//this is to get blogby id using it to fill the form for editing
app.get("/api/blog/:id", async (req, res) => {
    try {
        const blog = await blogModel.findById(req.params.id);
        if (!blog)
            return res.status(404).json({ success: false, message: "Blog not found" });
        res.status(200).json({ success: true, blog });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

//Editing the blog
app.put("/api/updateblog/:id", async (req, res) => {
    try {
        const updatedBlog = await blogModel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!updatedBlog) return res.status(404).json({ success: false, message: "Blog not found" });
        res.status(200).json({ success: true, blog: updatedBlog });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

app.delete('/api/deleteblog/:id', async (req, res) => {
    try {
        const blogid = req.params.id
        const blog = await blogModel.findById(blogid)
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }
        await blogModel.findByIdAndDelete(blogid);
        res.status(200).json({ success: true, message: "Blog deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
})




app.listen(port, () => {
    console.log('Backend is running')
})