"use strict";

const express = require("express");
const serveIndex = require("serve-index");
const { promises: fs } = require("fs");
const { Client } = require("pg");
const assert = require("assert");

const client = new Client();

const app = express();
const port = 3000;
const filename = "./database/articles.json";

app.set("view engine", "ejs");

// express.urlencoded() permet de recuperer req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  console.log("req.url: ", req.url);
  next();
});

let articles = [];

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

app.get("/stock", async (req, res, next) => {
  try {
    const result = await client.query("SELECT * FROM articles");
    articles = result.rows;
    res.render("stock", { articles });
  } catch (err) {
    console.log("err: ", err);
    res.render("stock", { articles: [] });
  }
});

app.get("/add", (req, res, next) => {
  res.render("add", {});
});

app.post("/action/add", async (req, res, next) => {
  const article = req.body;
  console.log("article: ", article);
  article.id = "a" + Math.floor(Math.random() * 1e18);

  await client.query(
    "INSERT INTO articles (id, name, price, quantity) VALUES ($1, $2, $3, $4)",
    [article.id, article.name, article.price, article.quantity]
  );

  try {
    await fs.writeFile(filename, JSON.stringify(articles, undefined, 2));
    res.redirect("/stock");
  } catch (error) {
    console.log("err: ", err);
    res.status(500).end();
  }
});

app.delete("/webservices/bulk/articles", async (req, res, next) => {
  const ids = req.body;
  console.log("ids: ", ids);
  ids.forEach((id) => {
    const index = articles.findIndex((article) => article.id === id);
    if (index === -1) {
      return;
    }
    articles.splice(index, 1);
  });
  try {
    await fs.writeFile(filename, JSON.stringify(articles, undefined, 2));
    res.status(204).end();
  } catch (error) {
    console.log("err: ", err);
    res.status(500).end();
  }
});

app.use(express.static("www"));
app.use(serveIndex("www"));

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
