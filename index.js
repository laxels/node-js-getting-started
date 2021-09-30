const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;
const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

express()
  .use(express.static(path.join(__dirname, "public")))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  .get("/", getHandler)
  .post("/", postHandler)
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

async function getHandler(req, res) {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM deusx_passwords");

    if (result == null || result.rows == null) {
      res.send("Null result");
      client.release();
      return;
    }

    const rows = result.rows;
    if (result.rows.length === 0) {
      res.send("No rows found");
      client.release();
      return;
    }

    res.send(rows[0].hash);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error " + err);
  }
}

async function postHandler(req, res) {
  res.send("POST");
}
