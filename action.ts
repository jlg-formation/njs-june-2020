import express, { Router } from "express";
import { Client } from "pg";

const app = express.Router();

export default function (client: Client): Router {
  app.post("/add", async (req, res) => {
    const article = req.body;
    console.log("article: ", article);
    article.id = "a" + Math.floor(Math.random() * 1e18);

    try {
      await client.query(
        "INSERT INTO articles (id, name, price, quantity) VALUES ($1, $2, $3, $4)",
        [article.id, article.name, article.price, article.quantity]
      );
      res.redirect("/stock");
    } catch (err) {
      console.log("err: ", err);
      res.status(500).end();
    }
  });

  app.post("/update", async (req, res) => {
    const article = req.body;
    console.log("article: ", article);

    try {
      await client.query(
        "UPDATE articles  SET name = $2, price = $3, quantity = $4 WHERE id = $1",
        [article.id, article.name, article.price, article.quantity]
      );
      res.redirect("/stock");
    } catch (err) {
      console.log("err: ", err);
      res.status(500).end();
    }
  });

  return app;
}
