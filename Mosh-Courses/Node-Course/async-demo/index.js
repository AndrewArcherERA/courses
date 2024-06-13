// getUser(1)
//     .then((user) => getRepositories(user.gitHubUserName))
//     .then((repos) => getCommits(repos[0]))
//     .then((commits) => console.log(commits))
//     .catch((err) => console.log(err));

async function displayCommits() {
    const user = await getUser(1);
    const repos = await getRepositories(user.gitHubUserName);
    const commits = await getCommits(repos[0]);
    console.log(commits);
}
displayCommits();

function getUser(id) {
    return new Promise((res, rej) => {
        console.log("getting user...");
        setTimeout(() => {
            res({
                id: id,
                gitHubUserName: "Mosh",
            });
        }, 2000);
    });
}

function getRepositories(username) {
    return new Promise((res, rej) => {
        console.log("getting repos...");
        setTimeout(() => {
            res({ username: username, repos: ["repo1", "repo2", "repo3"] });
        }, 2000);
    });
}

function getCommits(repo) {
    return new Promise((res, rej) => {
        console.log("getting commits...");
        setTimeout(() => {
            res(["commit"]);
        }, 2000);
    });
}
