const {Router}=require("express")
const {usersRoute}=require("./users.routes")
const {materialsRoute}=require("./materials.routes")
const {collectionsRoute}=require("./collections.routes")
const {optimalPathRoute}=require("./optimalPath.routes")
const router=Router()

router.use("/",usersRoute) // Routes related to users
router.use("/materials",materialsRoute) // Routes related to materials
router.use("/collections",collectionsRoute) // Routes related to collections
router.use("/optimalpath",optimalPathRoute) // Routes related to optimal path

module.exports={router}
