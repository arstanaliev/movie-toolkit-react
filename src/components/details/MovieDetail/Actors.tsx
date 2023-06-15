import React, {useEffect} from 'react';
import {useAppSelector} from "../../../hooks/useAppSelector";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {AppDispatch} from "../../../store/store";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import {APIKEY} from "../../../APIKEY/APIKEY";
import {RiLoader3Fill} from "react-icons/ri";
import {
    fetchingMovie,
    fetchingMovieError,
    fetchingMovieSuccess
} from "../../../store/Reducer/movieSlice";

// @ts-ignore
const Actors = ({language}) => {

    const {detailId} = useParams()
    const {actors, error, loader} = useAppSelector(state => state.movieSlice)
    const dispatch = useAppDispatch()
    const fetchingActors = async (dispatch: AppDispatch) => {
        try {
            dispatch(fetchingMovie())
            const responsive = await axios.get(`https://api.themoviedb.org/3/movie/${detailId}/credits?api_key=${APIKEY}&language=${language}-US`)
            dispatch(fetchingMovieSuccess(responsive.data.cast))
        } catch (e: any) {
            dispatch(fetchingMovieError(e.message))
        }
    }

    useEffect(() => {
        dispatch(fetchingActors)
    }, [language])
    console.log(actors)

    if (loader) {
        return <div>
            <div className="section">
                <RiLoader3Fill className="loader"/>
                <h1 style={{
                    color: "white",
                    textAlign: "center"
                }}>Loading...</h1>
            </div>
        </div>
    }

    if (error) {
        return <div>
            <h1 style={{
                color: "white",
                textAlign: "center"
            }}>Error: {error}</h1></div>;
    }
    return (
        <div id="actor">
            <div className="container">
                <div className="actor">
                    {
                        <div style={{
                            display: "flex"
                        }}>
                            {
                                actors.map((el) => (
                                    el.profile_path &&
                                    <div key={el.id}>
                                        <Link to={`/actor/${el.id}`}>
                                            <div className="actor-title">
                                                <div>
                                                    <img
                                                         src={`https://www.themoviedb.org/t/p/w138_and_h175_face${el.profile_path}`}
                                                         alt=""/>
                                                </div>
                                                <h1>{el.name}</h1>
                                                <h2>{el.character}</h2>
                                            </div>
                                        </Link>

                                    </div>

                                ))
                            }
                        </div>
                    }

                </div>
            </div>
        </div>
    );
};

export default Actors;