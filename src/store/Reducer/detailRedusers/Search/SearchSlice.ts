import {ISearch} from "../../../../types/movieInterface";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ISearches {
    search: ISearch[]
    loader: boolean
    error: string
}

const initialState: ISearches = {
    search: [],
    loader: false,
    error: ""
}

export const searchSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        fetchingSearch(state) {
            state.loader = true
        },
        fetchingSearchSuccess(state, action: PayloadAction<ISearch[]>) {
            state.search = action.payload
            state.loader = false
            state.error = ""
        },
        fetchingSearchError(state, action: PayloadAction<string>) {
            state.search = []
            state.loader = false
            state.error = action.payload
        }
    }
})

export default searchSlice.reducer
export const {fetchingSearch, fetchingSearchSuccess, fetchingSearchError} = searchSlice.actions