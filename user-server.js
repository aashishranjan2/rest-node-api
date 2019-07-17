require("./src/models/userDb");
const express = require("express");
const cors = require("cors");
// const path = require('path');
// const exphbs = require('express-handlebars');
const bodyparser = require("body-parser");
const userController = require("./src/controllers/userController");
const app = express();
// app.use(cors);
app.use(
  bodyparser.urlencoded({
    extended: true
  })
);
app.use(bodyparser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Header", "*");
  res.header("Content-Type", "application/json");
  if (req.method === "OPTIONS") {
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS, DELETE");
    return res.status(200).send({status:'OK'});
  }
  next();
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`listening to port number ${port}`);
});

app.use("/user", userController);
