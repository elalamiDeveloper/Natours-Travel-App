import express from 'express';
import morgan from 'morgan';

import { requestTime } from './middlewares/index.js';
import { toursRouter, usersRouter } from './routes/index.js';

const app = express();

// MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());
app.use(requestTime);

// ROUTES
app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);

export default app;
