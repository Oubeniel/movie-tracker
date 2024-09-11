import { createSlice } from "@reduxjs/toolkit";

interface FavoriteMoviesState {
    favorites: string[];
}

const initialState: FavoriteMoviesState = {
    favorites: [],
}

const favoriteMoviesSlice = createSlice({
    name: "favoriteMovies",
    initialState: initialState,
    reducers: {
        setFavoriteMovies(state, action) {
            state.favorites = action.payload;
        },
    },
});

export const favoriteMoviesActions = favoriteMoviesSlice.actions;
export default favoriteMoviesSlice.reducer;