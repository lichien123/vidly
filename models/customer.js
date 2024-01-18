const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    isGold: {
        type: Boolean,
        require: true
    },
    name: {
        type: String,
        require: true,
        minLength: 5,
        maxLength: 50
    },
    phone: {
        type: String,
        require: true,
        minLength: 5,
        maxLength: 50
    }
}));

const validateBody = (body) => {
    const schema = Joi.object({
        isGold: Joi.boolean().required(),
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required()
    });
    return schema.validate(body);
};

exports.Customer = Customer;
exports.validate = validateBody;