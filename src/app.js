const express=require("express")
const {json}=require("express")
const {router}=require("./routes")
require("dotenv").config()

//configs
const app=express()
const PORT=process.env.PORT||3000

//middlewares
app.use(json())

app.get("/",(req,res)=>{
    res.json({message:"hello world"})
})
//routes
app.use("/",router)
//server connect
app.listen(PORT,(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log(`server on port ${PORT}`)
    }
})