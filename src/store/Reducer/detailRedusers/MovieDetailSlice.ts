import {IMovieDetail} from "../../../types/movieInterface";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IMovieDet {
    detail: Partial<IMovieDetail>
    loader: boolean
    error: string
}

const initialState: IMovieDet = {
    detail: {},
    loader: false,
    error: ""
}

export const movieDetailSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        fetchingMovieDetail(state) {
            state.loader = true
        },
        fetchingMovieDetailSuccess(state, action: PayloadAction<IMovieDetail>) {
            state.detail = action.payload
            state.loader = false
            state.error = ""
        },
        fetchingMovieDetailError(state, action: PayloadAction<string>) {
            state.detail = {}
            state.loader = false
            state.error = action.payload
        }
    }
})

export default movieDetailSlice.reducer
export const {fetchingMovieDetail, fetchingMovieDetailSuccess, fetchingMovieDetailError} = movieDetailSlice.actions