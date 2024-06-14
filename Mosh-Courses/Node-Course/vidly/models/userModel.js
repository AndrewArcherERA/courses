const Joi = require("joi");
const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        name: {type: String, required: true},
        email: {type: String, unique: true, required: true},
        password: {type: String, required: true, minlength: 10, maxlength: 1024}
    })
)

function validateUser(user){
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(10)
    })
    return schema.validate(user);
}

exports.User = User;
exports.validateUser = validateUser;