import express from "express";

import * as employeesServices from "../srevices/employeesServices.js";
import * as permissionsServices from "../srevices/permissionsServices.js";

const router = express.Router();

// Entry point: http://localhost:3000/employees

// Get all employees from the DB
router.get("/db", async (req, res) => {
	try {
		const employees = await employeesServices.getEmployeesFromDb();
		res.send({ status: true, data: employees });
	} catch (error) {
		res.send({ status: false, data: error.message });
	}
});

// Add employee by the admin via the employees management
router.post("/add", async (req, res) => {
	const userData = req.body;
	try {
		const dbEmployee = {
			username: userData.username,
			password: "",
			admin: false,
		};
		const resp = await employeesServices.addEmployeeToDb(dbEmployee);

		// Add the new employee also to the employee's json file.
		const emloyeeToJsonFile = {
			id: resp.id,
			firstName: userData.firstName,
			lastName: userData.lastName,
			createdDate: (new Date().toLocaleDateString()).replaceAll(".", "/"),
			sessionTimeOut: userData.sessionTimeOut,
		};
		await employeesServices.addEmployeeToFile(emloyeeToJsonFile);

		// Add the new employee also to the employee's permissions json file.
		const permissions = { id: resp.id, permissions: userData.permissions };
		
		await permissionsServices.addEmployee(permissions);
		res.send({ status: true, data: resp });
	} catch (error) {
		res.send({ status: false, data: error.message });
	}
});

// Update employee tada in database and json files(employees.json and permissions.json)
router.put("/update", async (req, res) => {
	const { employee } = req.body;

	try {
		// Update the permissins in permissions.json
		const updatedPermissions = await permissionsServices.updatePermissions(employee.id, employee.permissions);

		// Update the employee fields in employees.json
		const employeeToJson = {
			id: employee.id,
			firstName: employee.firstName,
			lastName: employee.lastName,
			createdDate: employee.createdDate,
			sessionTimeOut: employee.sessionTimeOut,
		};
		const updatedJsonEmployee = await employeesServices.updateEmployeeInFile(employeeToJson);

		const user = await employeesServices.updateEmployeeUsername(employee.originUsername, employee.updatedUsername);

		const returnData = { permissions: updatedPermissions, jsonEmployees: updatedJsonEmployee, username: user };

		res.send({ status: true, data: returnData });
	} catch (error) {
		res.send({ status: false, data: error.message });
	}
});

router.delete("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		// Delete employee from DB.
		const deletedEmployee = await employeesServices.deleteEmployeeFromDb(id);
		// After delete the employee from DB, will delete the employee also from the file.
		await employeesServices.deleteEmployeeFromFile(id);
		// After delete the employee from DB, will delete the employee also from the file with its permissions.
		await permissionsServices.deleteEmployee(id);
		res.send({ status: true, data: deletedEmployee });
	} catch (error) {
		res.send({ status: false, data: error.message });
	}
});

// Get the employees data from employees.json file.
router.get("/file", async (req, res) => {
	try {
		const employees = await employeesServices.getEmployeesFromFile();
		res.send({ status: true, data: employees });
	} catch (error) {
		res.send({ status: false, data: error.message });
	}
});

export default router;
