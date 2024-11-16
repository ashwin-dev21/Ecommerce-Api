const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
    {
        userId:{
             type : String,
             required: true,
             
        },
        Products:[
            {
                productId:{
                    type:String,
                }, 
                quantity:{
                     type:Number,
                     default:0,
                },
            },
        ],
        
        
},{timestamps:true})

module.exports = mongoose.model("Cart",CartSchema );