import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/json/tours-simple.json`, 'utf-8')
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.time,
    result: tours.length,
    data: { tours },
  });
};

const createTour = (req, res) => {
  const newID = tours[tours.length - 1].id + 1;
  const newTour = { ...req.body, id: newID };

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/../data/json/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: { tour: newTour },
      });
    }
  );
};

const getTourById = (req, res) => {
  const tour = tours.find((tour) => tour.id === +req.params.id);

  res.status(200).json({
    status: 'success',
    data: { tour },
  });
};

const updateTourById = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Update Tour',
  });
};

const deleteTourById = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Delete Tour',
  });
};

export { getAllTours, createTour, getTourById, updateTourById, deleteTourById };
