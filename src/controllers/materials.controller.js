const {pool}=require("../config/db")
const { validateidParameter } = require("../utils/validateId")

// Validate material parameters
const validateMaterialParameters=({name, weight,value})=>{

    if(weight==undefined || typeof(weight)!=="number" ){
        let error= new Error("Invalid parameter: weight")
        error.status=400
        throw error
    }
    if(value==undefined || typeof(value)!=="number" ){
        let error= new Error("Invalid parameter: value")
        error.status=400
        throw error
    }
    if(name==undefined || typeof(name)!=="string" || name==""){
        let error= new Error("Invalid parameter: name")
        error.status=400
        throw error
    }
}
// Get all materials
const getMaterials=async (req,res)=>{
 
        const db_response=await pool.query(`SELECT * FROM materials order by id`)
        if (db_response.rows.length<1){
            let error= new Error("No content")
            error.status=204
            throw error
        }
        return res.json(db_response.rows)
        
}
// Get a material by ID
const getMaterialsById=async (req,res)=>{
    validateidParameter(req.params.id)
    const id=req.params.id
        const db_response=await pool.query(`SELECT * FROM materials WHERE id='${id}'`)
        if (db_response.rows.length<1){
            let error= new Error("No content")
            error.status=204
            throw error
        }
        return res.json(db_response.rows[0])

}
// Create a new material
const postMaterials=async (req,res)=>{
        validateMaterialParameters(req.body)
        const {name, weight,value}=req.body
       
        const db_response= await pool.query(`INSERT INTO materials (name,weight,value) VALUES ('${name}','${weight}','${value}') RETURNING *`)
        return  res.status(201).json(db_response.rows[0])

}

// Update a material by ID
const updateMaterialsById=async (req,res)=>{
        validateidParameter(req.params.id)
        validateMaterialParameters(req.body)
        const id=req.params.id
        const {name, weight,value}=req.body
        
        const db_response=await pool.query(`UPDATE materials SET name='${name}',weight='${weight}',value='${value}' WHERE id=${id} RETURNING *`)
        if (db_response.rows.length<1){
            let error= new Error("Material id not found")
            error.status=404
            throw error
        }
        return res.json(db_response.rows[0])
}
// Delete a material by ID
const deleteMaterialsById=async (req,res)=>{
        validateidParameter(req.params.id)
        const id=req.params.id

        const db_response=await pool.query(`DELETE FROM materials WHERE id=${id} RETURNING *`)
        if (db_response.rows.length<1){
            let error= new Error("Material id not found")
            error.status=404
            throw error
        }
        return res.json(db_response.rows[0])
}




module.exports={getMaterials,getMaterialsById,postMaterials,updateMaterialsById,deleteMaterialsById}