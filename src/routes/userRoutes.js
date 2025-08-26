const express=require("express")
const Router=express.Router()
const {getAlluser,createUser,getUserById,deleteUser, loginUser}=require("@controller/userController")

Router.get("/getAllUser",getAlluser)
Router.post("/loginUser",loginUser)
Router.post("/createUser",createUser)
Router.post("/getUserById/:id",getUserById)
Router.delete("/deleteUser/:id",deleteUser)

module.exports=Router




