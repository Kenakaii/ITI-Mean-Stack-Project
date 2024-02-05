var express = require("express");
var app = express();
var cors = require('cors');
var mongoose = require("mongoose");

let userRoutes = require('./routes/users');
let movieRoutes = require('./routes/movies');

// Connect to database
mongoose
  .connect(
    "mongodb+srv://abdelrahmanmoustafa5:ASDqwe123@cluster0.ay9xq27.mongodb.net/ProjectMooVees"
  )
  .then(function ()
  {
    console.log("Database connected");
  })
  .catch(function (err)
  {
    console.log(`Error connecting to database, wrong username or password`);
  });
  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/Users', userRoutes);
app.use('/Movies', movieRoutes);

app.listen(3000, function ()
{
  console.log("server connected");
});
