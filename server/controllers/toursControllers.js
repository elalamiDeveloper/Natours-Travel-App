import Tour from '../models/tourModel.js';

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.time,
    data: { tours: 'tours' },
  });
};

const createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: { tour: newTour },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

const getTourById = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: { tour: 'tour' },
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
