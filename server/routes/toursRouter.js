import express from 'express';

import { aliasTopTours } from '../middlewares/index.js';
import {
  getAllTours,
  createTour,
  getTourById,
  updateTourById,
  deleteTourById,
  getTourStats,
} from '../controllers/toursControllers.js';

const router = express.Router();

router.route('/top-5-cheap').get(aliasTopTours, getAllTours);
router.route('/tours-stats').get(getTourStats);

router.route('/').get(getAllTours).post(createTour);
router
  .route('/:id')
  .get(getTourById)
  .patch(updateTourById)
  .delete(deleteTourById);

export { router as toursRouter };
