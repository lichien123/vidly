const Joi = require('joi');
const express = require('express');
const router = express.Router();

const videos = [
  { id: 1, title: 'your name', genres: [ 'anime', 'romance' ] },
  { id: 2, title: 'cyberpunk 2077', genres: [ 'anime', 'action' ] },
  { id: 3, title: 'pokemon the first movie', genres: [ 'anime', 'action', 'adventure' ] },
  { id: 4, title: 'superbowl LII', genres: [ 'sports' ] },
  { id: 5, title: 'forrest gump', genres: [ 'comedy', 'adventure' ] }
];

const validateBody = (body) => {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    genres: Joi.array().items(Joi.string()).required()
  });
  return schema.validate(body);
};

router.get('/', (req, res) => {
  res.send(videos);
});

router.get('/:id', (req, res) => {
  const video = videos.find(v => v.id === parseInt(req.params.id));
  if (!video) return res.status(404).send('video not found');
  res.send(video);
});

router.post('/', (req, res) => {
  // validate body
  // if not valid, return 400
  const { error } = validateBody(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const video = {
    id: videos.length + 1,
    title: req.body.title,
    genres: req.body.genres
  }

  videos.push(video);
  res.send(videos);  
});

router.put('/:id', (req, res) => {
  const video = videos.find(v => v.id === parseInt(req.params.id));
  if (!video) res.status(404).send('video not found');

  const { error } = validateBody(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const newVideo = {
    id: parseInt(req.params.id),
    title: req.body.title,
    genres: req.body.genres
  };

  const index = videos.indexOf(video);
  videos[index] = newVideo;

  res.send(videos);
});

router.delete('/:id', (req, res) => {
  const video = videos.find(v => v.id === parseInt(req.params.id));
  if (!video) return res.status(404).send('video not found');

  const index = videos.indexOf(video);
  videos.splice(index, 1);

  res.send(video);
});

module.exports = router;