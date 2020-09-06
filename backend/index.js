const express = require("express");
const path = require("path");
const serveStatic = require("serve-static");
const pg = require("pg");

const PORT = process.env.PORT || 8080;
const CONN_STRING = process.env.PG_CONN_STRING;
const GET_SQL = "SELECT cnt FROM homevio_counter LIMIT 1;";
const UPDATE_SQL = "UPDATE homevio_counter SET cnt = $1::int;";
const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN || "*";

const getCounter = async (req, res) => {
  res.set("Access-Control-Allow-Origin", ALLOW_ORIGIN);
  res.set("Access-Control-Allow-Methods", "*");
  res.set("Access-Control-Allow-Headers", "*");

  const pg_client = new pg.Client(CONN_STRING);

  await pg_client.connect();
  const { rows } = await pg_client.query(GET_SQL);
  await pg_client.end();

  res.send(rows[0]);
};

const updateCounter = async (req, res) => {
  res.set("Access-Control-Allow-Origin", ALLOW_ORIGIN);
  res.set("Access-Control-Allow-Methods", "*");
  res.set("Access-Control-Allow-Headers", "*");

  const pg_client = new pg.Client(CONN_STRING);

  await pg_client.connect();
  const { rows } = await pg_client.query(GET_SQL);
  await pg_client.query(UPDATE_SQL, [rows[0].cnt + 1]);
  await pg_client.end();

  res.send({ cnt: rows[0].cnt + 1 });
};

const handleOptions = async (req, res) => {
  res.set("Access-Control-Allow-Origin", ALLOW_ORIGIN);
  res.set("Access-Control-Allow-Methods", "*");
  res.set("Access-Control-Allow-Headers", "*");

  res.send();
};

const logCalls = async (req, res, next) => {
  console.log(req.method, req.url);
  await next();
};

express()
  .use(logCalls)
  .use(serveStatic(path.join(__dirname, "public")))
  .get("/cnt", getCounter)
  .post("/cnt", updateCounter)
  .options("*", handleOptions)
  .listen(PORT);

console.log("PORT:", PORT);
console.log("ALLOW_ORIGIN:", ALLOW_ORIGIN);
