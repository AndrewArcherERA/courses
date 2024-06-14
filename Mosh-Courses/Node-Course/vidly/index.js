const express = require("express");
const app = express();
const mongoose = require("mongoose");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const users = require("./routes/users")

app.use(express.json());
app.use("/api/customers", customers);
app.use("/api/genres", genres);
app.use("/api/movies", movies);
app.use("/api/users", users)


mongoose
    .connect("mongodb://127.0.0.1:27017/vidly")
    .then(() => console.log("Connect to MongoDB..."))
    .catch((err) => console.log(err));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}...`));
