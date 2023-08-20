var mongoose = require("mongoose");
let mongooseSchema = mongoose.Schema({
  username: String,
  email: String,
  cart: {
    movies:[
      {
        movieId: mongoose.Types.ObjectId,
        quantity:Number
      }
    ]
  },
});

module.exports=mongoose.model("User",mongooseSchema)
