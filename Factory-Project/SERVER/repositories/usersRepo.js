import UserModel from '../models/userModel.js';

export const getUsers = () => {
  return UserModel.find();
};

export const getUserByName = (name) => {
  return UserModel.find({fullName: name});
};

export const updateUser = (id, updatedUser) => {
  return UserModel.findByIdAndUpdate(id, updatedUser);
};