import React, {useEffect} from 'react';
import {useAppSelector} from "../../../hooks/useAppSelector";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {AppDispatch} from "../../../store/store";
import axios from "axios";
import {
    fetchingTrailer,
    fetchingTrailerError,
    fetchingTrailerSuccess
} from "../../../store/Reducer/detailRedusers/TrailerSlice";
import {APIKEY} from "../../../APIKEY/APIKEY";
import {useParams} from "react-router-dom";
import {RiLoader3Fill} from "react-icons/ri";

const Trailer = () => {
    const {detailId} = useParams()
    const {trailer, loader, error} = useAppSelector(state => state.trailerSlice)
    const dispatch = useAppDispatch()
    const fetchingTrailers = async (dispatch: AppDispatch) => {
        try {
            dispatch(fetchingTrailer)
            const responsive = await axios.get(`https://api.themoviedb.org/3/movie/${detailId}/videos?api_key=${APIKEY}&language=en-US`)
            dispatch(fetchingTrailerSuccess(responsive.data.results))
        } catch (e: any) {
            dispatch(fetchingTrailerError(e.message))
        }
    }
    useEffect(() => {
        dispatch(fetchingTrailers)
    }, [])
    console.log(trailer)
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
        <div id="trailer">
            <div className="container">
                <div className="trailer">
                    {
                        <div style={{
                            display: "flex"
                        }}>
                            {
                                trailer.map((el) => (
                                    el.key &&
                                    <div>
                                        <div className="trailer-title">
                                            <iframe width="500" height="300"
                                                    src={`https://www.youtube.com/embed/${el.key}`}
                                                    title="YouTube video player" frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                    allowFullScreen></iframe>
                                        </div>
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

export default Trailer;