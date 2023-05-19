import express from 'express';
import morgan from 'morgan';

import { requestTime } from './middlewares/index.js';
import { urlError } from './middlewares/errorMiddlewares.js';

import { toursRouter, usersRouter } from './routes/index.js';

import { globalErrorHandler } from './controllers/errorsControllers.js';

const app = express();

// MIDDLEWARES
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(express.json());
app.use(requestTime);

// ROUTES
app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);
app.all('*', urlError);

// ERRORS Handling
app.use(globalErrorHandler);

export default app;
