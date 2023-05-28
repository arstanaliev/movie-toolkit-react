import React, {useEffect} from 'react';
import {RiLoader3Fill} from "react-icons/ri";
import {Link, useParams} from "react-router-dom";
import {AppDispatch} from "../../store/store";
import {
    fetchingSearch,
    fetchingSearchError,
    fetchingSearchSuccess
} from "../../store/Reducer/detailRedusers/Search/SearchSlice";
import axios from "axios";
import {APIKEY} from "../../APIKEY/APIKEY";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useAppDispatch} from "../../hooks/useAppDispatch";

const Search = () => {
    const {searchId} = useParams()
    const {search, error, loader} = useAppSelector(state => state.searchSlice)
    const dispatch = useAppDispatch()
    const fetchingSearches = async () => {
        try {
            dispatch(fetchingSearch())
            const responsive = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&query=${searchId}`)
            dispatch(fetchingSearchSuccess(responsive.data.results))
        }catch (e: any) {
            dispatch(fetchingSearchError(e.message))
        }
    }
    useEffect(() => {
        dispatch(fetchingSearches)
    }, [])

    console.log(search)

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
        <div>
            <div className="container">
                <div className="movie">
                    {
                        search.map(el => (
                            <div key={el.id} className="movie-titles">
                                <Link to={`/detail/${el.id}`}>
                                    <div className="movie-titles-movie">
                                        <div>
                                            <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face${el.poster_path}`}
                                                 alt=""/>
                                            <h1>{el.vote_average}</h1>
                                        </div>
                                        <h4>{el.original_title}</h4>
                                        <h5>{el.release_date}</h5>
                                    </div>
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Search;