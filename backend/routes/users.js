var express = require("express");
var User = require("../models/user");
var Movie = require("../models/movie");
var Order = require("../models/order");
var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

// Express router

let router = express.Router();

// for dev purposes initially
var currentUser={
    _id:'64e3bb19a6c31bdff7376003',
    username:'abood',
    email:'abood4@gmail.com',
  }

// /signup (post) to sign up new user

router.post('/signup', function(req, res)
{
  var userdata = req.body;
  bcrypt.hash(userdata.userPassword, 10)
  .then(function(hashedpassword)
  {
    // console.log(hashedpassword);
        var newUser = new User({
        username: userdata.userName,
        email: userdata.userEmail,
        password: hashedpassword,
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
        res.statusCode = 400;
        res.send({ error: 'Duplicate validation error' }); 
      })
  })
  .catch(function(err)
  {
    console.log(err);
  })
});

// /login (post) to log in user

router.post('/login', function(req, res)
{
    var userdata = req.body;
    let loggedUser;
    User.findOne({email:userdata.userEmail})
    .then(function(user)
    {
        if(!user)
        {
            return res.status(401).json({
                message:"User Doesn't Exist"
            });
        }
        loggedUser = user;
        return bcrypt.compare(userdata.userPassword, user.password);
    })
    .then(function(comparisonResult)
    {
        if(!comparisonResult)
        {
            return res.status(401).json({
                message:"Wrong Password"
            });
        }

        let token = jwt.sign({email:loggedUser.email, uid:loggedUser._id}, 'MEAN_stack_GROUP_made_PROJECT_for_ITI',
        {expiresIn:'1h'});

        res.status(200).json({
            message:'Login Successful!',
            token:token,
        });
    })
    .catch(function(err)
    {
        console.log(err);
        return res.status(401).json({
            message:"Authentication Error"
        });
    })
});

// /getCart (get) to get all movies in cart

router.get('/getCart', function(req, res)
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

router.post('/addtoCart',function(req, res)
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

// /addOrder (post) to create new order.

router.post('/addOrder', function(req, res)
{
    let cartitems = req.body.cartitems;
    let totalprice = req.body.totalprice;
    let newOrder = new Order({
        movies: cartitems,
        totalPrice: totalprice,
        user: {
            _id: new mongoose.Types.ObjectId(currentUser._id),
            username: currentUser.username,
            email: currentUser.email
        }
    });

    newOrder.save()
    .then(function(createdOrder)
    {
        User.updateOne({ _id: currentUser._id }, { $set: { cart: { movies: [] } } })
        .then(function(updatedUser)
        {
            console.log(updatedUser);
            res.json('Order Successfully Created!');
        });
    })
    .catch(function(err)
    {
        console.log(err);
    })
});

// /getOrders (get) to get all orders

router.get('/getOrders', function(req, res)
{
    Order.find({'user._id': currentUser._id})
    .then(function(userOrders)
    {
        console.log(userOrders);
        res.send(userOrders);
    })
    .catch(function(err)
    {
        console.log(err);
    })
});

module.exports = router;