const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema(
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
      immutable: true,
      match: [
        /^\S+@\S+\.\S+$/,
        "Please enter a valid email address",
      ],
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
      min: [1, "Age must be at least 4"]},
    studentClass: {
      type: String,
      required: [true, "Class is required"],
  },
   subjects: {
    type: [String],
    required: [true, "At least one subject is required"]
  }
})

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
