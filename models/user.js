const mongoose = require('mongoose');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minLength: 4,
        maxLength: 50
    },
    password: {
        type: String,
        require: true,
        minLength: 8,
        maxLength: 1024
    },
    email: {
        type: String,
        require: true,
        unique: true,
        minLength: 4,
        maxLength: 255
    },
    isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
    return token;
};

const User = mongoose.model('User', userSchema);

const validateBody = (body) => {
    const schema = Joi.object({
        name: Joi.string().min(4).max(50).required(),
        password: Joi.string().min(8).max(26).required(),
        email: Joi.string().min(4).max(50).email().required()
    })
    // validate password rules
    const passwordValidation = passwordComplexity().validate(body.password);
    if (passwordValidation.error) return passwordValidation;
    // validate body rules
    return schema.validate(body);
};

exports.User = User;
exports.validate = validateBody;