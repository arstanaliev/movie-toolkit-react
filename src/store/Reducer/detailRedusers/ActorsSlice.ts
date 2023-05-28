import {IActor} from "../../../types/movieInterface";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IActors {
    actors: IActor[]
    loader: boolean
    error: string
}

const initialState: IActors = {
    actors: [],
    loader: false,
    error: ""
}

export const actorSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        fetchingActor(state) {
            state.loader = true
        },
        fetchingActorSuccess(state, action: PayloadAction<IActor[]>) {
            state.actors = action.payload
            state.loader = false
            state.error = ""
        },
        fetchingActorError(state, action: PayloadAction<string>) {
            state.actors = []
            state.loader = false
            state.error = action.payload
        }
    }
})

export default actorSlice.reducer
export const {fetchingActor, fetchingActorSuccess, fetchingActorError} = actorSlice.actions