const express = require('express');
const genres = require('./routes/genres.js');
const home = require('./routes/home.js');
const app = express();

app.use(express.json());

app.use('/', home);
app.use('/api/movies', genres);

// server
const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`listening on port ${port}`));
