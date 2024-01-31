const {Router} =require("express")
const {pool}=require("../config/db")
const materialsRoute=Router()

materialsRoute.get("/",async (req,res)=>{
    try {
        const db_response=await pool.query(`SELECT * FROM materials order by id`)
        if (db_response.rows.length<1){
            console.log({error:"Not materials found"})
            return res.status(204).json({error:"Not materials found"})
        }
        return res.json(db_response.rows)
        
    } catch (err) {
        if(err){
            console.log(err)
            return res.json({error: "Internal server Error"})
        }
    }
})
materialsRoute.get("/:id", async(req,res)=>{
    try {
        const id=req.params.id
        const db_response=await pool.query(`SELECT * FROM materials WHERE id='${id}'`)
        if (db_response.rows.length<1){
            console.log({error:"Not materials found"})
           return res.status(204).json({error:"Not materials found"})
        }
        return res.json(db_response.rows[0])
        
    } catch (err) {
        if(err){
            console.log(err)
            return res.json({error: "Internal server Error"})
        }
    }

})
materialsRoute.post("/",async (req,res)=>{
    try {
        const {name, weight,value}=req.body
        if(!typeof(name)=="string") return res.status(400).json({error:"material name is invalid"})
        if(!typeof(weight)=="number") return res.status(400).json({error:"material weight is invalid"})
        if(!typeof(value)=="number") return res.status(400).json({error:"material value is invalid"})
        const db_response= await pool.query(`INSERT INTO materials (name,weight,value) VALUES ('${name}','${weight}','${value}') RETURNING *`)
        return  res.status(201).json(db_response.rows[0])
    } catch (err) {
        if(err){
            console.log(err)
            return res.json({error: "Internal server Error"})
        }
    }

})
materialsRoute.put("/:id",async (req,res)=>{
    try {
        const id=req.params.id
        const {name, weight,value}=req.body
        if(!typeof(name)=="string") return res.status(400).json({error:"material name is invalid"})
        if(!typeof(weight)=="number") return res.status(400).json({error:"material weight is invalid"})
        if(!typeof(value)=="number") return res.status(400).json({error:"material value is invalid"})
        const db_response=await pool.query(`UPDATE materials SET name='${name}',weight='${weight}',value='${value}' WHERE id=${id} RETURNING *`)
        if (db_response.rows.length<1){
            console.log({error:"Not materials found"})
           return res.status(204).json({error:"Not materials found"})
        }
        return res.json(db_response.rows[0])
    } catch (err) {
        if(err){
            console.log(err)
            return res.json({error: "Internal server Error"})
        }
    }

})
materialsRoute.delete("/:id",async (req,res)=>{
    try {
        const id=req.params.id
        const db_response=await pool.query(`DELETE FROM materials WHERE id=${id} RETURNING *`)
        if (db_response.rows.length<1){
            console.log({error:"Not materials found"})
           return res.status(204).json({error:"Not materials found"})
        }
        return res.json(db_response.rows[0])
    } catch (err) {
        if(err){
            console.log(err)
            return res.json({error: "Internal server Error"})
        }
    }

})



module.exports={materialsRoute}