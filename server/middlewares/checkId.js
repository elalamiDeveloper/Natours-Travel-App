import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/json/tours-simple.json`, 'utf-8')
);

const checkId = (req, res, next, val) => {
  const id = +req.params.id;
  if (id >= tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid id',
    });
  }
  next();
};

export default checkId;
