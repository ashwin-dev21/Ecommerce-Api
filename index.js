const express =  require("express")
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const ProductRoute = require("./routes/product")
const CartRoute = require("./routes/cart")
const OrderRoute = require("./routes/order")
  
dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(()=>
    console.log("db connected successfully"))
.catch((err)=>{
    console.log(err)
})

app.use(express.json());
app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/products",ProductRoute);
app.use("/api/carts",CartRoute);
app.use("/api/orders",OrderRoute);


app.listen(4000,()=>{
    console.log("Server is running  ")
});