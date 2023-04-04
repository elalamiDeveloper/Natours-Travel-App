import express from 'express';

import {
  getAllTours,
  createTour,
  getTourById,
  updateTourById,
  deleteTourById,
} from '../controllers/toursControllers.js';

const router = express.Router();

router.route('/').get(getAllTours).post(createTour);

router
  .route('/:id')
  .get(getTourById)
  .patch(updateTourById)
  .delete(deleteTourById);

export { router as tourRouter };
