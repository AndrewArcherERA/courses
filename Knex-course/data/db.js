const knex = require("knex");
const config = require("../knexfile");

const dbEnv = process.env.NODE_ENV || "development";

const db = knex(config[dbEnv]);
/*console.log("Knex is using the following configuration:", config[dbEnv]);*/
module.exports = db;
