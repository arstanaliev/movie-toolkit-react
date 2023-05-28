import React, {useEffect} from 'react';
import {useAppDispatch} from "../hooks/useAppDispatch";
import {useAppSelector} from "../hooks/useAppSelector";
import {RiLoader3Fill} from "react-icons/ri";
import {fetchingTopRated} from "../store/Reducer/ActionCreators";
import {Link} from "react-router-dom";

const TopRated = () => {
    const {movie, error, loader} = useAppSelector(state => state.movieSlice)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchingTopRated)
    }, [])
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
        <div>
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

export default TopRated;