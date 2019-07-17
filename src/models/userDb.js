const mongoose = require("mongoose");

// mongoose.connect('mongodb://localhost:27017/EmployeeDB', {useNewUrlParser: true}, (err) => {
//     if (!err) return console.log('Error in DB connection..', err);
//     console.log('MongoDB connection succeeded');
// });
mongoose.connect(
  "mongodb+srv://admin:admin@node-rest-form-tvqba.mongodb.net/UsersDB?retryWrites=true&w=majority",
  {
    useNewUrlParser: true
  }
);
require("./user.model");
