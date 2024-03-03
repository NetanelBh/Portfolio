import ShiftModel from '../models/shiftModel.js';

export const getShifts = () => {
  return ShiftModel.find();
};

export const addShift = (shift) => {
  const newShift = ShiftModel(shift);
  return newShift.save();
};

export const updateShift = (shiftId, shift) => {
  return ShiftModel.findByIdAndUpdate(shiftId, shift);
};