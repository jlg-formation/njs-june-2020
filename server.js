"use strict";

const express = require("express");
const serveIndex = require("serve-index");
const fs = require("fs");

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use((req, res, next) => {
  console.log("req.url: ", req.url);
  next();
});

let articles = [];
try {
  articles = JSON.parse(fs.readFileSync("./database/articles.json"));
} catch (err) {
  console.log("err: ", err);
  process.exit(1);
}

app.get("/stock", (req, res, next) => {
  res.render("stock", { articles });
});

app.get("/add", (req, res, next) => {
  res.render("add", {});
});

app.post("/action/add", (req, res, next) => {
  const article = {
    name: "kiki",
    price: 2.34,
    quantity: 234,
  };
  articles.push(article);
  res.redirect("/stock");
});

app.use(express.static("www"));
app.use(serveIndex("www"));

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
