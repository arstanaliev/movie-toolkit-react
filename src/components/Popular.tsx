import React, {useEffect, useState} from 'react';
import {useAppDispatch} from "../hooks/useAppDispatch";
import {useAppSelector} from "../hooks/useAppSelector";
import {RiLoader3Fill} from "react-icons/ri";
import {fetchingPopulars} from "../store/Reducer/ActionCreators";
import {Link} from "react-router-dom";

const Popular = () => {
    const {movie, error, loader} = useAppSelector(state => state.movieSlice)
    const [bac, setBac] = useState(false)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchingPopulars)
    }, [])
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
        <div>
            <div className="container">
                <div className="movie">
                    {
                        movie.map(el => (
                            <div key={el.id} className="movie-titles">
                                <div className="movie-titles-movie">
                                    <Link to={`/detail/${el.id}`}>

                                        <div>
                                            <img
                                                src={`https://www.themoviedb.org/t/p/w220_and_h330_face${el.poster_path}`}
                                                alt=""/>
                                            <h1>{el.vote_average}</h1>
                                        </div>
                                        <h4>{el.original_title}</h4>
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

export default Popular;