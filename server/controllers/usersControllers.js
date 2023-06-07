import User from '../models/userModel.js';
import { APIFeatures, catchAsync, AppError } from '../utils/index.js';

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    result: users.length,
    data: { users },
  });
});

const createUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'This Route is not yet defined' });
};

const getUserById = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'This Route is not yet defined' });
};

const updateUserById = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'This Route is not yet defined' });
};

const deleteUserById = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'This Route is not yet defined' });
};

const updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword'
      )
    );
  }

  const filtredBody = filterObj(req.body, 'name', 'email');

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filtredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

const deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

export {
  getAllUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
  updateMe,
  deleteMe,
};
