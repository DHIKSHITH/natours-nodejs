const express = require('express');
const morgan = require('morgan');

const tourrouter = require('./tourroutes');
const userrouter = require('./userroutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json()); //middleware
app.use(express.static(`${__dirname}/public`));

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

module.exports = app;
