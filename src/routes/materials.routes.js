const {Router} =require("express")
const {authenticateJWT}=require("../middlewares/authMiddleware")
const {getMaterials,getMaterialsById,postMaterials,updateMaterialsById,deleteMaterialsById}=require("../controllers/materials.controller")
const { tryCatch } = require("../utils/trycatch")
const materialsRoute=Router()

materialsRoute.get("/",authenticateJWT,tryCatch(getMaterials))
materialsRoute.get("/:id", authenticateJWT,tryCatch(getMaterialsById))
materialsRoute.post("/",authenticateJWT,tryCatch(postMaterials))
materialsRoute.put("/:id",authenticateJWT,tryCatch(updateMaterialsById))
materialsRoute.delete("/:id",authenticateJWT,tryCatch(deleteMaterialsById))



module.exports={materialsRoute}