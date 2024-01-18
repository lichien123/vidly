const mongoose = require('mongoose');
const Joi = require('joi');

const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minLength: 5,
        maxLength: 50
    }
}));

const validateBody = (body) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(body);
};

exports.Genre = Genre;
exports.validate = validateBody;