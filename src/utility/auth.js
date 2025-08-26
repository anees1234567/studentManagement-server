const jwt=require("jsonwebtoken") 
const User=require("@models/UserModel")
const {SECRET_KEY}=require("@config/index")
const { NotFoundError }=require("@utility/errors")

const generateToken=async (req,res)=>{
    const user=new User(req.body);
    const authenticate=await user.comparePassword(req.body.email,req.body.password)
    if(!authenticate){
        throw new NotFoundError("Invalid email or password")
    }else{
        const token =jwt.sign({MailCode:req.body.email},SECRET_KEY)
        res.cookie("token", token, {
        httpOnly: true, 
        secure: false,
        sameSite: "Strict", 
        maxAge: 60 * 60 * 1000 // 1 hour in ms
    });
    return user
    }
}
module.exports=generateToken



