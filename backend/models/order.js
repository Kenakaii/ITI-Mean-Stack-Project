var mongoose = require("mongoose");
let orderSchema = mongoose.Schema({
    movies:[
        {
            movieInfo: {
                id: Number,
                name: String,
                genre: String,
                poster: String,
                date: String,
                description: String,
                show: Boolean,
                price:Number,
                stock: Number,
                available: Boolean,
            },
            quantity: Number,
        }
    ],
    totalPrice: Number,
    user: {
        _id: mongoose.Types.ObjectId,
        username: String,
        email: String
    }
});

module.exports=mongoose.model("Orders",orderSchema);