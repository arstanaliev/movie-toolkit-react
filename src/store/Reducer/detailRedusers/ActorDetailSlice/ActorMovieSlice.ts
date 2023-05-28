import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IActorMovie} from "../../../../types/movieInterface";

interface IActorMovies {
    actorMovie: IActorMovie[]
    loader: boolean
    error: string
}
const initialState: IActorMovies = {
    actorMovie: [],
    loader: false,
    error: ""
}

export const actorMovieSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        fetchingActorMovie(state) {
            state.loader = true
        },
        fetchingActorMovieSuccess(state, action: PayloadAction<IActorMovie[]>) {
            state.actorMovie = action.payload
            state.loader = false
            state.error = ""
        },
        fetchingActorMovieError(state, action: PayloadAction<string>) {
            state.actorMovie = []
            state.loader = false
            state.error = action.payload
        }
    }
})

export default actorMovieSlice.reducer
export const {fetchingActorMovie, fetchingActorMovieSuccess, fetchingActorMovieError} = actorMovieSlice.actions