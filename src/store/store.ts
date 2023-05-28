import {combineReducers, configureStore} from "@reduxjs/toolkit";
import movieSlice from "./Reducer/movieSlice";
import movieDetailSlice from "./Reducer/detailRedusers/MovieDetailSlice";
import actorSlice from "./Reducer/detailRedusers/ActorsSlice";
import trailerSlice from "./Reducer/detailRedusers/TrailerSlice";
import actorDetailSlice from "./Reducer/detailRedusers/ActorDetailSlice/ActorDetailSlice";
import actorMovieSlice from "./Reducer/detailRedusers/ActorDetailSlice/ActorMovieSlice";

const rootReducer = combineReducers({
    movieSlice,
    movieDetailSlice,
    actorSlice,
    trailerSlice,
    actorDetailSlice,
    actorMovieSlice,

})
export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}
export type rootState = ReturnType<typeof rootReducer>
type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']