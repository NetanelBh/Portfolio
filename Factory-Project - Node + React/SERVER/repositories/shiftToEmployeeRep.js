import WorkScheduleModel from '../models/shiftsToEmployee.js';

export const getWorkSchedule = () => {
  return WorkScheduleModel.find();
};

export const addWorkSchedule = async (workSchedule) => {
  const newWorkSchedule = WorkScheduleModel(workSchedule);

  return newWorkSchedule.save();
};

// Update the employees array
export const updateWorkSchedule = async (filter, updatedArray) => {
  return WorkScheduleModel.findOneAndUpdate(filter, updatedArray);
};