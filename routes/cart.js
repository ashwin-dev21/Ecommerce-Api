const router = require("express").Router();
const Cart = require("../models/Cart");
// const Cart = require("../models/Cart")
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken")



//create 

router.post("/",verifyToken,async(req,res)=>{
    const newCart = new Cart(req.body)
    try{
        const savedCart = await newCart.save()
        res.status(200).json(savedCart)
    }catch(err){
        res.status(500).json(err)
    }
});
// //update
    router.put("/:id",verifyTokenAndAuthorization,async(req,res)=>{
      try{ 
      const updatedCart = await Cart.findByIdAndUpdate(req.params.id,{
        $set:req.body
      },{new:true})
      res.status(200).json(updatedCart)
    }catch(err){res.status(500).json(err)}
       
    });

// //     //delete
    router.delete("/:id", verifyTokenAndAuthorization,async(req,res)=>{
      try{
         await Cart.findByIdAndDelete(req.params.id)
         res.status(200).json("Cart Deleted")
      }catch(err) {
        res.status(500).json(err)

      }
    });

// //     //get
    router.get ("/:id" ,async(req,res)=>{
      try{
       const Cart =  await Cart.findOne({userId : req.params.userId })
    //    const {password,...others} = product._doc
         res.status(200).json(Cart)

      }catch(err) {
        res.status(500).json(err)

      }
    })

// //     //get all cart

router.get("/",verifyTokenAndAdmin,async(req,res)=>{
    try{
        const carts = await Cart.find()
        res.status(200).json(carts)
    }catch(err){
        res.status(500).json(err)
    }
})


module.exports = router;   

