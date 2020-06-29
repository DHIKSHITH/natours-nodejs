const mongoose = require('mongoose');

const dotenv = require('dotenv');
//synchrous error handling

process.on('uncaughtException', err => {
  console.log('unhandled rejection shutting down......');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  // .connect(process.env.DATABASE_LOCAL, {
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('connected'));

const app = require('./app');

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('app running');
});

process.on('unhandledRejection', err => {
  console.log('unhandled rejection shutting down......');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

//console.log(x);//error synchronous
