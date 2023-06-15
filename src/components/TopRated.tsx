import React, {useEffect} from 'react';
import {useAppDispatch} from "../hooks/useAppDispatch";
import {useAppSelector} from "../hooks/useAppSelector";
import {RiLoader3Fill} from "react-icons/ri";
import {Link} from "react-router-dom";
import {AppDispatch} from "../store/store";
import {
    fetchingCurrentPage,
    fetchingMovie,
    fetchingMovieError,
    fetchingMovieSuccess
} from "../store/Reducer/movieSlice";
import axios from "axios";
import {APIKEY} from "../APIKEY/APIKEY";
import Paginate from "./paginate";

// @ts-ignore
const TopRated = ({language}) => {
    const {movie, error, loader} = useAppSelector(state => state.movieSlice)
    const dispatch = useAppDispatch()
    const {currentPage} = useAppSelector(state => state.movieSlice)
    const fetchingTopRated = async (dispatch: AppDispatch) => {
        try {
            dispatch(fetchingMovie())
            const responsive = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${APIKEY}&language=${language}-US&page=${currentPage}`)
            dispatch(fetchingMovieSuccess(responsive.data.results))
        } catch (e: any) {
            dispatch(fetchingMovieError(e.massage))
        }
    }
    useEffect(() => {
        dispatch(fetchingTopRated)
    }, [currentPage, language])
    const onChangeCurrentPage = (number: number) => {
        dispatch(fetchingCurrentPage(number))
    }
    console.log(movie)
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
        <div id="movie">
            <div className="container">
                <div className="movie">
                    {
                        movie.map(el => (
                            <div key={el.id} className="movie-titles">
                                <Link to={`/detail/${el.id}`}>
                                    <div className="movie-titles-movie">
                                        <div>
                                            <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face${el.poster_path}`}
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

export default TopRated;