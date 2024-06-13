const express = require("express");
const app = express();
const courses = require("./routes/courses");
const Joi = require("joi");

app.use(express.json());
app.use("/api/courses", courses);

app.use(function (req, res, next) {
    console.log("Logging...");
    next();
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
