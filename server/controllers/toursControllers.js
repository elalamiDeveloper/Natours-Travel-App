import Tour from '../models/tourModel.js';

const getAllTours = async (req, res) => {
  try {
    // Filtring
    let query = Tour.find(req.query);

    // Sorting
    if (req.query.sort) {
      const sortFields = req.query.sort.split(',').join(' ');
      query = query.sort(sortFields);
    } else {
      query = query.sort('-createdAt');
    }

    // Select Fields
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    const tours = await query;

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

export { getAllTours, createTour, getTourById, updateTourById, deleteTourById };
