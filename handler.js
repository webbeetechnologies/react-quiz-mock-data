const serverless = require("serverless-http");
const customers = require("./customers.json");
const express = require("express");
var cors = require('cors')

const app = express();
app.use(cors())

app.post("/customers", (req, res, next) => {
  return res.status(200).json({
    customerIds: customers.map(({ id }) => id),
  }).setHeader("Access-Control-Allow-Origin", "*").setHeader('Access-Control-Allow-Credentials', true);
});

app.get("/customers", (req, res, next) => {
  return res.status(200).json({
    customerIds: customers.map(({ id }) => id),
  }).setHeader("Access-Control-Allow-Origin", "*").setHeader('Access-Control-Allow-Credentials', true);
});

app.get("/customers/:id", (req, res, next) => {
  const customerId = req.params.id;
  const item = customers.find(({ id }) => customerId === id);
  if (!item) {
    res.status(400);
  }
  return res.status(200).json(item);
});

module.exports.handler = serverless(app);
