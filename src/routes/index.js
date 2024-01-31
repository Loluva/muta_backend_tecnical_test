const {Router}=require("express")
const {userRoute}=require("./user.routes")

const router=Router()

router.use("/users",userRoute)

module.exports={router}
