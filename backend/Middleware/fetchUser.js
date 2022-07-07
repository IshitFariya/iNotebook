const jwt = require('jsonwebtoken');
const JWT_SECRET='Harryisagoodboy';

const fetchUser=(req,res,next)=>{
    // 1. getting toekn and of its there
    
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token=req.headers.authorization.split(' ')[1];
    }
    // console.log(token);
        // Checking if its chere or not
    if(!token){
        res.status(401).json({
            message:'You are not logged in ,please login'
        })
    }
     
    // 2. Verification token
    try{
        const decode=jwt.verify(token,JWT_SECRET)
        // console.log(decode);
        req.user=decode.user;
        next();
    }
    catch(err){
        res.status(401).json({
            message:'You are not logged in ,please login'
        })
    }
}

module.exports=fetchUser;