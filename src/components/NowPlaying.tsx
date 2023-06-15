import React, {useEffect} from 'react';
import {useAppDispatch} from "../hooks/useAppDispatch";
import {useAppSelector} from "../hooks/useAppSelector";
import {RiLoader3Fill} from "react-icons/ri";
import {Link} from "react-router-dom";
import Paginate from "./paginate";
import {AppDispatch} from "../store/store";
import {
    fetchingCurrentPage,
    fetchingMovie,
    fetchingMovieError,
    fetchingMovieSuccess
} from "../store/Reducer/movieSlice";
import axios from "axios";
import {APIKEY} from "../APIKEY/APIKEY";

// @ts-ignore
const NowPlaying = ({language}) => {
    const {movie, error, loader} = useAppSelector(state => state.movieSlice)
    const dispatch = useAppDispatch()
    const {currentPage} = useAppSelector(state => state.movieSlice)
    const fetchingNovPlaying = async (dispatch: AppDispatch) => {
        try {
            dispatch(fetchingMovie())
            const responsive = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${APIKEY}&language=${language}-US&page=${currentPage}`)
            dispatch(fetchingMovieSuccess(responsive.data.results))
        } catch (e: any) {
            dispatch(fetchingMovieError(e.massage))
        }
    }

    useEffect(() => {
        dispatch(fetchingNovPlaying)
    }, [currentPage, language])

    const onChangeCurrentPage = (number: number) => {
        dispatch(fetchingCurrentPage(number))
    }

    console.log(movie)
    if (loader) {
        return <div>
            <div className="section">
                <RiLoader3Fill className="loader"/>
                Loading...
            </div>
        </div>
    }
    if (error) {
        return <div>
            Error: {error}
        </div>
    }
    return (
        <div id="movie">
            <div className="container">
                <div className="movie">
                    {
                        movie.map(el => (
                            <div key={el.id} className="movie-titles">
                                <Link to={`/detail/${el.id}`}>
                                    <div className="movie-titles-movie">
                                        <div>
                                            <img
                                                src={`https://www.themoviedb.org/t/p/w220_and_h330_face${el.poster_path}`}
                                                alt=""/>
                                            <h1>{el.vote_average}</h1>
                                        </div>
                                        <h4>{el.title}</h4>
                                        <h5>{el.release_date}</h5>
                                    </div>
                                </Link>
                            </div>
                        ))
                    }
                </div>
                <div className="movie-paginate">
                    <Paginate onChange={onChangeCurrentPage} currentPage={currentPage}/>
                </div>
            </div>
        </div>
    );
};

export default NowPlaying;