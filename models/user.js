const Joi = require('joi');
const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        maxlength: 255
    },
    lastName: {
        type: String,
        required: true,
        maxlength: 255
    },
    username: {
        type: String,
        required: true,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        maxlength: 255
    },
    email: {
        type: String,
        required: true,
        maxlength: 255,
    }
}));

function validateUser(user) {
    const schema = {
        firstName: Joi.string().required().max(255),
        lastName: Joi.string().required().max(255),
        username: Joi.string().required().max(255),
        password: Joi.string().required().max(255),
        email: Joi.string().email().required().max(255)
    }

    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;