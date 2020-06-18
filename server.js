"use strict";

const express = require("express");
const serveIndex = require("serve-index");
const { Client } = require("pg");
const webservices = require("./webservices.js");
const action = require("./action.js");

const client = new Client();

const app = express();
const port = 3000;

let articles = [];

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
    const res = await client.query("SELECT * FROM articles");

    articles = res.rows;
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
    articles = result.rows;
    res.render("stock", { articles });
  } catch (err) {
    console.log("err: ", err);
    res.status(500).end();
  }
});

app.get("/add", (req, res, next) => {
  res.render("add", {});
});

app.use(express.static("www"));
app.use(serveIndex("www"));

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
