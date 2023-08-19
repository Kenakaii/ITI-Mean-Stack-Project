var express = require("express");
var app = express();
var cors = require('cors');
var mongoose = require("mongoose");
var Movie = require("./models/movie");

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

// /products (get) to get all products

app.get("/products", function (req, res)
{
  let currentPage = req.query.currentPage;
  let pageSize = req.query.pageSize;
  let moviesData;
  let myQuery = Movie.find();
  if(currentPage && pageSize)
  {
    myQuery.skip((currentPage - 1) * pageSize).limit(pageSize);
    // console.log(currentPage);
    // console.log(pageSize);
  }
  myQuery
    .then(function (productsData)
    {
      moviesData = productsData;
      // console.log(productsData);

      // if (productsData.length == 0)
      // {
      //   // console.log(productsData);
      //   res.send({
      //     message: "No Products Founded",
      //   });
      // }
      // else
      // {
      //   // console.log(productsData);
      //   res.status(200).send(productsData);
      // }
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
    });
});

//  /products/:id (get) to get a product by ID

app.get("/products/:id", function (req, res)
{
  var productId = req.params.id;
  Movie.findOne({ id: productId })
    .then(function (singleProduct)
    {
      if (!singleProduct)
      {
        res.send({
          message: "No Product Founded with this id",
        });
      }
      else
      {
        res.send(singleProduct);
      }
    })
    .catch(function (err)
    {
      console.log(`Error ${err}`);
    });
});

// /addProduct (post) to add a new product

app.post("/addProduct", function (req, res)
{
  var newProductData = req.body;
  console.log(req.body);
  let newProduct = new Movie({
    id: newProductData.id,
    title: newProductData.title,
    price: newProductData.price,
    description: newProductData.description,
    category: newProductData.category,
    image: newProductData.image,
    rating: {
      rate: newProductData.reatingCount,
      count: 120,
    },
  });

  newProduct.save()
    .then(function (data)
    {
      console.log("product added!");
      console.log(data);
    })
    .catch(function (err)
    {
      console.log("Error");
    });
});

app.listen(3000, function ()
{
  console.log("server connected");
});
