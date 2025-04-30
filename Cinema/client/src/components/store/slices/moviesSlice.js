import { createSlice } from "@reduxjs/toolkit";

const initialState = {movies: []};

const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        load(state, action) {
            state.movies = action.payload;
        },
        add(state, action) {          
            state.movies.push(action.payload);
        },
        edit(state, action) {
            const index = state.movies.findIndex(movie => movie._id === action.payload._id);
            if(index!==-1) {
                state.movies[index] = action.payload;
            }
        },
        delete(state, action) {
            state.movies = state.movies.filter(movie => movie._id !== action.payload);
        }
    }
})

export const moviesActions = moviesSlice.actions;

export default moviesSlice.reducer;