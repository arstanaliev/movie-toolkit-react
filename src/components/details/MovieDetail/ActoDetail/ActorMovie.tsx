import React, {useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import {useAppSelector} from "../../../../hooks/useAppSelector";
import {useAppDispatch} from "../../../../hooks/useAppDispatch";
import {AppDispatch} from "../../../../store/store";
import {
    fetchingActorMovie, fetchingActorMovieError,
    fetchingActorMovieSuccess
} from "../../../../store/Reducer/detailRedusers/ActorDetailSlice/ActorMovieSlice";
import axios from "axios";
import {APIKEY} from "../../../../APIKEY/APIKEY";
import Slider from "react-slick";
import {RiLoader3Fill} from "react-icons/ri";

const ActorMovie = () => {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 5000,
        cssEase: "linear"
    };
    const {detailId} = useParams()
    const {actorMovie, loader, error} = useAppSelector(state => state.actorMovieSlice)
    const dispatch = useAppDispatch()
    const fetchingActorMovies = async (dispatch: AppDispatch) => {
        try {
            dispatch(fetchingActorMovie())
            const responsive = await axios.get(`https://api.themoviedb.org/3/person/${detailId}/movie_credits?api_key=${APIKEY}&language=en-US`)
            dispatch(fetchingActorMovieSuccess(responsive.data.cast))
        } catch (e: any) {
            dispatch(fetchingActorMovieError(e.message))
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
                        actorMovie.length > 5 ?
                            <Slider {...settings}>
                                {
                                    actorMovie.map((el) => (
                                        el.poster_path &&
                                        <div key={el.id}>
                                            <Link to={`/detail/${el.id}`}>
                                                <div className="actor-title">
                                                    <img width={200}
                                                         src={`https://www.themoviedb.org/t/p/w138_and_h175_face${el.poster_path}`}
                                                         alt=""/>
                                                    <h1>{el.original_title}</h1>
                                                </div>
                                            </Link>

                                        </div>

                                    ))
                                }
                            </Slider> :
                            <div style={{
                                display: "flex",
                                justifyContent: "space-evenly"
                            }}>
                                {
                                    actorMovie.map((el) => (
                                        el.poster_path &&
                                        <div key={el.id}>
                                            <Link to={`/detail/${el.id}`}>
                                                <div className="actor-title">
                                                    <img width={200}
                                                         src={`https://www.themoviedb.org/t/p/w138_and_h175_face${el.poster_path}`}
                                                         alt=""/>
                                                    <h1>{el.original_title}</h1>
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