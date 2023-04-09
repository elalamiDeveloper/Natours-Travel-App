import Tour from '../models/tourModel.js';
import { APIFeatures } from '../utils/index.js';

const getAllTours = async (req, res) => {
  try {
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tours = await features.query;

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: { tours },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      data: {
        message: err.message,
      },
    });
  }
};

const createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: { tour: newTour },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

const getTourById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const tour = await Tour.findById(id);

    res.status(200).json({
      status: 'success',
      data: { tour },
    });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err.message });
  }
};

const updateTourById = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedFields = req.body;
    const tour = await Tour.findByIdAndUpdate(id, updatedFields, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: { tour },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

const deleteTourById = async (req, res) => {
  try {
    const id = req.params.id;
    await Tour.findByIdAndDelete(id);
    res.status(204).json({
      status: 'success',
      message: 'Tour deleted successfully...',
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

const getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: { $toUpper: '$difficulty' },
          numTours: { $sum: 1 },
          numRating: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      {
        $sort: {
          avgPrice: 1,
        },
      },
    ]);

    res.status(200).json({ status: 'success', data: { stats } });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export {
  getAllTours,
  createTour,
  getTourById,
  updateTourById,
  deleteTourById,
  getTourStats,
};
