import {IActorDetail} from "../../../../types/movieInterface";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IActorDetails {
    actorDetail: Partial<IActorDetail>
    loader: boolean
    error: string
}

const initialState: IActorDetails = {
    actorDetail: {},
    loader: false,
    error: ""
}

export const actorDetailSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        fetchingActorDetail(state) {
            state.loader = true
        },
        fetchingActorDetailSuccess(state, action: PayloadAction<IActorDetail>) {
            state.actorDetail = action.payload
            state.loader = false
            state.error = ""
        },
        fetchingActorDetailError(state, action: PayloadAction<string>) {
            state.actorDetail = {}
            state.loader = false
            state.error = action.payload
        }
    }
})

export default actorDetailSlice.reducer
export const {fetchingActorDetail, fetchingActorDetailSuccess, fetchingActorDetailError} = actorDetailSlice.actions