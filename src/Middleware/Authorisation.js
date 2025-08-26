const jwt =require("jsonwebtoken")
const {SECRET_KEY}=require("@config/index")
const {TokenError}= require("@utility/errors")
async function authorisation(req,res,next){
 
    const openPaths = ['/user/createUser', '/user/loginUser'];
    if (openPaths.includes(req.path)) {
        return next();
    }
    const token =req.cookie.token
    if(!token){
         throw new TokenError("authorisation failed")
    }else{
       const decode= jwt.verify(token,SECRET_KEY)
       if (!decode.mailCode){
        throw new TokenError("token expired ,authorisation failed")
       }else{
        next()
       }
           
    }
}
module.exports=authorisation