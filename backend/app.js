var express = require("express");
var app = express();
var cors = require('cors');
var mongoose = require("mongoose");
var env = require("dotenv");

let userRoutes = require('./routes/users');
let movieRoutes = require('./routes/movies');
env.config();

// Connect to database
mongoose
  .connect(
    process.env.CONNECT_URL
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
