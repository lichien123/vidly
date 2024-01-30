const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require('express');
const genres = require('./routes/genres.js');
const customers = require('./routes/customers.js');
const movies = require('./routes/movies.js');
const rentals = require('./routes/rentals.js');
const users = require('./routes/users.js')
const auth = require('./routes/auth.js')
const home = require('./routes/home.js');
const app = express();
const config = require('config');
const error = require('./middleware/error');
require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');

winston.handleExceptions(new winston.transports.File({ filename: 'uncaughtExceptions.log' }));

process.on('unhandledRejection', (ex) => {
  throw ex;
});

winston.add(new winston.transports.File({ filename: 'logfile.log', level: 'error' }));
winston.add(new winston.transports.MongoDB({ db: 'mongodb://localhost/vidly', level: 'info' }));

// simulate throwing errors
// throw new Error('something failed during startup');
// const p = Promise.reject(new Error('something failed miserably'));
// p.then(() => console.log('done'));

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined');
  process.exit(1);
};

mongoose.connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to mongodb...'))
  .catch(err => console.error('could not connect to mongodb...'));

app.use(express.json());

app.use('/', home);
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

// log exceptions
app.use(error);

// server
const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`listening on port ${port}`));
