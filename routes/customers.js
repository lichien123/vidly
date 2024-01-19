const { Customer, validate } = require('../models/customer');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  const customers = await Customer.find().sort('name');
  res.send(customers);
});

router.get('/:id', auth, async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) return res.status(404).send('customer not found');
  res.send(customer);
});

router.post('/', auth, async (req, res) => {
  // validate body
  // if not valid, return 400
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = new Customer({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone
  })
  await customer.save();

  res.send(customer);
});

router.put('/:id', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(req.params.id,
    {
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    },
    { new: true }
  );

  if (!customer) res.status(404).send('customer not found');

  res.send(customer);
});

router.delete('/:id', auth, async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);
  if (!customer) return res.status(404).send('customer not found');
  res.send(customer);
});

module.exports = router;