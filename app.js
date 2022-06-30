const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // for logging
}
app.use(express.json()); // for parsing application/json
app.use(express.static(`${__dirname}/public`)); // for serving static files

app.use((req, res, next) => {
  console.log('Hello from the middleware 🙋‍♂️');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.requestTime);
  next();
});

// 3) ROUTE REGISTRATION
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
