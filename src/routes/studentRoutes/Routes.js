const express=require("express")
const Router=express.Router()
const {getAllStudent}=require("@controller/students/studentController")

Router.get("/getAllStudents",getAllStudent)
Router.post("/Addstudent",loginUser)
Router.post("/refresh",refreshToken)
Router.post("/createUser",createUser)
Router.post("/getUserById/:id",getUserById)
Router.delete("/deleteUser/:id",deleteUser)

module.exports=Router
