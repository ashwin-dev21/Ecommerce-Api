const router = require("express").Router();
const Order = require("../models/Order");
// const Cart = require("../models/Cart")
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken")



//creOrder

router.post("/",verifyToken,async(req,res)=>{
    const newOrder = new Cart(req.body)
    try{
        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder)
    }catch(err){
        res.status(500).json(err)
    }
});
// //update
    router.put("/:id",verifyTokenAndAdmin,async(req,res)=>{
      try{ 
      const updatedOrder = await Order.findByIdAndUpdate(req.params.id,{
        $set:req.body
      },{new:true})
      res.status(200).json(updatedOrder)
    }catch(err){res.status(500).json(err)}
       
    });

// //     //delete
    router.delete("/:id", verifyTokenAndAdmin,async(req,res)=>{
      try{
         await Order.findByIdAndDelete(req.params.id)
         res.status(200).json("Order Deleted")
      }catch(err) {
        res.status(500).json(err)

      }
    });

// //     //get
    router.get ("/:id" ,async(req,res)=>{
      try{
       const orders=  await Order.find({userId : req.params.userId })
    
         res.status(200).json(orders)

      }catch(err) {
        res.status(500).json(err)

      }
    })

// //     //get all cart

router.get("/",verifyTokenAndAdmin,async(req,res)=>{
    try{
        const orders = await Order.find()
        res.status(200).json(orders)
    }catch(err){
        res.status(500).json(err)
    }
})


module.exports = router;   

