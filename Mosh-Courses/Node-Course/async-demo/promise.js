const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve(1);
        reject(new Error("you fucked up"));
    }, 2000);
})
    .then((result) => console.log(result))
    .catch((err) => console.log(err.message));
