import express from 'express';

import { checkId, checkBody } from '../middlewares/index.js';
import {
  getAllTours,
  createTour,
  getTourById,
  updateTourById,
  deleteTourById,
} from '../controllers/toursControllers.js';

const router = express.Router();

router.param('id', checkId);

router.route('/').get(getAllTours).post(checkBody, createTour);
router
  .route('/:id')
  .get(getTourById)
  .patch(updateTourById)
  .delete(deleteTourById);

export { router as toursRouter };
