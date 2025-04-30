import styles from "./editEmployee.module.css";

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { employeesActions } from "../../store/slices/employeesSlice";
import axios from "axios";

import Input from "../../genericComp/input";
import Button from "../../UI/button/button";
import PermissionsList from "./permissionsList";
import CustomDialog from "../../genericComp/dialog";

import updatedPermissionsCheckboxes from "../../utils/updatedPermissionsCheckboxes";

const EditEmployee = () => {
	const [showDialog, setShowDialog] = useState(false);
	const [dialogText, setDialogText] = useState("");
	const firstNameRef = useRef();
	const lastNameRef = useRef();
	const usernameRef = useRef();
	const sessionTimeoutRef = useRef();

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const allEmployees = useSelector((state) => state.employees.employees);

	// Get the employee id from the employees list(for this employee the edit button clicked)
	const employeeId = JSON.parse(localStorage.getItem("empId"));

	// Split the full name from the employee object to first and last names
	const clickedEmployee = allEmployees.filter((employee) => employee.id === employeeId)[0];
	const delimiterIndex = clickedEmployee.name.indexOf(" ");
	const firstName = clickedEmployee.name.slice(0, delimiterIndex);
	const lastName = clickedEmployee.name.slice(delimiterIndex + 1);
	const createdDate = clickedEmployee.createdDate.replaceAll(".", "/");

	const cancelHandler = () => {
		localStorage.removeItem("empId");

		navigate("/layout/WebContentLayout/employees/all");
	};

	const submitHandler = async (event) => {
		event.preventDefault();

		// Uses for both sending updates to DB or just updating the redux
		const basicEmployee = {
			id: clickedEmployee.id,
			createdDate: clickedEmployee.createdDate,
			permissions: clickedEmployee.permissions,
			sessionTimeOut: sessionTimeoutRef.current.value,
		};

		// URL to update the emploee with the new data entered by the admin
		const url = "http://localhost:3000/employees/update";

		// Employee's template to send to server to update the DB and the json files
		const updatedEmployee = {
			...basicEmployee,
			firstName: firstNameRef.current.value,
			lastName: lastNameRef.current.value,
			originUsername: clickedEmployee.username,
			updatedUsername: usernameRef.current.value,
		};

		// Get back all the updated data
		const resp = await axios.put(
			url,
			{ employee: updatedEmployee },
			{ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
		);

		if (resp.data.data === "Expired token") {
			setShowDialog(true);
			setDialogText("Session expired, please login again");
		}
		// If the username changed by the admin, will read the new updated data from the DB
		else if (resp.status && clickedEmployee.username !== usernameRef.current.value) {
			dispatch(employeesActions.userNameChange());
			navigate("/layout/WebContentLayout/employees/all");
		// If the username not changed by the admin, will store the changes in redux
		} else {
			const reduxEmployee = {
				...basicEmployee,
				username: clickedEmployee.username,
				name: resp.data.data.jsonEmployees.firstName + " " + resp.data.data.jsonEmployees.lastName,
			};

			dispatch(
				employeesActions.editEmployee({
					employee: reduxEmployee,
				})
			);
			navigate("/layout/WebContentLayout/employees/all");
		}
	};

	const checkboxClickHandler = (clickedOption) => {
		const updatedPermissions = updatedPermissionsCheckboxes(clickedOption, clickedEmployee.permissions);

		dispatch(
			employeesActions.editPermissions({
				id: clickedEmployee.id,
				permissions: updatedPermissions,
			})
		);
	};

	const closeDialog = () => {
		setShowDialog(false);
		setDialogText("");
		navigate("/");
	};

	return (
		<>
			<h1 id={styles.header}>Edit Employees:</h1>
			<form id="form_container" onSubmit={submitHandler}>
				<Input
					title="First Name "
					type="text"
					className={styles.edit_employee_input}
					value={firstName}
					ref={firstNameRef}
				/>
				<Input
					title="Last Name "
					type="text"
					className={styles.edit_employee_input}
					value={lastName}
					ref={lastNameRef}
				/>
				<Input
					title="Username "
					type="text"
					className={styles.edit_employee_input}
					value={clickedEmployee.username}
					ref={usernameRef}
				/>
				<Input
					title="Session Time Out (Minutes) "
					type="number"
					className={styles.edit_employee_input}
					value={clickedEmployee.sessionTimeOut}
					ref={sessionTimeoutRef}
				/>

				<p>Created Date : {createdDate}</p>

				<p>Permissions :</p>
				<PermissionsList userPermissions={clickedEmployee.permissions} onChange={checkboxClickHandler} />

				<div id="action_buttons" className={styles.edit_employee_actions}>
					<Button className={styles.edit_employee_action_buttons} text="Update" type="submit" />
					<Button
						className={styles.edit_employee_action_buttons}
						text="Cancel"
						type="button"
						onClick={cancelHandler}
					/>
				</div>
			</form>

			<CustomDialog
				title="Edit Employee"
				text={dialogText}
				buttonsArray={[{ text: "OK", onClick: closeDialog }]}
				open={showDialog}
			/>
		</>
	);
};

export default EditEmployee;
