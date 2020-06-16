"use strict";

const express = require("express");
const serveIndex = require("serve-index");
const fs = require("fs");

const app = express();
const port = 3000;
const filename = "./database/articles.json";

app.set("view engine", "ejs");

// express.urlencoded() permet de recuperer req.body
app.use(express.urlencoded());

app.use((req, res, next) => {
  console.log("req.url: ", req.url);
  next();
});

let articles = [];
try {
  articles = JSON.parse(fs.readFileSync(filename));
} catch (err) {
  console.log("err: ", err);
  fs.writeFileSync(filename, JSON.stringify(articles, undefined, 2));
}

app.get("/stock", (req, res, next) => {
  res.render("stock", { articles });
});

app.get("/add", (req, res, next) => {
  res.render("add", {});
});

app.post("/action/add", (req, res, next) => {
  const article = req.body;
  console.log("article: ", article);

  articles.push(article);
  fs.writeFileSync(filename, JSON.stringify(articles, undefined, 2));
  res.redirect("/stock");
});

app.use(express.static("www"));
app.use(serveIndex("www"));

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
