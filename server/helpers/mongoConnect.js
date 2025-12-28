import mongoose from 'mongoose';

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
