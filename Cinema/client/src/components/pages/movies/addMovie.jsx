import styles from "./addMovie.module.css";

import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { moviesActions } from "../../store/slices/moviesSlice";

import { isShowPermission } from "../../utils/moviesPermissions";

import Input from "../../genericComp/input";
import Button from "../../UI/button/button";
import CustomDialog from "../../genericComp/dialog";

const AddMovie = () => {
	const movieNameRef = useRef();
	const genresRef = useRef();
	const imageRef = useRef();
	const premieredRef = useRef();
	const [showDialog, setShowDialog] = useState(false);
	const [dialogText, setDialogText] = useState("");
	const dispatch = useDispatch();

	const employees = useSelector((state) => state.employees.employees);

	const navigate = useNavigate();

	const saveMovieHandler = async (event) => {
		event.preventDefault();

		const movie = {
			name: movieNameRef.current.value,
			// Make the genres as a list
			genre: genresRef.current.value.split(","),
			image: imageRef.current.value,
			premiered: premieredRef.current.value,
		};

		// Save the movie in DB
		try {
			const resp = (
				await axios.post("http://localhost:3000/subscriptions/movie/add", movie, {
					headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
				})
			).data.data;

			if (resp === "Expired token") {
				setShowDialog(true);
				setDialogText("Session expired, please login again");
			} else if (resp.status) {
				setShowDialog(true);
				setDialogText("Movie Added Successfully");
				// Store the movie also in redux to prevent redundant re-read from DB(keep the redux up to date as the DB)
				dispatch(moviesActions.add(resp.data));
			}
		} catch (error) {
			console.log(error);
		}
	};

	const ConfirmHandler = () => {
		setShowDialog(false);
		// If the token expired, navigate to the login page
		if (dialogText === "Session expired, please login again") {
			setDialogText("");
			navigate("/");
		} else if (dialogText === "Movie Added Successfully") {
			setDialogText("");
			navigate("/layout/WebContentLayout/movies/all");
		}
	};

	const cancelHandler = () => {
		navigate("/layout/WebContentLayout/movies/all");
	};

	// Get the id of the loged in user from the local storage
	const employeeId = localStorage.getItem("id");
	const addPermission = "Create Movies";
	const isAddPermissions = isShowPermission(employees, employeeId, addPermission);

	return (
		<>
			{isAddPermissions && (
				<form id="form_container" onSubmit={saveMovieHandler}>
					<Input title="Name" type="text" className="" value="" ref={movieNameRef} />
					<Input title="Genres" type="text" className="" value="" ref={genresRef} />
					<Input title="Image URL" type="text" className="" value="" ref={imageRef} />
					<Input title="Premiered" type="date" className="" value="" ref={premieredRef} />

					<div className={styles.add_movie_actions}>
						<Button className={styles.add_movie_button} text="Save" type="submit" />
						<Button
							className={styles.add_movie_button}
							text="Cancle"
							type="button"
							onClick={cancelHandler}
						/>
					</div>
				</form>
			)}

			{!isAddPermissions && (
				<div id="list_container">
					<p className={styles.add_movie_no_permission}>No permission to add movies</p>
				</div>
			)}

			<CustomDialog
				title="Add Movie"
				text={dialogText}
				buttonsArray={[{ text: "OK", onClick: ConfirmHandler }]}
				open={showDialog}
			/>
		</>
	);
};

export default AddMovie;
