import mongoose from "mongoose";

const connectDB = async () => {
    try {
        console.log('5: ', process.env.MONGO_URI)
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log('MongoDB connected');
    } catch(err) {
        console.log('Error connecting to MongoDB: ', err);
        process.exit(1)
    }
}

export default connectDB;