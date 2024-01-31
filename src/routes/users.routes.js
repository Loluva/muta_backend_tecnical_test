const {Router}=require("express")
const {pool}=require("../config/db")
const usersRoute=Router()

usersRoute.post("/login",async (req,res)=>{
    const {username,password}=req.body
    try{
        let db_response=await pool.query(`SELECT (username, password) FROM users WHERE username='${username}'`)
        if(db_response.rows.length<1){
            return res.status(400).json({error:"Wrong username or password"})
        }
        console.log(db_response.rows[0])
        return res.json(db_response.rows[0])
    }catch(err){
        console.log(err)
        return res.status(500).json({error:"Internal server Error"})
    }
    
})

usersRoute.post("/register",async (req,res)=>{
    const {username,password}=req.body

    let db_response=await pool.query(`SELECT username, password FROM users WHERE username='${username}'`)
    if(db_response.rows.length>0){
        return res.status(400).json({error:"This user already exist"})
    }
    db_response = await pool.query(`INSERT INTO users (username, password) VALUES ('${username}', '${password}') RETURNING * `);

    return res.status(201).json(db_response.rows[0]);
})

module.exports={usersRoute}