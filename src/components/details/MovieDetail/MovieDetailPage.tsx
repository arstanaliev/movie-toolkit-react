import React, {useEffect} from 'react';
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {useParams} from "react-router-dom";
import axios from "axios";
import {APIKEY} from "../../../APIKEY/APIKEY";
import {RiLoader3Fill} from "react-icons/ri";
import {AppDispatch} from "../../../store/store";
import {GoPrimitiveDot} from "react-icons/go";
import {fetchingMovie, fetchingMovieDetailSuccess, fetchingMovieError} from "../../../store/Reducer/movieSlice";

const MovieDetailPage = () => {
    const {detailId} = useParams()
    const {detail, loader, error} = useAppSelector(state => state.movieSlice)
    const dispatch = useAppDispatch()

    const fetchingMovieDetails = async (dispatch: AppDispatch) => {
        try {
            dispatch(fetchingMovie())
            const responsive = await axios.get(`https://api.themoviedb.org/3/movie/${detailId}?api_key=${APIKEY}&language=en-US`)
            dispatch(fetchingMovieDetailSuccess(responsive.data))
        } catch (e: any) {
            dispatch(fetchingMovieError(e.message))
        }
    }
    useEffect(() => {
        dispatch(fetchingMovieDetails)
    }, [])

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
    console.log(detail)
    let {original_title, release_date, id, genres, runtime, vote_average, overview, poster_path, backdrop_path} = detail
    return (
        <div id="movie-detail" style={{
            background: `linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.7)), url("https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${backdrop_path}") no-repeat center/cover fixed`,
        }}>
            <div className="container">
                <div className="movie-detail">
                    <div className="movie-detail-img">
                        <img height={400} src={`https://image.tmdb.org/t/p/w220_and_h330_face${poster_path}`} alt=""/>
                    </div>
                    <div className="movie-detail-title">
                        <h3>{original_title} <p>({release_date})</p></h3>
                        <h4>
                            <p>{genres && genres.map(el => "(" + el.name + ")")}</p> <span><GoPrimitiveDot/></span>
                            <p>{runtime && Math.floor(runtime / 60)}h {runtime && runtime % 60}m</p>
                        </h4>
                        <h2>Рейтинг: <h5>{vote_average && Math.round(vote_average * 10)}%</h5></h2>
                        <div>
                            <h1>Overview:</h1>
                            <p>{overview}</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MovieDetailPage;