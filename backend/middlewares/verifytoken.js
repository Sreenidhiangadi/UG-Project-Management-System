const jwt=require('jsonwebtoken')
require('dotenv').config()
function verifytoken(req,res,next){
    const bearer=req.headers.authorization;
    if(!bearer){
        return res.send({message:"Unauthorized access"})
    }else{
        const token=bearer.split(' ')[1]
        try{
            jwt.verify(token,process.env.SECRET_KEY)
            next()
        }catch(err){
            next(err)
        }
    }
}
module.exports=verifytoken