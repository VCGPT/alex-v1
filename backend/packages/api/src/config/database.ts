import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    // const conn = await mongoose.connect(process.env.MONGODB_URI as string);
    const conn = await mongoose.connect('mongodb+srv://alexfung:PredictiveVC123@cluster0.gmpo7ra.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB; 