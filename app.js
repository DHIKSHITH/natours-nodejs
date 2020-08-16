const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');
const tourrouter = require('./tourroutes');
const userrouter = require('./userroutes');
const reviewrouter = require('./reviewroutes');

const app = express();

// app.use(express.static(`${__dirname}/public`));
app.use(express.static(path.join(__dirname, 'public')));

app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'too many request from this ip pls try agin in an our'
});

app.use('/api', limiter);

app.use(express.json({ limit: '10kb' })); //middleware
app.use(cookieParser());
//data sanitization against nosql query injection
app.use(mongoSanitize());

//data sanitization against xss
app.use(xss());

//polution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price'
    ]
  })
);

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.cookies);
  next();
});

// app.get('/',(req,res)=>{
//     res.status(200).json({message:'hollo from server',app:'nators'});

// });

// app.post('/',(req,res)=>{
//     res.send('endpoint');
// })

// app.get('/api/v1/tours',getalltoursHandler);

// app.get('/api/v1/tours/:id',gettourHandler);

// // app.post('/api/v1/tours',createtour);

// app.patch('/api/v1/tours/:id',updatetour);

// app.delete('/api/v1/tours/:id',deletetour);

app.use('/api/v1/tours', tourrouter);

app.use('/api/v1/user', userrouter);
app.use('/api/v1/review', reviewrouter);

//404 not found for uncorrect url

app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `cant find ${req.originalUrl} on this server`
  // });
  ////////////////////////////////////////////////////////////////////
  // const err = new Error(`cant find ${req.originalUrl} on this server`);
  // err.status = 'fail';
  // err.statusCode = 404;
  ////////////////////////////////////////////////////////////////////
  next(new AppError(`cant find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
