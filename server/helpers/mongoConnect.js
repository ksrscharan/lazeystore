import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();
export const connectDB = () => {
  mongoose
    .connect(`${process.env.MONGODB_URI}/lazeystore`, {})
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err);
    });
};
