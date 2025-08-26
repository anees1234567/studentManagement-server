const mongoose=require("mongoose")
const bcrypt=require("bcrypt")


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters long"],
      maxlength: [50, "Name must be less than 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, 
      lowercase: true,
      trim: true,
      immutable:true,
      match: [
        /^\S+@\S+\.\S+$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
  },
  {
    timestamps: true, 
  }
);

userSchema.methods.hashpassword=async function (){

  if(!this.password){
    throw new error("password is required")    
  }else{
   console.log("inside hashpassword method",this.password)
    const hashedPassword = await bcrypt.hash(this.password, 10);
    console.log("hashed password",hashedPassword)
    return hashedPassword    
  }
}

userSchema.methods.comparePassword=async function (email,password){
  if(!this.password){
    throw new error("password is required")    
  }else{
    const user =await User.findOne({email:email})
    return bcrypt.compare(password,user?.password)
  }
}


// Create and export model
const User = mongoose.model("User", userSchema);
module.exports= User;
