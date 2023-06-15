import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IMovie} from "../../types/movieInterface";

interface IMovies {
    movie: IMovie[]
    actors: IMovie[]
    actorMovie: IMovie[]
    search: IMovie[]
    trailer: IMovie[]
    detail: Partial<IMovie>
    actorDetail: Partial<IMovie>
    currentPage: number
    loader: boolean
    error: string
}

const initialState: IMovies = {
    movie: [],
    actors: [],
    actorMovie: [],
    search: [],
    trailer: [],
    detail: {},
    actorDetail: {},
    currentPage: 1,
    loader: false,
    error: ""
}

export const actorSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        fetchingMovie(state) {
            state.loader = true
        },
        fetchingMovieSuccess(state, action: PayloadAction<IMovie[]>) {
            state.movie = action.payload
            state.actors = action.payload
            state.actorMovie = action.payload
            state.search = action.payload
            state.loader = false
            state.error = ""
        },
        fetchingTrailerSuccess(state, action: PayloadAction<IMovie[]>) {
            state.trailer = action.payload
            state.loader = false
            state.error = ""
        },
        fetchingMovieDetailSuccess(state, action: PayloadAction<IMovie>) {
            state.detail = action.payload
            state.loader = false
            state.error = ""
        },
        fetchingActorDetailSuccess(state, action: PayloadAction<IMovie>) {
            state.actorDetail = action.payload
            state.loader = false
            state.error = ""
        },
        fetchingMovieError(state, action: PayloadAction<string>) {
            state.movie = []
            state.actors = []
            state.actorMovie = []
            state.search = []
            state.trailer = []
            state.loader = false
            state.error = action.payload
        },
        fetchingCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload
        }
    }
})

export default actorSlice.reducer
export const {
    fetchingMovie,
    fetchingMovieSuccess,
    fetchingMovieError,
    fetchingTrailerSuccess,
    fetchingMovieDetailSuccess,
    fetchingActorDetailSuccess,
    fetchingCurrentPage
} = actorSlice.actions