function hideString(str, done) {
    process.nextTick(() => {
        done(str.replace(/[a-zA-Z]/g, "X"));
    });
}

hideString("Hello World", (hidden) => {
    console.log(hidden);
});

console.log("end");

function delay(sec, callback) {
    setTimeout(callback, sec * 1000);
}

console.log("starting delays");
delay(2, () => {
    console.log("two seconds");
});
