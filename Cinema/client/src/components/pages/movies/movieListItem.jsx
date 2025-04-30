import styles from "./movieListItem.module.css";
import axios from "axios";

import Button from "../../UI/button/button";
import CustomDialog from "../../genericComp/dialog";
import MovieSubscriptionsList from "./movieSubscriptionsList";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { moviesActions } from "../../store/slices/moviesSlice";
import { subscriptionsActions } from "../../store/slices/subscriptionsSlice";
import { isShowPermission } from "../../utils/moviesPermissions";

const MovieListItem = ({ movie }) => {
	const [showDialog, setShowDialog] = useState(false);
	const [dialogTitle, setDialogTitle] = useState("");
	const [dialogText, setDialogText] = useState("");

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const employees = useSelector((state) => state.employees.employees);
	const subscriptions = useSelector((state) => state.subscriptions.subscriptions);

	const deleteMovieHandler = async () => {
		// When delete the movie, will delete also the subscriptions that watched the movie
		const deleteUrl = `http://localhost:3000/subscriptions/movie/delete/${movie._id}`;
		const updateUrl = `http://localhost:3000/subscriptions/subscription/update`;

		// Filter only the subscriptions that watched the selected movie
		const watchedMovieSubscriptions = subscriptions
			.filter((subscription) => {
				return subscription.movies.find((m) => m.movieId === movie._id);
				// After we got only the subscriptions that watched the movie, will remove the movie from their movies list
			})
			.map((s) => {
				const filteredMovies = s.movies.filter((m) => m.movieId !== movie._id);
				return { ...s, movies: filteredMovies };
			});

		try {
			// Delete the movie from the database
			const deleteResp = (
				await axios.delete(deleteUrl, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
			).data;

			if (deleteResp.data === "Expired token") {
				setShowDialog(true);
				setDialogTitle("Delete Movie");
				setDialogText("Session expired, please login again");
			}
			// If the movie deleted successfully from the database, will delete it also from redux.
			else if (deleteResp.status) {
				dispatch(moviesActions.delete(movie._id));

				// Only if successfully deleted from the database, remove the movie from the subscription list in DB
				const subscriptionsResp = (
					await axios.post(
						updateUrl,
						{ movieId: movie._id, subscriptions: watchedMovieSubscriptions },
						{ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
					)
				).data;

				if (subscriptionsResp.status) {
					// Update the redux with the new retured list
					dispatch(subscriptionsActions.update(watchedMovieSubscriptions));
				}
				navigate("/layout/WebContentLayout/movies/all");
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	const editMovieHandler = () => {
		localStorage.setItem("movieId", movie._id);
		navigate("/layout/editMovie");
	};

	const ConfirmHandler = () => {
		// The dialog is shown only when the token expired
		setShowDialog(false);
		setDialogTitle("");
		setDialogText("");
		navigate("/");
	};

	const employeeId = localStorage.getItem("id");
	const editPermission = "Update Movie";
	const deletePermission = "Delete Movies";

	// Determine whether the employee has the permissin to edit or remove movies
	const isEditPermission = isShowPermission(employees, employeeId, editPermission);
	const isDeletePermission = isShowPermission(employees, employeeId, deletePermission);

	return (
		<>
			<li className={styles.all_movies_list_li}>
				<span className={styles.all_movies_list_movie_name}>
					{movie.name} - {movie.premiered.slice(0, 4)}
				</span>

				{/* Get the genres array into one string and add comma between them */}
				<span className={styles.all_movies_list_genre}>
					Genres: {movie.genre.map((genre) => genre).join(", ")}
				</span>

				<div className={styles.all_movies_list_image_subscription_container}>
					<img src={movie.image} alt="Movie Image" className={styles.all_movies_list_image} />
					<div className={styles.all_movies_list_subscriptions_container}>
						<span>Subscriptions Watched:</span>
						<MovieSubscriptionsList movie={movie} />
					</div>
				</div>

				{(isEditPermission || isDeletePermission) && (
					<div className={styles.all_movies_list_item_actions}>
						{isEditPermission && (
							<Button
								className={styles.all_movies_list_item_actions_edit}
								text="Edit"
								type="button"
								onClick={editMovieHandler}
							/>
						)}

						{isDeletePermission && (
							<Button
								className={styles.all_movies_list_item_actions_delete}
								text="Delete"
								type="button"
								onClick={deleteMovieHandler}
							/>
						)}
					</div>
				)}
			</li>

			<CustomDialog
				title={dialogTitle}
				text={dialogText}
				buttonsArray={[{ text: "OK", onClick: ConfirmHandler }]}
				open={showDialog}
			/>
		</>
	);
};

export default MovieListItem;
