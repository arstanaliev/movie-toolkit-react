import React, {useCallback, useEffect, useState} from 'react';
import axios from "axios";
import {APIKEY} from "../../APIKEY/APIKEY";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {fetchingMovie, fetchingMovieError, fetchingMovieSuccess} from "../../store/Reducer/movieSlice";
import debounce from "lodash.debounce"
import {Link} from "react-router-dom";
import {AiOutlineClose} from "react-icons/ai";
import {BiSearch} from "react-icons/bi";

// @ts-ignore
const Search = ({language, setFilter, filter}) => {
    const [searchButton, setSearchButton] = useState(false)
    const dispatch = useAppDispatch()
    const fetchingSearches = useCallback(
        debounce(async (filter: string) => {
            try {
                dispatch(fetchingMovie())
                const responsive = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&query=${filter}`)
                dispatch(fetchingMovieSuccess(responsive.data.results))
            } catch (e: any) {
                dispatch(fetchingMovieError(e.message))
            }
        }, 500),
        []
    )

    useEffect(() => {
        if (filter) {
            fetchingSearches(filter);
        }
    }, []);

    const handleInputChange = (event: any) => {
        setFilter(event.target.value.toLowerCase());
    };


    return (
        <div className="search-movie">
            <input type="search" id="input-search" placeholder="search movie" value={filter}
                   onChange={handleInputChange} style={{
                display: searchButton ? "block" : "none"
            }}/>
            <Link to={`/search`} onClick={() => setSearchButton(!searchButton)} style={{
                display: searchButton ? "none" : "flex"
            }}>
                <BiSearch/>
            </Link>
            <Link to={`/`} onClick={() => setSearchButton(!searchButton)} style={{
                display: searchButton ? "flex" : "none"
            }}>
                <AiOutlineClose/>
            </Link>

        </div>
    );
};
export default Search;
