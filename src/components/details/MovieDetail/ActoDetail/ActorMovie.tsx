import React, {useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import {useAppSelector} from "../../../../hooks/useAppSelector";
import {useAppDispatch} from "../../../../hooks/useAppDispatch";
import {AppDispatch} from "../../../../store/store";
import axios from "axios";
import {APIKEY} from "../../../../APIKEY/APIKEY";
import {RiLoader3Fill} from "react-icons/ri";
import {fetchingMovie, fetchingMovieError, fetchingMovieSuccess} from "../../../../store/Reducer/movieSlice";

const ActorMovie = () => {
    const {detailId} = useParams()
    const {actorMovie, loader, error} = useAppSelector(state => state.movieSlice)
    const dispatch = useAppDispatch()
    const fetchingActorMovies = async (dispatch: AppDispatch) => {
        try {
            dispatch(fetchingMovie())
            const responsive = await axios.get(`https://api.themoviedb.org/3/person/${detailId}/movie_credits?api_key=${APIKEY}&language=en-US`)
            dispatch(fetchingMovieSuccess(responsive.data.cast))
        } catch (e: any) {
            dispatch(fetchingMovieError(e.message))
        }
    }
    useEffect(() => {
        dispatch(fetchingActorMovies)
    }, [])
    console.log(actorMovie)

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
        <div id="actor-movie">
            <div className="container">
                <div className="actor-movie">
                    {
                        <div style={{
                            display: "flex",
                            overflowX: "auto"
                        }}>
                            {
                                actorMovie.map((el) => (
                                    el.poster_path &&
                                    <div key={el.id}>
                                        <Link to={`/detail/${el.id}`}>
                                            <div className="actor-movie-title">
                                                <div>
                                                    <img width={200}
                                                         src={`https://www.themoviedb.org/t/p/w138_and_h175_face${el.poster_path}`}
                                                         alt=""/>
                                                </div>
                                                <h4>{el.original_title}</h4>
                                                <h5>{el.release_date}</h5>
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

export default ActorMovie;