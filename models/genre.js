const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minLength: 5,
        maxLength: 50
    }
})

const Genre = mongoose.model('Genre', genreSchema);

const validateBody = (body) => {
    const schema = Joi.object({
        name: Joi.string().min(5).required()
    });
    return schema.validate(body);
};

exports.Genre = Genre;
exports.validate = validateBody;
exports.genreSchema = genreSchema;