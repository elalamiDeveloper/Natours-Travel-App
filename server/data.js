import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

import Tour from './models/tourModel.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/data/json/tours-simple.json`, 'utf-8')
);

const connectDB = async (url) => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(url);
    console.log('NATOURS DATA connected successfully...');
  } catch (err) {
    console.error(err);
  }
};

const importToursToDB = async () => {
  try {
    await Tour.create(tours);
    console.log('Data saved successfully!!');
    process.exit();
  } catch (err) {
    console.error(err.message);
  }
};

const deleteToursfromDB = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data deleted successfully!!');
    process.exit();
  } catch (err) {
    console.error(err.message);
  }
};

export { connectDB, importToursToDB, deleteToursfromDB };
