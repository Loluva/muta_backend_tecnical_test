const jwt=require("jsonwebtoken")
require("dotenv").config()

const auth_secret=process.env.AUTH_SECRET

// Middleware for authenticating JWT tokens
const authenticateJWT=(req,res,next)=>{
     // Extract the token from the Authorization header
    const token=req.header("Authorization")
    // Check if the token is missing
    if(!token) return res.status(401).json({error: "Unauthorized access"})

    try {
        // Verify the token using the authentication secret
        const decoded=jwt.verify(token,auth_secret)
        req.user=decoded.user
        next()
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }   
}
module.exports={authenticateJWT}