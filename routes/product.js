const router = require("express").Router();
const Product = require("../models/Product")
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken")



//create 

router.post("/",verifyTokenAndAdmin,async(req,res)=>{
    const newProduct = new Product(req.body)
    try{
        const savedProduct = await newProduct.save()
        res.status(200).json(savedProduct)
    }catch(err){
        res.status(500).json(err)
    }
});
// //update
    router.put("/:id",verifyTokenAndAdmin,async(req,res)=>{
      try{ 
      const updatedProduct = await Product.findByIdAndUpdate(req.params.id,{
        $set:req.body
      },{new:true})
      res.status(200).json(updatedProduct)
    }catch(err){res.status(500).json(err)}
       
    });

//     //delete
    router.delete("/:id", verifyTokenAndAdmin,async(req,res)=>{
      try{
         await Product.findByIdAndDelete(req.params.id)
         res.status(200).json("Product Deleted")

      }catch(err) {
        res.status(500).json(err)

      }
    });

//     //get
    router.get ("/:id" ,async(req,res)=>{
      try{
       const product =  await Product.findById(req.params.id)
    //    const {password,...others} = product._doc
         res.status(200).json(product)

      }catch(err) {
        res.status(500).json(err)

      }
    })

//     //get all product
    router.get ("/",async(req,res)=>{
        const qNew = req.params.qNew;
        const qCategory = req.params.qCategory;
      try{
        let prodacts;

        if(qNew){
            prodacts = await Product.find({createdAtDate:-1}).limit(5)
        }else if(qCategory){
            prodacts = await Product.find({categories:{
                $in:[qCategory]
            }});
        }else{
            prodacts = await Product.find();
        }
      res.status(200).json(prodacts) 
      }catch(err) {
        res.status(500).json(err)

      }
    });

module.exports = router;   

