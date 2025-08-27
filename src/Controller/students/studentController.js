
const studentService=require("@services/studentService/studentService")
const { BadRequestError } = require("@/utility/errors");


async function getAllStudent(req,res,next){
   try {
      const result=await studentService.getAllStudentService(req)
      res.success(200,result,"details fetched successfully")
   } catch (error) {
     next(error)
   }
}


async function getStudentById(req, res, next) {
  try {
    const userId = req.params.id;
    if(!userId){
            throw  new BadRequestError("id Not found")
        }
    const user = await studentService.getUserByIdService(userId);
    res.send(200,user,"user details fetched succesfully")
  } catch (error) {
    next(error); 
  }
}

async function AddStudent(req,res,next){
    try{    
    const { name, email, age, studentClass, subjects } = req.body;
    if (!name || !email || !age || !studentClass || !subjects) {
      throw new BadRequestError("All fields are required")
    }

        if(req.body?.id){
            const result =await studentService?.updateStudentService(req.body)
            res.success(200,{name:result.name},"user Updated succesfully")
        }else{
            const result = await studentService?.createStudentService(req.body)
            res.success(200,{name:result.name},"User created succsfully")
        }
    }catch(error){
        next(error)
    }
}


async function deleteStudent(req,res,next){
    try {
        const userId=req.params.id
        if(!userId){
            throw  new BadRequestError("id Not found")
        }
        const result=await studentService?.deleteStudentService(userId)
        res.success(200,result,"deleted succesfully")
    } catch (error) {
        next(error)
    }
}
module.exports={
    getAllStudent,
    AddStudent,
    getStudentById,
    deleteStudent,
}