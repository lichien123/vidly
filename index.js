const mongoose = require('mongoose');
const express = require('express');
const genres = require('./routes/genres.js');
const customers = require('./routes/customers.js');
const home = require('./routes/home.js');
const app = express();

mongoose.connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to mongodb...'))
  .catch(err => console.error('could not connect to mongodb...'));

app.use(express.json());

app.use('/', home);
app.use('/api/genres', genres);
app.use('/api/customers', customers);

// server
const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`listening on port ${port}`));
