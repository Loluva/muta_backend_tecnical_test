const {Router} =require("express")
const {authenticateJWT}=require("../middlewares/authMiddleware")
const {postOptimalPath}=require("../controllers/optimalPath.controller")
const { tryCatch } = require("../utils/trycatch")
const optimalPathRoute=Router()

optimalPathRoute.post("/",authenticateJWT,tryCatch(postOptimalPath))

module.exports={optimalPathRoute}
