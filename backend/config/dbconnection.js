import mongoose from "mongoose";

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser:true,
        useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected')
    }catch(err){
        console.log('❌ Failed to connect : ',err.message)
    }
}

export default connectDB;