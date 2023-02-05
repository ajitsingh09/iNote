const jwt = require('jsonwebtoken');
const jwt_secretkey = "thisisajit'skey"


//MIDDLEWARE FETCHUSER......
//NOW the main purpose of this middleware is to 
//1. Verify the jwt
//2. Decode the jwt and get the id of the user and return it
const fetchuser=(req,res,next)=>{
    const token=req.header("auth-token")
    if(!token){
        res.status(401).send({error:"Please authenticate using a valid token"})
    }

    try {
        const data = jwt.verify(token,jwt_secretkey)
        req.user=data.user//becasues data is a object which has a object user which has id as user 
        next()//allow to continue to next middleware or route
    } catch (error) {
        res.status(401).send({error:"Token Has been compramised"})
        
    }
}

module.exports=fetchuser