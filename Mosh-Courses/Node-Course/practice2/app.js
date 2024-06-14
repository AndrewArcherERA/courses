const express = require("express");
const app = express();
const spongbob = require("./routes/spongbob");

app.use(express.json());
app.use("/api/spongbob", spongbob);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on PORT:${port}...`));
