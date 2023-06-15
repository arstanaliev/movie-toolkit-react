import React, {useEffect} from 'react';
import {
    fetchingMovie,
    fetchingMovieError,
    fetchingMovieSuccess
} from "../../store/Reducer/movieSlice";
import axios from "axios";
import {APIKEY} from "../../APIKEY/APIKEY";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {Link} from "react-router-dom";
import {RiLoader3Fill} from "react-icons/ri";

// @ts-ignore
const SearchPage = ({language, filter}) => {
    const {search, loader, error} = useAppSelector(state => state.movieSlice)
    const dispatch = useAppDispatch()
    const fetchingSearchPage = async () => {
        try {
            dispatch(fetchingMovie())
            const responsive = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&language=${language}-US&query=${filter}`)
            dispatch(fetchingMovieSuccess(responsive.data.results))
        } catch (e: any) {
            dispatch(fetchingMovieError(e.message))
        }
    }
    useEffect(() => {
        dispatch(fetchingSearchPage)
    }, [filter, language])
    if (loader) {
        return <div>
            <div className="section">
                <h1>
                    <RiLoader3Fill className="loader"/>
                    Loading...
                </h1>
            </div>
        </div>
    }
    if (error) {
        return <div>
            Error: {error}
        </div>
    }
    console.log(search)

    return (
        <div>
            <div className="container">
                <div className="movie">
                    { search &&
                        search.map(el => (
                            <div key={el.id} className="movie-titles">
                                <div className="movie-titles-movie">
                                    <Link to={`/detail/${el.id}`}>

                                        <div>
                                            <img
                                                src={`https://www.themoviedb.org/t/p/w220_and_h330_face${el.poster_path}`}
                                                alt=""/>
                                            <h1>{el.vote_average}</h1>
                                        </div>
                                        <h4>{el.title}</h4>
                                        <h5>{el.release_date}</h5>
                                    </Link>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>
        </div>
    );
};

export default SearchPage;