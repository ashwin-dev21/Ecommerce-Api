const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
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
        Amount:{
            type:Number,
            required:true,
        },
        Address:{
            type:Object,
            required:true,

        },
        Status:{
            type:String,
            default:"Pending",
        },
        
        
},{timestamps:true})

module.exports = mongoose.model("Order",OrderSchema );