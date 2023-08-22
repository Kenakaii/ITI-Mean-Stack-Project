var express = require("express");
var Movie = require("../models/movie");
var mongoose = require("mongoose");

// Express router

let router = express.Router();

// /products (get) to get all products

router.get("/getAllMovies", function (req, res)
{
  let currentPage = req.query.currentPage;
  let pageSize = req.query.pageSize;
  let moviesData;
  let myQuery = Movie.find();
  if(currentPage && pageSize)
  {
    myQuery.skip((currentPage - 1) * pageSize).limit(pageSize);
  }
  myQuery
    .then(function (productsData)
    {
      moviesData = productsData;
      return Movie.count();
    })
    .then(function(totalMovies)
    {
      res.status(200).json({
        moviesData,
        totalMovies
      })
    })
    .catch(function (err)
    {
      console.log("Error");
    })
});

//  /products/:id (get) to get a product by ID

router.get("/getMovie/:id", function (req, res)
{
  var productId = req.params.id;
  Movie.findOne({ id: productId })
    .then(function (specificMovie)
    {
      if (!specificMovie)
      {
        res.send({
          message: "No Movie found with this id",
        });
      }
      else
      {
        res.send(specificMovie);
      }
    })
    .catch(function (err)
    {
      console.log(`Error ${err}`);
    })
});

// /addProduct (post) to add a new product

router.post("/addMovie", function (req, res)
{
  var newmovieData = req.body;
  // console.log(req.body);
  let newMovie = new Movie({
    id: newmovieData.id,
    name: newmovieData.name,
    genre: newmovieData.genre,
    poster: newmovieData.poster,
    date: newmovieData.date,
    description: newmovieData.description,
    show: newmovieData.show,
    price: newmovieData.price,
    stock: newmovieData.stock,
    available: newmovieData.available
  });

  newMovie.save()
    .then(function (data)
    {
      console.log("new movie added!");
      // console.log(data);
    })
    .catch(function (err)
    {
      console.log("Error");
    })
});

module.exports = router;