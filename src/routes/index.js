const {Router}=require("express")
const {usersRoute}=require("./users.routes")
const {materialsRoute}=require("./materials.routes")
const {collectionsRoute}=require("./collections.routes")
const router=Router()

router.use("/",usersRoute)
router.use("/materials",materialsRoute)
router.use("/collections",collectionsRoute)

module.exports={router}
