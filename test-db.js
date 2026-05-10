const { Client } = require("pg");
require("dotenv").config();
const client = new Client({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || "smartstock",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
});
client.connect()
  .then(() => { console.log("Connected successfully!"); client.end(); })
  .catch(err => { console.error("Connection error", err.stack); client.end(); });