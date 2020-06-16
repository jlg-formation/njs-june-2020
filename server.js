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

const articles = JSON.parse(fs.readFileSync("./database/articles.json"));

app.get("/stock", (req, res, next) => {
  res.render("stock", { articles });
});

app.use(express.static("www"));
app.use(serveIndex("www"));

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
