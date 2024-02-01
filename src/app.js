const express=require("express")
const {json}=require("express")
const {router}=require("./routes")
const {errorHandler}=require("./middlewares/errorHandler")
require("dotenv").config()

//configs
const app=express()
const PORT=process.env.PORT||3030

// express middlewares
app.use(json())

app.get("/",(req,res)=>{
    res.json({message:"API RESTful para la gestión de materiales reciclables y recolecciones."})
})

//routes
app.use("/",router)

// error handler middleware
app.use(errorHandler)

//server connect
app.listen(PORT,(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log(`server on port ${PORT}`)
    }
})