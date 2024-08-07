const express = require("express");
const router = express.Router();
const { User, validateUser } = require("../models/userModel");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error);

    let user = await User.findOne({ email: req.body.email });
    if (user)
        return res
            .status(400)
            .send("This email is already registered: " + req.body.email);

    user = new User(_.pick(req.body, ["name", "email", "password"]));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));

    res.header("x-auth-token", token).send(_.pick(user, ["name", "email"]));
});

module.exports = router;
