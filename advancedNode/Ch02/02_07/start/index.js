const { createReadStream, createWriteStream } = require("fs");
const { PassThrough } = require("stream");

const readStream = createReadStream("../../powder-day.mp4");
const writeStream = createWriteStream("./copy.mp4");

class Throttle extends Duplex {
    _write() {}

    _read() {}
}

const report = new PassThrough();
const throttle = new Throttle(10);

let total = 0;

report.on("data", (chunk) => {
    total += chunk.length;
    console.log("bytes: ", total);
});

readStream.pipe(throttle).pipe(report).pipe(writeStream);
