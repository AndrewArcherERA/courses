const fs = require("fs");

const readStream = fs.createReadStream("../../powder-day.mp4");

readStream.on("data", (chunk) => {
    console.log("reading chunk", chunk);
});

readStream.on("end", () => {
    console.log("Stream finished");
});
