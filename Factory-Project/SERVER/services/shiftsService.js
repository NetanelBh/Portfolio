import * as shiftsRepo from "../repositories/shiftsRepo.js";
import * as workScheduleRepo from "../repositories/shiftToEmployeeRep.js";
import { addEmployeeToshift } from "./epmloyeesService.js";

export const getShifts = () => {
  return shiftsRepo.getShifts();
};

// GET all workSchedule of the employees
export const getWorkSchedule = () => {
  return workScheduleRepo.getWorkSchedule();
};

// ADD new shift
export const addShift = (shift) => {
  return shiftsRepo.addShift(shift);
};

// UPDATE existing shift
export const updateShift = (shiftId, shift) => {
  return shiftsRepo.updateShift(shiftId, shift);
};

// Allocate employee to selected shift
export const allocateEmployeeToShift = (shiftId, employeeId) => {
  return addEmployeeToshift(shiftId, employeeId);
};
