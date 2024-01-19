const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const validate = (body) => {
    const schema = Joi.object({
        password: Joi.string().min(8).max(26).required(),
        email: Joi.string().min(4).max(50).email().required()
    })
    // validate password rules
    const passwordValidation = passwordComplexity().validate(body.password);
    if (passwordValidation.error) return passwordValidation;
    // validate body rules
    return schema.validate(body);
};

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('invalid email or password');

    // compare request body password to user's password in the database
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send(validPassword);

    const token = user.generateAuthToken();
    res.send(token);
});

module.exports = router;