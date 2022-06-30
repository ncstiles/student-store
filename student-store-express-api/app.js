const express = require("express");
const morgan = require("morgan");
const storeRoute = require("./routes/store");
const { NotFoundError } = require("./utils/errors.js");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send({ ping: "pong" });
});

app.use("/store", storeRoute);

app.use((req, res, next) => {
  next(new NotFoundError());
});

app.use((error, req, res, next) => {
  let message = error.message
    ? error.message
    : "Something wen't wrong in the application";
  let status = error.status ? error.status : 500;

  const errorObj = {
    status: status,
    message: message,
  };

  res.status(status).send({ error: errorObj });
  next();
});

module.exports = app;
