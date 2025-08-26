// services/userService.js
const { NotFoundError } = require("@/utility/errors");
const Student = require("@models/studentModel/studentModel"); 

// Get all students
async function getAllStudentService(req) {
try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const students = await Student.find().skip(skip).limit(limit);
    const totalStudents = await Student.countDocuments();
    return {
        totalCount:totalStudents,
        list:students
     }
  } catch (error) {
    throw new Error(error.message||"failed to fetch Data")
  }
}

// Get a user by ID
async function getStudentByIdService(Id) {
  try {
    const student = await Student.findById(Id); 
    if (!student) {
        throw new NotFoundError("No student found")
    }
    return student;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw new Error("Failed to retrieve user.");
  }
}


async function createStudentService(data) {
  try {
    const newStudent = new Student(data);
    const savedStudent = await newStudent.save(); 
    return savedStudent;
  } catch (error) {
    console.error("Error in adding student:", error);
    if(error.code==11000){
        throw new Error("Duplicates Entries not allowed.");
    }else{
        throw new Error("Failed to add student.");
    }
  }
}


async function updateStudentService(data) {
  try {
    const body = {};
    if (data?.name) body.name = data.name;
    if (data?.email) body.email = data.email;
    if (data?.age) body.age = data.age;
    if (data?.class) body.class = data.class;
    if (data?.subjects) body.subjects = data.subjects;

    const updatedStudent = await Student.findByIdAndUpdate(data?.id, body, {
      new: true,          
      runValidators: true, 
    });

    if (!updatedStudent) {
      throw new NotFoundError("Student not found for update.");
    }
    return updatedStudent;
  } catch (error) {
    console.error("Error updating student:", error);
    if (error instanceof NotFoundError) {
      throw error;
    } else {
      throw new Error("Failed to update student.");
    }
  }
}


// Delete a user by ID
async function deleteStudentService(Id) {
  try {
    const deletedStudent = await Student.findByIdAndDelete(Id); 
    if (!deletedStudent) {
        throw new NotFoundError(`Student not found for deletion.`); 
    }
    return deletedUser;
  } catch (error) {

    console.error("Error deleting user:", error);
    if(error instanceof NotFoundError){
        throw error
    }else{
        throw new Error("Failed to delete user.");
    }
  }
}

module.exports = {
  getAllStudentService,
  getStudentByIdService,
  createStudentService,
  updateStudentService,
  deleteStudentService,
};
