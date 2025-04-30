import getWebMovies from "../repositories/moviesWebRepo.js";
import * as moviesDbRepo from "../repositories/moviesDbRepo.js";

// Get the movies from the WS for the first time that the server is running
export const getMoviesFromWeb = (url) => { 
    return getWebMovies(url);
};

export const getMoviesFromDb = () => {
    return moviesDbRepo.getMovies();
};

export const addMovie = (movie) => { 
    return moviesDbRepo.addMovie(movie);
};

export const updateMovie = (updatedMovie) => {
    const idFilter = {_id: updatedMovie._id};
    
    return moviesDbRepo.updateMovie(idFilter, updatedMovie);
};

export const deleteMovie = (id) => {
    const idFilter = {_id: id};
    return moviesDbRepo.deleteMovie(idFilter);
};