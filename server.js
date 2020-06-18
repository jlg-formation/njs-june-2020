"use strict";

const express = require("express");
const serveIndex = require("serve-index");
const { Client } = require("pg");
const webservices = require("./webservices.js");
const action = require("./action.js");

const client = new Client();

const app = express();
const port = 3000;

app.set("view engine", "ejs");

// express.urlencoded() permet de recuperer req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  console.log("req.url: ", req.url);
  next();
});

async function init() {
  try {
    await client.connect();
    console.log("connected to PostgreSQL");
    // insure that table is created.
    await client.query(`
CREATE TABLE IF NOT EXISTS articles 
(
  id character varying,
  name character varying,
  price numeric,
  quantity integer
)`);

  } catch (err) {
    console.log("err: ", err);
    process.exit(1);
  }
}
init();

app.use("/webservices", webservices(client));
app.use("/action", action(client));

app.get("/stock", async (req, res, next) => {
  try {
    const result = await client.query("SELECT * FROM articles");
    const articles = result.rows;
    articles.sort((a, b) => (a.name < b.name ? -1 : 1));
    res.render("stock", { articles });
  } catch (err) {
    console.log("err: ", err);
    res.status(500).end();
  }
});

app.get("/add", (req, res, next) => {
  res.render("add", {});
});

app.get("/update/:myId", async (req, res, next) => {
  const id = req.params.myId;
  console.log("id: ", id);
  const result = await client.query("SELECT * FROM articles WHERE id = $1", [
    id,
  ]);
  console.log("result: ", result);
  const article = result.rows[0];
  res.render("update", { article: article });
});

app.use(express.static("www"));
app.use(serveIndex("www"));

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
