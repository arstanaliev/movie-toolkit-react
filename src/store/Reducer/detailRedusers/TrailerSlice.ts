import {ITrailer} from "../../../types/movieInterface";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ITrailers {
    trailer: ITrailer[]
    loader: boolean
    error: string
}
const initialState: ITrailers = {
    trailer: [],
    loader: false,
    error: ""
}

export const trailerSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        fetchingTrailer(state) {
            state.loader = true
        },
        fetchingTrailerSuccess(state, action: PayloadAction<ITrailer[]>) {
            state.trailer = action.payload
            state.loader = false
            state.error = ""
        },
        fetchingTrailerError(state, action: PayloadAction<string>) {
            state.trailer = []
            state.loader = false
            state.error = action.payload
        }
    }
})

export default trailerSlice.reducer
export const {fetchingTrailer, fetchingTrailerSuccess, fetchingTrailerError} = trailerSlice.actions