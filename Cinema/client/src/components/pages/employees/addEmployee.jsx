import styles from "./addEmployee.module.css";

import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Input from "../../genericComp/input";
import Button from "../../UI/button/button";
import PermissionsList from "./permissionsList";
import CustomDialog from "../../genericComp/dialog";
import updatedPermissionsCheckboxes from "../../utils/updatedPermissionsCheckboxes";

import { employeesActions } from "../../store/slices/employeesSlice";

const AddEmployee = () => {
	const [showDialog, setShowDialog] = useState(false);
	const [dialogText, setDialogText] = useState("");
	const firstNameRef = useRef();
	const lastNameRef = useRef();
	const usernameRef = useRef();
	const timeoutRef = useRef();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [permissions, setPermissions] = useState([]);

	const checkboxClickHandler = (clickedOption) => {
		const updatedCheckboxes = updatedPermissionsCheckboxes(clickedOption, permissions);

		setPermissions(updatedCheckboxes);
	};

	const cancelHandler = () => {
		navigate("/layout/WebContentLayout/employees/all");
	};

	const addEmployeeHandler = async (event) => {
		event.preventDefault();

		// Create employee with the template that the server expects to recieve
		const employee = {
			username: usernameRef.current.value,
			firstName: firstNameRef.current.value,
			lastName: lastNameRef.current.value,
			sessionTimeOut: timeoutRef.current.value,
			permissions,
		};

		const url = "http://localhost:3000/employees/add";
		try {
			const resp = await axios.post(url, employee, {
				headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
			});

			if(resp.data.data === "Expired token"){
				setShowDialog(true);
				setDialogText("Session expired, please login again");
			} 
			// Update the redux property(read from DB) only if the employee successfully added
			else if (resp.status) {
				setShowDialog(true);
				setDialogText("Employee Successfully Created!");
				dispatch(employeesActions.add());
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	const closeDialog = () => {
		setShowDialog(false);
		if (dialogText === "Session expired, please login again") {
			setDialogText("");
			navigate("/");
		} else {
			setDialogText("");
			navigate("/layout/WebContentLayout/employees/all");
		}
	};

	return (
		<div>
			<form id="form_container" onSubmit={addEmployeeHandler}>
				<Input title="First Name" type="text" className={styles.add_employee_input} ref={firstNameRef} />
				<Input title="Last Name" type="text" className={styles.add_employee_input} ref={lastNameRef} />
				<Input title="User Name" type="text" className={styles.add_employee_input} ref={usernameRef} />
				<Input
					title="Session Time Out(Minutes)"
					type="number"
					className={styles.add_employee_input}
					ref={timeoutRef}
				/>

				<p>Permissions :</p>
				<PermissionsList userPermissions={permissions} onChange={checkboxClickHandler} />

				<div className={styles.add_employee_actions}>
					<Button className={styles.add_employee_action_buttons} text="Save" type="submit" />
					<Button
						className={styles.add_employee_action_buttons}
						text="Cancel"
						type="button"
						onClick={cancelHandler}
					/>
				</div>
			</form>

			<CustomDialog
				title="New Employee"
				text= {dialogText}
				buttonsArray={[{ text: "OK", onClick: closeDialog }]}
				open={showDialog}
			/>
		</div>
	);
};

export default AddEmployee;
