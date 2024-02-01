const {Router}=require("express")
const {userLogin,userRegister}=require("../controllers/users.controller")
const { tryCatch } = require("../utils/trycatch")
const usersRoute=Router()

usersRoute.post("/login",tryCatch(userLogin))
usersRoute.post("/register",tryCatch(userRegister))

module.exports={usersRoute}