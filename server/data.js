import mongoose from 'mongoose';

const connectDB = async (url) => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(url);
    console.log('NATOURS DATA connected successfully...');
  } catch (err) {
    console.error(err);
  }
};

export default connectDB;
