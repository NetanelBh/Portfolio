import styles from "./editSubscription.module.css";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { membersActions } from "../../store/slices/membersSlice";

import Input from "../../genericComp/input";
import Button from "../../UI/button/button";
import CustomDialog from "../../genericComp/dialog";

const EditSubscription = () => {
	const [showDialog, setShowDialog] = useState(false);
	const [dialogText, setDialogText] = useState("");
	const subscriptionId = localStorage.getItem("subscriptionId");

	const dispatch = useDispatch();
	const members = useSelector((state) => state.members.members);

	const navigate = useNavigate();

	const clickedSubscription = members.find((member) => member._id === subscriptionId);

	const nameRef = useRef();
	const emailRef = useRef();
	const cityRef = useRef();

	const updateHandler = async (event) => {
		event.preventDefault();

		const url = "http://localhost:3000/subscriptions/member/update";
		const updatedMember = {
			_id: clickedSubscription._id,
			name: nameRef.current.value,
			email: emailRef.current.value,
			city: cityRef.current.value,
		};

		try {
			const resp = (
				await axios.put(url, updatedMember, {
					headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
				})
			).data;
			
			if (resp.data === "Expired token") {
				setShowDialog(true);
				setDialogText("Session expired, please login again");
			}

			if (resp.status) {
				setShowDialog(true);
				setDialogText("Member updated successfully!");
				dispatch(membersActions.update(resp.data));
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	const cancelHandler = () => {
		localStorage.removeItem("subscriptionId");
		navigate("/layout/WebContentLayout/subscriptions/all");
	};

	const closeDialogHandler = () => {
		// Update the state back to false to avoid automatic dialog popup in the next page's visit
		setShowDialog(false);

		if (dialogText === "Session expired, please login again") {
			setDialogText("");
			navigate("/");
		} else {
			setDialogText("");
			navigate("/layout/WebContentLayout/subscriptions/all");
		}

	};

	return (
		<>
			<h1 id={styles.header}>Edit Member: {clickedSubscription.name}</h1>
			<form id="form_container">
				<Input
					title="Name"
					type="text"
					className={styles.edit_subscription_input}
					value={clickedSubscription.name}
					ref={nameRef}
				/>
				<Input
					title="Email"
					type="text"
					className={styles.edit_subscription_input}
					value={clickedSubscription.email}
					ref={emailRef}
				/>
				<Input
					title="City"
					type="text"
					className={styles.edit_subscription_input}
					value={clickedSubscription.city}
					ref={cityRef}
				/>

				<div id="action_buttons">
					<Button
						className={styles.edit_subscription_button}
						text="Update"
						type="text"
						onClick={updateHandler}
					/>
					<Button
						className={styles.edit_subscription_button}
						text="Cancel"
						type="text"
						onClick={cancelHandler}
					/>
				</div>
			</form>

			<CustomDialog
				title="Member Updated"
				text="Member Successfully Updated!"
				buttonsArray={[{ text: "OK", onClick: closeDialogHandler }]}
				open={showDialog}
			/>
		</>
	);
};

export default EditSubscription;
