import styles from "./editMovie.module.css";
import axios from "axios";

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Input from "../../genericComp/input";
import Button from "../../UI/button/button";
import CustomDialog from "../../genericComp/dialog";

import { moviesActions } from "../../store/slices/moviesSlice";

const EditMovie = () => {
	const [showDialog, setShowDialog] = useState(false);
	const [dialogText, setDialogText] = useState("");

	const movieNameRef = useRef();
	const genresRef = useRef();
	const imageRef = useRef();
	const premieredRef = useRef();

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const clickedMovieId = localStorage.getItem("movieId");
	const movies = useSelector((state) => state.movies.movies);

	const cancelHandler = () => {
		localStorage.removeItem("movieId");
		navigate("/layout/WebContentLayout/movies/all");
	};

	const updateMovieHandler = async (event) => {
		event.preventDefault();

		const url = "http://localhost:3000/subscriptions/movie/update";
		const updatedMovie = {
			_id: clickedMovieId,
			name: movieNameRef.current.value,
			image: imageRef.current.value,
			genre: genresRef.current.value.split(","),
			premiered: premieredRef.current.value,
		};

		try {
			const resp = (
				await axios.put(url, updatedMovie, {
					headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
				})
			).data.data;

			if (resp === "Expired token") {
				setShowDialog(true);
				setDialogText("Session expired, please login again");
			} else if (resp.status) {
				dispatch(moviesActions.edit(resp.data));
				navigate("/layout/WebContentLayout/movies/all");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const ConfirmHandler = () => {
		// The dialog is shown only when the token expired
		setShowDialog(false);
		setDialogText("");
		navigate("/");
	};

	// The clicked movie to edit
	const selectedMovie = movies.find((m) => m._id === clickedMovieId);

	return (
		<>
			<h1 id={styles.header}>Edit Movie:</h1>
			<form onSubmit={updateMovieHandler} id="form_container" className={styles.edit_movie_form_container}>
				<Input title="Name" type="text" className="" value={selectedMovie.name} ref={movieNameRef} />
				<Input title="Genres" type="text" className="" value={selectedMovie.genre.join(",")} ref={genresRef} />
				<Input title="Image URL" type="text" className="" value={selectedMovie.image} ref={imageRef} />
				<Input title="Premiered" type="date" className="" value={selectedMovie.premiered} ref={premieredRef} />

				<div id="action_buttons">
					<Button className={styles.edit_movie_button} text="Update" type="submit" />
					<Button className={styles.edit_movie_button} text="Cancle" type="button" onClick={cancelHandler} />
				</div>
			</form>

			<CustomDialog
				title="Add Movie"
				text={dialogText}
				buttonsArray={[{ text: "OK", onClick: ConfirmHandler }]}
				open={showDialog}
			/>
		</>
	);
};

export default EditMovie;
