import moviesModel from "../models/moviesModel.js";

export const getMovies = () => {
	return moviesModel.find();
};

export const addMovie = (movie) => {
	const newMovie = moviesModel(movie);

	return newMovie.save();
};

export const updateMovie = (filter, updatedMovie) => {
	return moviesModel.findOneAndReplace(filter, updatedMovie, { new: true });
};

export const deleteMovie = (id) => {
  return moviesModel.findOneAndDelete(id);
};