const {pool}=require("../config/db")
const { validateidParameter } = require("../utils/validateId")
const { validateTimestamp } = require("../utils/validateTimestamp")

// Validate collections parameters
const validateCollectionParameters=({materialId, quantity,collectionDate})=>{
    if(materialId==undefined || typeof(materialId)!=="number" ||!Number.isInteger(Number(materialId))){
        let error= new Error("Invalid parameter: materialId")
        error.status=400
        throw error
    }
    if(quantity==undefined || typeof(quantity)!=="number" ||!Number.isInteger(Number(quantity))){
        let error= new Error("Invalid parameter: quantity")
        error.status=400
        throw error
    }
    if(collectionDate==undefined || typeof(collectionDate)!=="string" || !validateTimestamp(collectionDate )){
        let error= new Error("Invalid parameter: collectionDate")
        error.status=400
        throw error
    }
}
// Get all collections
const getCollections= async(req,res)=>{
        const db_response=await pool.query(`SELECT c.id,c.quantity,c.collection_date,m.name as material FROM collections as c JOIN materials as m ON c.material_id=m.id order by c.id`)
        if (db_response.rows.length<1){
            let error= new Error("No content")
            error.status=204
            throw error
        }
        return res.json(db_response.rows)         
}
// Get a collection by ID
const getCollectionsById=async(req,res)=>{
        validateidParameter(req.params.id)    
        const id=req.params.id
        
        const db_response=await pool.query(`SELECT c.id,c.quantity,c.collection_date,m.name as material FROM collections as c JOIN materials as m ON c.material_id=m.id WHERE c.id=${id}`)
        if (db_response.rows.length<1){
            let error= new Error("No content")
            error.status=204
            throw error
        }
        return res.json(db_response.rows[0])
}
// Create a new collection
const postCollections=async(req,res)=>{
        validateCollectionParameters(req.body)
        const {materialId, quantity,collectionDate}=req.body

        let db_response=await pool.query(`SELECT * FROM materials  WHERE id=${materialId}`)
         if (db_response.rows.length<1){
            let error= new Error("Material id not found")
            error.status=404
            throw error
        }
        db_response= await pool.query(`INSERT INTO collections (material_id,quantity,collection_date) VALUES ('${materialId}','${quantity}','${collectionDate}') RETURNING *`)
        return  res.status(201).json(db_response.rows[0])
}
// Update a collection by ID
const updateCollectionsById=async(req,res)=>{
        validateidParameter(req.params.id)
        validateCollectionParameters(req.body)
        const id=req.params.id
        const {materialId, quantity,collectionDate}=req.body

        let db_response=await pool.query(`SELECT * FROM materials  WHERE id=${materialId}`)
        if (db_response.rows.length<1){
            let error= new Error("Material id not found")
            error.status=404
            throw error
        }

        db_response=await pool.query(`UPDATE collections SET material_id='${materialId}',quantity='${quantity}',collection_date='${collectionDate}' WHERE id=${id} RETURNING *`)
        
        if (db_response.rows.length<1){
            let error= new Error("Collection not found")
            error.status=404
            throw error
        }

        return res.json(db_response.rows[0])
}
// Delete a collection by ID
const deleteCollectionsById=async(req,res)=>{
        validateidParameter(req.params.id)
        const id=req.params.id

        const db_response=await pool.query(`DELETE FROM collections WHERE id=${id} RETURNING *`)
        if (db_response.rows.length<1){
            let error= new Error("Collection not found")
            error.status=404
            throw error
        }
        return res.json(db_response.rows[0])
}


module.exports={getCollections,getCollectionsById,postCollections,updateCollectionsById,deleteCollectionsById}