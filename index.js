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

// server
const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`listening on port ${port}`));
