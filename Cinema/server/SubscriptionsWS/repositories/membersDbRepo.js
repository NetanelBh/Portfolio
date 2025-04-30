import membersModel from "../models/membersModel.js";

export const addMember = (member) => {
  const newMember = membersModel(member);

  return newMember.save();
};

export const getMembers = () => {
  return membersModel.find();
};

export const updateMembers = (filter, member) => {  
  return membersModel.findOneAndReplace(filter, member, { new: true });
};

export const deleteMember = (id) => {
  return membersModel.findByIdAndDelete(id);
};
