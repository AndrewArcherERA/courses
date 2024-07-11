const express = require("express");
const app = express();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const bugs = require("./data/routes/bugs");
const projects = require("./data/routes/projects");
const users = require("./data/routes/users");

const PORT = 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    if (
        req.headers &&
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "JWT"
    ) {
        jwt.verify(
            req.headers.authorization.split(" ")[1],
            "RESTFULAPIs",
            (err, decode) => {
                if (err) req.user = undefined;
                req.user = decode;
                next();
            }
        );
    } else {
        req.user = undefined;
        next();
    }
});

app.use(bugs);
app.use(projects);
app.use(users);

app.listen(PORT, () => console.log(`your server is running on port ${PORT}`));
