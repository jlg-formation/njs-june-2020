import express from "express";

const app = express.Router();

export default function (client) {
  app.delete("/bulk/articles", async (req, res, next) => {
    const ids = req.body;
    console.log("ids: ", ids);

    const str = `DELETE FROM articles WHERE id IN (${ids
      .map((n, i) => "$" + (i + 1))
      .join(",")})`;

    console.log("str: ", str);
    await client.query(str, ids);

    try {
      ids.forEach(async (id) => {});
      res.status(204).end();
    } catch (err) {
      console.log("err: ", err);
      res.status(500).end();
    }
  });
  return app;
}
