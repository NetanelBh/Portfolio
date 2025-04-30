import fs from "fs";
import bcrypt from "bcryptjs";

import * as employeesDbRepo from "../repositories/employeesDbRepo.js";
import * as fileRepo from "../repositories/fileRepo.js";

const JSONPATH = process.cwd() + "/data/employees.json";

export const addEmployeeToDb = async (employee) => {
	// Only for the admin will generate password cause he is the first in DB. When he add emp, the emp choose the pass
	if (employee.admin) {
		const salt = await bcrypt.genSalt(10);
		const encryptedPassword = await bcrypt.hash(employee.password, salt);
		const newEmployee = { ...employee, password: encryptedPassword };

		return employeesDbRepo.addEmployee(newEmployee);
	}

	return employeesDbRepo.addEmployee(employee);
};

export const getEmployeesFromDb = () => {
	return employeesDbRepo.getEmployeesFromDb();
};

export const getEmployeeFromDbByid = (id) => {
	return employeesDbRepo.getEmployeeFromDbById(id);
};

export const getEmployeeFromDbByUsername = (username) => {
	return employeesDbRepo.getEmployeeFromDbByUsername(username);
};

export const updateEmployeePassword = async (username, password) => {
	try {
		const employee = await getEmployeeFromDbByUsername(username);
		// If employee doens't exist in DB
		if (!employee) {
			return { status: false, data: "User doesn't exist in the system" };
		} 
		
		// If the employee exists in DB and he set the password already in the past, return corresponding message.	
		if (employee && employee.password !== "") {
			return { status: false, data: "User already exists in the system" };
		}

		const salt = await bcrypt.genSalt(10);
		const encryptedPassword = await bcrypt.hash(password, salt);
		const updatedEmployee = await employeesDbRepo.updateEmployeePassword(username, encryptedPassword);
		if (updatedEmployee) {
			return { status: true, data: updatedEmployee };
		} else {
			return { status: false, data: "Failed to register employee" };
		}
		
	} catch (error) {
		return {status: false, data: error.message};
	}
};

export const updateEmployeeUsername = async (username, updatedUsername) => {
	try {
		const employee = await getEmployeeFromDbByUsername(updatedUsername);
		if (employee) {
			return username;
		} else {
			return employeesDbRepo.updateUsername(username, updatedUsername);
		}
	} catch (error) {
		return error.message;
	}
};

export const deleteEmployeeFromDb = (id) => {
	return employeesDbRepo.deleteEmployeeFromDb(id);
};

export const getEmployeesFromFile = () => {
	return fileRepo.getDataFromJson(JSONPATH);
};

export const getEmployeeFromFileById = async (id) => {
	const employees = await getEmployeesFromFile();

	return employees.employees.find((employee) => {
		return employee.id === String(id);
	});
};

export const addEmployeeToFile = async (newEmployee) => {
	let employees = {};
	if (fs.existsSync(JSONPATH)) {
		employees = await getEmployeesFromFile();
		employees.employees.push({ ...newEmployee });
	} else {
		employees = { employees: [{ ...newEmployee }] };
	}

	fileRepo.writeDataToJson(JSONPATH, employees);

	return newEmployee;
};

export const updateEmployeeInFile = async (updatedEmployee) => {
	const employees = await getEmployeesFromFile();
	const index = employees.employees.findIndex((employee) => employee.id === updatedEmployee.id);
	if (index !== -1) {
		employees.employees[index] = { ...updatedEmployee };
	}

	fileRepo.writeDataToJson(JSONPATH, employees);

	return updatedEmployee;
};

export const deleteEmployeeFromFile = async (id) => {
	// When delete employee from the system, will delete the employee from the employees.json file as well
	const employees = await getEmployeesFromFile();
	const index = employees.employees.findIndex((employee) => employee.id === id);
	if (index !== -1) {
		employees.employees.splice(index, 1);
	}

	fileRepo.writeDataToJson(JSONPATH, employees);

	return id;
};
