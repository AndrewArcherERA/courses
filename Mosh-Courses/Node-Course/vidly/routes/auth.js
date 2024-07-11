const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { User } = require("../models/userModel");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const config = require("config");

router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password");

    const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
    );
    if (!validPassword)
        return res.status(400).send("Invalid email or password");

    const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));

    res.send(token);
});

function validate(user) {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(10),
    });
    return schema.validate(user);
}

module.exports = router;
