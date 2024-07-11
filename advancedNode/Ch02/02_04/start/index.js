const { createReadStream, createWriteStream, write } = require("fs");

const writeStream = createWriteStream("./file.txt");

process.stdin.pipe(writeStream);
