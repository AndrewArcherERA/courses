const express = require("express");
const router = express.Router();
const {User, validateUser } = require("../models/userModel");

router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);
    if(error) return res.status(400).send(error.detials[0].message);

    let user = await User.findOne({ email: req.body.email });
    if(user) return res.status(400).send("This email is already registered: " + req.body.email);

    user = new User({name: req.body.name, email: req.body.email, password: req.body.password});
    await user.save();
    res.send(user);
})

module.exports = router;