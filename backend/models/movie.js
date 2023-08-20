var mongoose = require("mongoose");
let mongooseSchema = mongoose.Schema({
  id: Number,
  name: String,
  genre: String,
  poster: String,
  date: String,
  description: String,
  show: Boolean,
  price:Number,
  quantity: Number,
  available: Boolean
});

module.exports=mongoose.model("Movies",mongooseSchema)
