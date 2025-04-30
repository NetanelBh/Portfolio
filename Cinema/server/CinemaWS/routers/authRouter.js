import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import * as authServices from "../srevices/authServices.js";
import { getEmployeeFromFileById, updateEmployeePassword } from "../srevices/employeesServices.js";

const router = express.Router();

// Entry point: http://localhost:3000/auth

router.patch("/register", async (req, res) => {
	const { username, password } = req.body;

	try {
		const resp = await updateEmployeePassword(username, password);
		res.send(resp);
	} catch (error) {
		res.send({ status: false, data: error.message });
	}
});

//localhost:3000/auth/login
http: router.post("/login", async (req, res) => {
	const { username, password } = req.body;

	try {
		// Return the match user from DB with the username, if not exist, will return null
		const employee = await authServices.login(username);

		// If the employee exist in DB
		if (employee !== null) {
			// Compare the password entered by user with the hashed password in DB.
			if (await bcrypt.compare(password, employee.password)) {
				// If the user successfully logged in, will get the session time out from the file.
				let { sessionTimeOut } = await getEmployeeFromFileById(employee._id);
				// Convert to seconds(numeric value to expiresIn in jwt is in seconds)
				sessionTimeOut = `${sessionTimeOut}m`;
				// Create token to user with time limit according to the session time out in the file.
				const token = jwt.sign({ id: employee._id }, process.env.HASH_KEY, { expiresIn: sessionTimeOut });
				// Return the employee's full name to show in every page he navigates in the cinema
				const returnedData = { admin: employee.admin, token, fullName: employee.fullName, id: employee._id };
				res.send({ status: true, data: returnedData });
			} else res.send({ status: false, data: "Invalid password" });
		} else {
			res.send({ status: false, data: "Invalid username" });
		}
	} catch (error) {
		res.send({ status: false, data: error.message });
	}
});

router.get("/logout", (req, res) => {
	res.send({ status: true, data: "Logged out successfully" });
});

export default router;
