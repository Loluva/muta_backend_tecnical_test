const jwt=require("jsonwebtoken")
require("dotenv").config()

const auth_secret=process.env.AUTH_SECRET

const authenticateJWT=(req,res,next)=>{
    const token=req.header("Authorization")

    if(!token) return res.status(401).json({error: "Unauthorized access"})

    try {
        const decoded=jwt.verify(token,auth_secret)
        req.user=decoded.user
        next()
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }   
}
module.exports={authenticateJWT}