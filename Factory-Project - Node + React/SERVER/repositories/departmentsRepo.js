import DepModel from '../models/departmentModel.js';

export const getDepartments = () => {
  return DepModel.find();
};

export const addDepartment = (department) => {
  const newDepartment = DepModel(department);

  return newDepartment.save();
};

export const updateDepartment = (depId, updatedDep) => {
  return DepModel.findByIdAndUpdate(depId, updatedDep);
};

export const deleteAllDepartments = () => {
  return DepModel.deleteMany({});
};