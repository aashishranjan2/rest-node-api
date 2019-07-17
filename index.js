require("./src/models/db");
const express = require("express");
const cors = require("cors");
// const path = require('path');
// const exphbs = require('express-handlebars');
const bodyparser = require("body-parser");
const employeeController = require("./src/controllers/employeeController");
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

// app.set('views', path.join(__dirname, '/views/'));
// app.engine('hbs', exphbs({extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/'}));
// app.set('view engine', 'hbs');

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`listening to port number ${port}`);
});

app.use("/employee", employeeController);
