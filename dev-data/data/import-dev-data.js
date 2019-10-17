const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');

dotenv.config({ path: './../../config.env' });

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
  });

// Reading file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

//Import data
const importData = async () => {
    try {
        await Tour.create(tours);
        console.log('Data loaded');
        process.exit();
    }
    catch(err) {
        console.log('Error loading data');
        process.exit();
    }
}

// Delete all data from DB
const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log('All data deleted');
        process.exit();
    }
    catch(err) {
        console.log('Error deleting data');
        process.exit();
    }
}

if(process.argv[2] === '--import') {
    importData()
} else if(process.argv[2] === '--delete') {
    deleteData();
}