const AppError = require('../utils/appError');

const handleDuplicateFieldsDB = err => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  console.log(value);

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};
const handleJWTError = () => new AppError('invalid token pls login again', 401);

const handleJWTExpiredError = () =>
  new AppError('your token has expired pls login again', 401);

const sendErrorDev = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  } else {
    return res.status(err.statusCode).render('error', {
      title: 'something went wrong',
      msg: err.message
    });
  }
};

const sendErrorProd = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    //operational error for dev
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
    }
    //program or other error for client
    //1.log error msg
    console.error('error', err);
    //2.send error message
    return res.status(500).json({
      status: 'error',
      message: 'something went wrong'
    });
  }
  //operational error for dev
  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      title: 'something went wrong',
      msg: err.message
    });
  }
  //program or other error for client

  //1.log error msg
  console.error('error', err);
  //2.send error message
  return res.status(err.statusCode).render('error', {
    title: 'something went wrong',
    msg: 'pls try again later'
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (error.code === 11000) error = handleDuplicateFieldsDB();
    if (error.name === 'JsonWebError') error = handleJWTError();
    if (error.name === 'TokenExpiredError')
      error = handleJWTExpiredError(error);

    sendErrorProd(err, req, res);
  }
};
