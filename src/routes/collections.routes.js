const {Router}=require("express")
const collectionsRoute=Router()
const {authenticateJWT}=require("../middlewares/authMiddleware")
const {getCollections,getCollectionsById,postCollections,updateCollectionsById,deleteCollectionsById}=require("../controllers/collections.controller")
const { tryCatch } = require("../utils/trycatch")
// Define routes for collections
collectionsRoute.get("/",authenticateJWT,tryCatch(getCollections))
collectionsRoute.get("/:id", authenticateJWT,tryCatch(getCollectionsById))
collectionsRoute.post("/",authenticateJWT,tryCatch(postCollections))
collectionsRoute.put("/:id",authenticateJWT,tryCatch(updateCollectionsById))
collectionsRoute.delete("/:id",authenticateJWT,tryCatch(deleteCollectionsById))

module.exports={collectionsRoute}