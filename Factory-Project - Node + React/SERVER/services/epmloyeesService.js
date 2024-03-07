import * as empRepo from "../repositories/employeesRepo.js";
import * as shiftsRepo from "../repositories/shiftsRepo.js";
import * as depRepo from "../repositories/departmentsRepo.js";
import * as shiftToEmpRepo from "../repositories/shiftToEmployeeRep.js";

export const getEmployeesData = async () => {
  try {
    // For page /employees, we need names, departments and shifts
    const employees = await empRepo.getEmployees();
    const shifts = await shiftsRepo.getShifts();
    const departments = await depRepo.getDepartments();
    const workSchedule = await shiftToEmpRepo.getWorkSchedule();

    // Filter the recieved data from each section to get what we need to display
    const employeesDataArray = employees.map((employee) => {
      // Find the corresponding department for the specific employee
      const empDep = departments.find(
        (dep) => dep.id === employee.departmentId
      );

      // Filter the shifts for the specific employee
      const filteredWorkSchedule = workSchedule.filter((shift) => {
        return shift.employeeId.some((id) => id === employee.id);
      });

      // From filtered workSchedule, find the shift data from shifts collection
      const shiftsData = shifts.filter((shift) => {
        return filteredWorkSchedule.some(
          (workSchedule) => workSchedule.shiftId === shift.id
        );
      });

      const fullNameHelper = employee.firstName + " " + employee.lastName;
      const shortShiftsData = shiftsData.map((shift) => {
        const hours = shift.startingHour + ":00-" + shift.endingHour + ":00";
        return { date: shift.date, hours: hours };
      });

      // Per each employee, will return to map the following object with data
      return {
        id: employee.id,
        fullName: fullNameHelper,
        department: empDep.name,
        shifts: shortShiftsData,
      };
    });

    // Return the employees arr with the relevant data to show in employee page
    return employeesDataArray;
  } catch (error) {
    return error;
  }
};

export const addEmployee = (employee) => {
  return empRepo.addEmployee(employee);
};

export const updatedEmployees = (id, updatedEmployee) => {
  return empRepo.updateEmployee(id, updatedEmployee);
};

// Here we need to remove the employee and its shifts from "shiftsToEcployee"
export const deleteEmployee = async (id) => {
  return empRepo.deleteEmployee(id);
};

export const deleteEmployeeFromShift = async (id) => {
  // Get all workSchedule from the DB
  const workSchedules = await shiftToEmpRepo.getWorkSchedule();
  workSchedules.forEach( async (workSchedule) => {
    // Get the new array without the deleted emp(if exist in currrent shift)
    const updatedArray = workSchedule.employeeId.filter(empId => id !== empId);
      
    if(updatedArray.length > 0) {
      const filter = {shiftId: workSchedule.shiftId};
      const newArray = {employeeId: updatedArray};
      await shiftToEmpRepo.updateWorkSchedule(filter, newArray);
    }
  })
};

export const addEmployeeToshift = async (shiftId, employeeId) => {
  const workSchedules = await shiftToEmpRepo.getWorkSchedule();
  // Get only the shift with the specific id
  const shiftToEmp = workSchedules.find(shift => shift.shiftId === shiftId);
  
  // Add the employee to the specific shift
  const employeesArray = {employeeId: [...shiftToEmp.employeeId, employeeId]};
  const filter = {shiftId: shiftToEmp.shiftId};
  
  return shiftToEmpRepo.updateWorkSchedule(filter, employeesArray);
};