const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');
const tourrouter = require('./tourroutes');
const userrouter = require('./userroutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json()); //middleware
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
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
