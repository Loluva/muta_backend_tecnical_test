const express=require("express")
const {json}=require("express")
const {router}=require("./routes")
const {errorHandler}=require("./middlewares/errorHandler")
require("dotenv").config()

// Create an instance of Express
const app=express()
// Define the port for the server to listen on
const PORT=process.env.PORT||3030

//Express middlewares
app.use(json())

//Welcome route
app.get("/",(req,res)=>{
    res.json({message:"API RESTful para la gestión de materiales reciclables y recolecciones."})
})

//Routing
app.use("/",router)

//Error handler middleware
app.use(errorHandler)

//Start the server and listen on the specified port
app.listen(PORT,(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log(`server on port ${PORT}`)
    }
})