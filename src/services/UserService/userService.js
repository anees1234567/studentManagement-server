// services/userService.js
const { NotFoundError } = require("@/utility/errors");
const User = require("@models/UserModel/UserModel"); 

// Get all users
async function getAllUsersService() {
  try {
    const users = await User.find({});
    return users; 
  } catch (error) {
    throw new Error("Failed to retrieve users."); 
  }
}


async function getUserByIdService(userId) {
  try {
    const user = await User.findById(userId); 
    if (!user) {
        throw new NotFoundError("No user found")
    }
    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw new Error("Failed to retrieve user.");
  }
}


async function createUserService(userData) {
  try {
    const newUser = new User(userData);
    const savedUser = await newUser.save(); 
    return savedUser;
  } catch (error) {
    console.error("Error creating user:", error);
    if(error.code==11000){
        throw new Error("Duplicates Entries not allowed.");
    }else{
        throw new Error("Failed to create user.");
    }
  }
}


async function updateUserService(userData) {
  try {
    const body={
        name:userData?.name,
    }
    const updatedUser = await User.findByIdAndUpdate(userData?.id, body, {
      new: true, 
      runValidators:false
    });
    if (!updatedUser) {
      throw new NotFoundError("User not found for update.");
    }
    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    if(error instanceof NotFoundError){
        throw error
    }else{
        throw new Error("Failed to update user.");
    }
  }
}


async function deleteUserService(userId) {
  try {
    const deletedUser = await User.findByIdAndDelete(userId); 
    if (!deletedUser) {
        throw new NotFoundError(`User not found for deletion.`); 
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
  getAllUsersService,
  getUserByIdService,
  createUserService,
  updateUserService,
  deleteUserService,
};
