var mongoose = require("mongoose");
var mongooseValidator = require("mongoose-unique-validator");
let userSchema = mongoose.Schema({
  username: {type:String, required:true},
  email: {type:String, required:true, unique:true},
  password: {type:String, required:true},
  cart: {
    movies:[
      {
        movieId: mongoose.Types.ObjectId,
        quantity:Number
      }
    ]
  },
});

userSchema.plugin(mongooseValidator); //adds a rule to the schema which is mongoose validator which doesnt allow repetition of unique values
module.exports=mongoose.model("User",userSchema)
