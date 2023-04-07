import * as dotenv from 'dotenv';
dotenv.config();

import connectDB from './data.js';

const startServer = async () => {
  const { default: app } = await import('./app.js');
  const dataBaseUrl = process.env.DATABASE_URL.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
  );

  const port = process.env.PORT || 3000;

  await connectDB(dataBaseUrl);
  app.listen(port, () => {
    console.log(`App running on port ${port}...`);
  });
};

startServer();
