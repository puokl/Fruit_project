const { Pool } = require("pg");
require("dotenv").config();
const url = require("url");

const connectionString = process.env.DB_URL;
const params = url.parse(connectionString);
const auth = params.auth.split(":");

const config = {
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split("/")[1],
};

const pool = new Pool(config);
module.exports = pool;
