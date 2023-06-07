import * as dotenv from 'dotenv';
dotenv.config();

import { connectDB, importToursToDB, deleteToursfromDB } from './data.js';

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  process.exit();
});

const startServer = async () => {
  const { default: app } = await import('./app.js');
  const dataBaseUrl = process.env.DATABASE_URL.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
  );

  const port = process.env.PORT || 3000;

  await connectDB(dataBaseUrl);
  if (process.argv[2] === '--import-tours') importToursToDB();
  if (process.argv[2] === '--delete-tours') deleteToursfromDB();
  app.listen(port, () => {
    console.log(`App running on port ${port}...`);
  });
};

startServer();

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! Shutting down...');
  process.exit();
});
