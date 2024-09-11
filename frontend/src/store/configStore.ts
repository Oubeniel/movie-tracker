import { configureStore } from "@reduxjs/toolkit";
import favoriteMoviesReducer from "./slices/favoriteMoviesSlice";


export const store = configureStore({
    reducer: {
        favoriteMovies: favoriteMoviesReducer
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;