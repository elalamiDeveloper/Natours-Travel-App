import express from 'express';

import {
  getAllUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
  updateMe,
  deleteMe,
} from '../controllers/usersControllers.js';
import {
  signup,
  login,
  protect,
  forgotPassword,
  resetPassword,
  updatePassword,
} from '../controllers/authControllers.js';

const router = express.Router();

router.route('/signup').post(signup);
router.route('/login').post(login);

router.route('/forgotPassword').post(forgotPassword);
router.route('/resetPassword/:token').patch(resetPassword);
router.route('/updatePassword').patch(protect, updatePassword);

router.route('/updateMe').patch(protect, updateMe);
router.route('/deleteMe').patch(protect, deleteMe);

router.route('/').get(getAllUsers).post(createUser);

router
  .route('/:id')
  .get(getUserById)
  .patch(updateUserById)
  .delete(deleteUserById);

export { router as usersRouter };
