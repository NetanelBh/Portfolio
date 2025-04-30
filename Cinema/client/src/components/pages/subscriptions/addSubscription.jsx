import styles from "./addSubscription.module.css";

import axios from "axios";

import Input from "../../genericComp/input";
import Button from "../../UI/button/button";
import CustomDialog from "../../genericComp/dialog";

import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {membersActions} from "../../store/slices/membersSlice";
import { isShowPermission } from "../../utils/moviesPermissions";
import { useNavigate } from "react-router-dom";

const AddSubscription = () => {
	const nameRef = useRef();
	const emailRef = useRef();
	const cityRef = useRef();

	const [showDialog, setShowDialog] = useState(false);
	const [dialogText, setDialogText] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const employees = useSelector((state) => state.employees.employees);

	const ConfirmHandler = () => {
		setShowDialog(false);
		// If the token expired, navigate to the login page
		if (dialogText === "Session expired, please login again") {
			setDialogText("");
			navigate("/");
		} else if (dialogText === "Successfully added a member") {
			setDialogText("");
			navigate("/layout/WebContentLayout/subscriptions/all");
		}
	};

	const cancelHandler = () => {
		navigate("/layout/WebContentLayout/subscriptions/all");
	};

	const savesubsHandler = async (event) => {
		event.preventDefault();

		const url = "http://localhost:3000/subscriptions/member/add";
		const newMember = { name: nameRef.current.value, email: emailRef.current.value, city: cityRef.current.value };
    const headers = {authorization: `Bearer ${localStorage.getItem("token")}`};

    try {
      const resp = (await axios.post(url, newMember, {headers})).data;
      if (resp.status) {
        dispatch(membersActions.add(resp.data));
        setDialogText("Successfully added a member");
        setShowDialog(true);
      } else {
        setDialogText(resp.data);
        setShowDialog(true);
      }
    } catch (error) {
      console.log(error);
    }
	};

	// Get the id of the loged in user from the local storage
	const employeeId = localStorage.getItem("id");
	const addPermission = "Create Subscriptions";
	const isAddPermissions = isShowPermission(employees, employeeId, addPermission);

	return (
		<>
			{isAddPermissions && (
				<form id="form_container" onSubmit={savesubsHandler}>
					<Input title="Name" type="text" className="" value="" ref={nameRef} />
					<Input title="Email" type="text" className="" value="" ref={emailRef} />
					<Input title="City" type="text" className="" value="" ref={cityRef} />

					<div className={styles.add_subs_actions}>
						<Button className={styles.add_subs_button} text="Save" type="submit" />
						<Button
							className={styles.add_subs_button}
							text="Cancle"
							type="button"
							onClick={cancelHandler}
						/>
					</div>
				</form>
			)}

			{!isAddPermissions && (
				<div id="list_container">
					<p className={styles.add_subs_no_permission}>No permission to add subscriptions</p>
				</div>
			)}

			<CustomDialog
				title="Add New Member"
				text={dialogText}
				buttonsArray={[{ text: "OK", onClick: ConfirmHandler }]}
				open={showDialog}
			/>
		</>
	);
};

export default AddSubscription;
