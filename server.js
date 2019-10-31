const mongoose = require('mongoose');
const dotenv = require('dotenv');

//Uncaught Exceptions
process.on('uncaughtException', err => {
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('We are connected to MongoDB Atlas');
  })
  .catch(err => {
    console.log('Error connecting to the DB', err);
  });

const app = require('./app');

//START SERVER
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}....`);
});

//Unhandled Rejections
process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
