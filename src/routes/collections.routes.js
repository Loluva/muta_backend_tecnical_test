const {Router}=require("express")
const {pool}=require("../config/db")
const collectionsRoute=Router()
const {authenticateJWT}=require("../middlewares/authMiddleware")

collectionsRoute.get("/",authenticateJWT,async (req,res)=>{
    try {
        const db_response=await pool.query(`SELECT c.id,c.quantity,c.collection_date,m.name as material FROM collections as c JOIN materials as m ON c.material_id=m.id order by c.id`)
        if (db_response.rows.length<1){
            console.log({error:"Not collections found"})
            return res.status(204).json({error:"Not collections found"})
        }
        return res.json(db_response.rows)
        
    } catch (err) {
        if(err){
            console.log(err)
            return res.json({error: "Internal server Error"})
        }
    }
})
collectionsRoute.get("/:id", authenticateJWT,async(req,res)=>{
    try {
        const id=req.params.id
        const db_response=await pool.query(`SELECT c.id,c.quantity,c.collection_date,m.name as material FROM collections as c JOIN materials as m ON c.material_id=m.id WHERE c.id=${id}`)
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
collectionsRoute.post("/",authenticateJWT,async (req,res)=>{
    try {
        const {materialId, quantity,collectionDate}=req.body
        if(!typeof(materialId)=="number") return res.status(400).json({error:"material id is invalid"})
        if(!typeof(quantity)=="number") return res.status(400).json({error:"quantity is invalid"})
        if(!typeof(collectionDate)=="string") return res.status(400).json({error:"collection date is invalid"})
        let db_response=await pool.query(`SELECT * FROM materials  WHERE id=${materialId}`)
        if(db_response.rows.length<1){
            console.log("material id not found")
            return res.status(404).json({error:"material id not found"})
        }
         db_response= await pool.query(`INSERT INTO collections (material_id,quantity,collection_date) VALUES ('${materialId}','${quantity}','${collectionDate}') RETURNING *`)
        return  res.status(201).json(db_response.rows[0])
    } catch (err) {
        if(err){
            console.log(err)
            return res.json({error: "Internal server Error"})
        }
    }

})
collectionsRoute.put("/:id",authenticateJWT,async (req,res)=>{
    try {
        const id=req.params.id
        const {materialId, quantity,collectionDate}=req.body
        if(!typeof(materialId)=="number") return res.status(400).json({error:"material id is invalid"})
        if(!typeof(quantity)=="number") return res.status(400).json({error:"quantity is invalid"})
        if(!typeof(collectionDate)=="string") return res.status(400).json({error:"collection date is invalid"})
        let db_response=await pool.query(`SELECT * FROM materials  WHERE id=${materialId}`)
        if(db_response.rows.length<1){
            console.log("material id not found")
            return res.status(404).json({error:"material id not found"})
        }
         db_response=await pool.query(`UPDATE collections SET material_id='${materialId}',quantity='${quantity}',collection_date='${collectionDate}' WHERE id=${id} RETURNING *`)
        if (db_response.rows.length<1){
            console.log({error:"No collection found"})
           return res.status(404).json({error:"No collection found"})
        }
        return res.json(db_response.rows[0])
    } catch (err) {
        if(err){
            console.log(err)
            return res.json({error: "Internal server Error"})
        }
    }

})
collectionsRoute.delete("/:id",authenticateJWT,async (req,res)=>{
    try {
        const id=req.params.id
        const db_response=await pool.query(`DELETE FROM collections WHERE id=${id} RETURNING *`)
        if (db_response.rows.length<1){
            console.log({error:"No collection found"})
           return res.status(404).json({error:"No collection found"})
        }
        return res.json(db_response.rows[0])
    } catch (err) {
        if(err){
            console.log(err)
            return res.json({error: "Internal server Error"})
        }
    }

})

module.exports={collectionsRoute}