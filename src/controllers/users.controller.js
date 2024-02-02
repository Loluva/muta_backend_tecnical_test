const {pool}=require("../config/db")
const jwt = require('jsonwebtoken');
const bcrypt=require("bcrypt")
require("dotenv").config()

const auth_secret=process.env.AUTH_SECRET
const saltRound=10

// Validate user parameters
const validateUserParameters=({username,password})=>{
    if(username==undefined || typeof(username)!=="string" || username==""){
        let error= new Error("Invalid parameter: username")
        error.status=400
        throw error
    }
    if(password==undefined || typeof(password)!=="string" || password==""){
        let error= new Error("Invalid parameter: password")
        error.status=400
        throw error
    }
}
// User login endpoint
const userLogin=async (req,res)=>{
    validateUserParameters(req.body)
    const {username,password}=req.body
    // Query the database for the user with the provided username
    let db_response=await pool.query(`SELECT * FROM users WHERE username='${username}'`)
    if(db_response.rows.length<1){
        let error=new Error("Wrong username or password")
        error.status=401
        throw error
    }
    // Compare the stored hashed password with the provided password
    const storedPassword = db_response.rows[0].password;
    const passwordMatch = await bcrypt.compare(password, storedPassword);
    if(!passwordMatch){
        let error=new Error("Wrong username or password")
        error.status=401
        throw error
    }
    const token = jwt.sign({ username }, auth_secret, { expiresIn: '1h' });
    return res.json(token)
}
// User registration endpoint
const userRegister=async (req,res)=>{
    validateUserParameters(req.body)
    const {username,password}=req.body
    
    // Check if the user already exists in the database
    let db_response=await pool.query(`SELECT username, password FROM users WHERE username='${username}'`)
    if(!db_response.rows.length<1){
        let error=new Error("This user already exist")
        error.status=409
        throw error
    }
    // Hash the password and insert the new user into the database
    const hashedPassword = await bcrypt.hash(password, saltRound);
    db_response = await pool.query(`INSERT INTO users (username, password) VALUES ('${username}', '${hashedPassword}')`);

    return res.status(201).json({message:"User created"});
}


module.exports={userLogin,userRegister}