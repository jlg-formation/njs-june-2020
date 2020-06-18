const express = require("express");

const app = express.Router();

module.exports = function (client) {
  app.post("/add", async (req, res, next) => {
    const article = req.body;
    console.log("article: ", article);
    article.id = "a" + Math.floor(Math.random() * 1e18);

    try {
      await client.query(
        "INSERT INTO articles (id, name, price, quantity) VALUES ($1, $2, $3, $4)",
        [article.id, article.name, article.price, article.quantity]
      );
      res.redirect("/stock");
    } catch (error) {
      console.log("err: ", err);
      res.status(500).end();
    }
  });

  return app;
};
