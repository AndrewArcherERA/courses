const Joi = require("joi");
const mongoose = require("mongoose");

const Movie = mongoose.model(
    "Movie",
    new mongoose.Schema({
        title: { type: String, required: true, minlength: 5, maxlength: 50 },
        genres: [genreSchema],
        numberInStock: { type: Int32Array },
        dailyRentalRate: { type: Int32Array },
    })
);

const genreSchema = new mongoose.Schema({
    genre: String,
});
