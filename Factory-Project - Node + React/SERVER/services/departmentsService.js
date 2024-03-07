import * as depRepo from "../repositories/departmentsRepo.js";
import * as empRepo from "../repositories/employeesRepo.js";

export const getDepartments = () => {
  return depRepo.getDepartments();
};

export const addDepartment = (department) => {
  return depRepo.addDepartment(department);
};

export const updateDepartment = (depId, updatedDep) => {
  return depRepo.updateDepartment(depId, updatedDep);
};

// Delete all departmenta from the DB and departments related to employees
export const deleteAllDepartments = async () => {
  try {
    // Delete all departments from the DB
    await depRepo.deleteAllDepartments();
    // Delete the department from each employee
    const employees = await empRepo.getEmployees();
    employees.forEach(async (employee) => {
      try {
        const updatedEmployee = {
          id: employee.id,
          firstName: employee.firstName,
          lastName: employee.lastName,
          startWorkYear: employee.startWorkYear,
          departmentId: "",
        };
        // Delete all departments from employees collection
        await empRepo.updateEmployee(employee.id, updatedEmployee);
      } catch (error) {
        return { success: false, data: error };
      }
    });
    return { success: true, data: "Successfully departments deleted" };
  } catch (error) {
    return { success: false, data: "Can't delete departments" };
  }
};

export const getAllEmployeesNotInDepartment = async (departmentId) => {
  try {
    const allEmployees = await empRepo.getEmployees();
    const filteredEmployees = allEmployees.filter((employee) => {
      return employee.departmentId !== departmentId;
    });
    return { success: true, data: filteredEmployees };
  } catch (error) {
    return { success: false, data: [] };
  }
};

export const allocateEmployeeToDepartment = (empId, depId) => {
  return empRepo.allocateEmployeeToDepartment(empId, depId);
};
