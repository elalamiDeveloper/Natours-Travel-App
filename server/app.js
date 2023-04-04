import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import express from 'express';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/data/json/tours-simple.json`, 'utf-8')
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: { tours },
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
