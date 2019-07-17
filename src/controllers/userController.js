const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");

// HTTP POST call
router.post("/", (req, res) => {
    req.body = JSON.parse(Object.keys(req.body));
    insertRecord(req, res);
  });

  function insertRecord(req, res) {
    var user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.rePassword = req.body.rePassword;
    user.mobile = req.body.mobile;
  
    // promise way
    user
      .save()
      .then(results => {
        console.log(results);
        res.send(user);
      })
      .catch(err => console.log(err));
  }

  module.exports = router;