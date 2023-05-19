import AppError from '../utils/AppError.js';

const urlError = (req, res, next) =>
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));

export { urlError };
