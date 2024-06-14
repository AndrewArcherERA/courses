const express = require("express");
const router = express.Router();

const characters = [
    {
        id: 1,
        name: "Sandy Cheecks",
    },
    {
        id: 2,
        name: "Patrick Star",
    },
];

router.get("/", (request, response) => {
    response.send(characters);
});

router.get("/:id", (req, res) => {
    const character = characters.filter(
        (char) => char.id === parseInt(req.params.id)
    );
    if (!character) return res.status(400).send("Character doesnt exist");

    res.send(character);
});

module.exports = router;
