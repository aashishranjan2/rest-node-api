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
  
    // callback
    user.save((err, doc) => {
      if (!err) res.send({success : 'Record has been inserted successfully!'});
      else {
        if (err.name == "ValidationError") {
         handleValidationError(err, req.body);
        //  next(err.message);
         res.status(400).send({error :  err.message});
        } else res.status(400).send({error : err});
      }
    });
  }

  function handleValidationError(err, body) {
    for (field in err.errors) {
      switch (err.errors[field].path) {
        case "fullName":
          body["fullNameError"] = err.errors[field].message;
          break;
        case "email":
          body["emailError"] = err.errors[field].message;
          break;
        case "password":
          body["passwordError"] = err.errors[field].message;
          break;
        case "rePassword":
          body["rePasswordError"] = err.errors[field].message;
          break;
        case "mobile":
          body["mobileError"] = err.errors[field].message;
          break;
        default:
          break;
      }
    }
  }


  // HTTP POST call to fetch user details on login
router.post("/login", (req, res) => {
  req.body = JSON.parse(Object.keys(req.body));
  
  User.findOne({'email': req.body.email}, (err, result) => {
    if (!err) {
      if(result && (result.password === req.body.password)) {
        res.status(200).send({success: {'isLoggedIn': true}});
      } else {
        res.status(400).send({error: 'user id/password combination is wrong or does not exist in our database'})
      }
    } else {
      console.log("Error in retrieving user detail :" + err);
    }
  });
  // req.body = JSON.parse(Object.keys(req.body));
});

  module.exports = router;