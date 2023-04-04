import express from 'express';

import {
  getAllUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
} from '../controllers/usersControllers.js';

const router = express.Router();

router.route('/').get(getAllUsers).post(createUser);

router
  .route('/:id')
  .get(getUserById)
  .patch(updateUserById)
  .delete(deleteUserById);

export { router as usersRouter };
