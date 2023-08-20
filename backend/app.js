var express = require("express");
var app = express();
var cors = require('cors');
var mongoose = require("mongoose");
var Movie = require("./models/movie");
var User = require("./models/user");
const user = require("./models/user");

// for dev purposes initially
var currentUser={
  _id:'64e22a67896cf3c54be9dfb5',
  username:'abood',
  email:'abood4@gmail.com',
}

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
    })
});

//  /products/:id (get) to get a product by ID

app.get("/products/:id", function (req, res)
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

app.post("/addProduct", function (req, res)
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
    quantity: newmovieData.quantity,
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

// /addUser (post) to add new user

app.post('/addUser', function(req, res)
{
  var userdata = req.body;
  var newUser = new User({
    username: userdata.username,
    email: userdata.email,
    cart: {
      movies:[]
    }
  });

  newUser.save()
  .then(function(newuser)
  {
    console.log(newuser);
    res.json({
      message:'User created successfully',
    });
  })
  .catch(function(err)
  {
    console.log("err");
  })
});

// /getCart (get) to get all movies in cart

app.get('/getCart', function(req, res)
{
  let userInfo;
  User.findById({_id:currentUser._id})
  .then(function(user)
  {
    userInfo = user;

    let cartmoviesIds=user.cart.movies.map(function(movie)
    {
      return movie.movieId;
    });
    // console.log(cartmoviesIds);

    return Movie.find({ _id: { $in: cartmoviesIds } });
  })
  .then(function(retrievedMovies)
  {
    // console.log(retrievedMovies);
    // console.log(userInfo);
    var movies = retrievedMovies.map(function(movie)
    {
      let index = userInfo.cart.movies.findIndex(function(singlemovie)
      {
        return singlemovie.movieId.toString() == movie._id.toString();
      });
      // console.log(index);
      console.log(userInfo.cart.movies[index].quantity);
      return {
        movieInfo: movie,
        quantity: userInfo.cart.movies[index].quantity,
      };
    });
    res.send(movies);
  })
  .catch(function(err)
  {
    console.log(err);
  })
});

// /addtoCart (post) to add movie blu-ray to cart

app.post('/addtoCart',function(req, res)
{
  var cartmovieId=req.body.movieId;
  console.log(cartmovieId);

  User.findById({_id:currentUser._id})
  .then(function(user)
  {
    let newuserCart = [...user.cart.movies];
    console.log(newuserCart);
    
    var cartmovieIndex=user.cart.movies.findIndex(function(cartmovie)
    {
      return cartmovie.movieId.toString() == cartmovieId.toString();
    });
    console.log(cartmovieIndex);

    if(cartmovieIndex >= 0) //already in cart
    {
      newquantity = user.cart.movies[cartmovieIndex].quantity + 1;
      newuserCart[cartmovieIndex].quantity = newquantity;
    }
    else //wasn't in cart
    {
      newuserCart.push({
        movieId:new mongoose.Types.ObjectId(cartmovieId),
        quantity:1
      });
    }

    let userCart = {
      movies:newuserCart
    };
    return User.updateOne({_id:currentUser._id}, {$set:{cart:userCart}});
  })
  .then(function(updatedUser)
  {
    console.log(updatedUser)
  })
  .catch(function(err)
  {
    console.log('error in addtoCart');
  })
});

app.listen(3000, function ()
{
  console.log("server connected");
});
