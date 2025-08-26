const express=require("express")
const Router=express.Router()
const {getAllStudent,AddStudent,getStudentById,deleteStudent}=require("@controller/students/studentController")

Router.get("/getAllStudents",getAllStudent)
Router.post("/Addstudent",AddStudent)
Router.get("/getStudentById/:id",getStudentById)
Router.delete("/deleteStudent/:id",deleteStudent)

module.exports=Router
