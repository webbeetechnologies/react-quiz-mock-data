const serverless = require("serverless-http");
const customers = require("./customers.json");
const express = require("express");
const app = express();

app.post("/", (req, res, next) => {
  return res.status(200).json({
    customerIds: customers.map(({ id }) => id),
  });
});

app.get("/:id", (req, res, next) => {
  const customerId = req.params.id;
  const item = customers.find(({ id }) => customerId === id);
  if (!item) {
    res.status(400);
  }
  return res.status(200).json(item);
});

module.exports.handler = serverless(app);
