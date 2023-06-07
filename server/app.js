import { dirname } from 'path';
import { fileURLToPath } from 'url';

import express from 'express';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';

import { toursRouter, usersRouter } from './routes/index.js';
import { globalErrorHandler } from './controllers/errorsControllers.js';
import { requestTime, urlsError } from './middlewares/index.js';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// MIDDLEWARES
app.use(helmet());

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

app.use(express.json({ limit: '10kb' }));
app.use(mongoSanitize());
app.use(xss());
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

app.use(express.static(`${__dirname}/public`));

app.use(requestTime);

// ROUTES
app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);
app.all('*', urlsError);

// ERRORS Handling
app.use(globalErrorHandler);

export default app;
