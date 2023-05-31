import { AppError } from '../utils/index.js';

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handlerDuplicateFieldsDB = (err) => {
  const message = `Duplicate field value: "${err.keyValue.name}". Please use another value!`;
  return new AppError(message, 400);
};

const handlerValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data => ${errors.join(', ')}`;

  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('ERROR: ', err);

    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong',
    });
  }
};

const globalErrorHandler = (err, req, res, next) => {
  let error = Object.assign(err, {
    statusCode: err.statusCode || 500,
    status: err.status || 'error',
  });

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(error, res);
  } else if (process.env.NODE_ENV === 'production') {
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handlerDuplicateFieldsDB(error);
    if (error.name === 'ValidationError')
      error = handlerValidationErrorDB(error);

    sendErrorProd(error, res);
  }
};

export { globalErrorHandler };
