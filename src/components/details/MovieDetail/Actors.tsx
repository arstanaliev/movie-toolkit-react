import React, {useEffect} from 'react';
import {useAppSelector} from "../../../hooks/useAppSelector";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {AppDispatch} from "../../../store/store";
import {
    fetchingActor,
    fetchingActorError,
    fetchingActorSuccess
} from "../../../store/Reducer/detailRedusers/ActorsSlice";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import {APIKEY} from "../../../APIKEY/APIKEY";
import {RiLoader3Fill} from "react-icons/ri";


const Actors = () => {

    const {detailId} = useParams()
    const {actors, error, loader} = useAppSelector(state => state.actorSlice)
    const dispatch = useAppDispatch()
    const fetchingActors = async (dispatch: AppDispatch) => {
        try {
            dispatch(fetchingActor())
            const responsive = await axios.get(`https://api.themoviedb.org/3/movie/${detailId}/credits?api_key=${APIKEY}&language=en-US`)
            dispatch(fetchingActorSuccess(responsive.data.cast))
        } catch (e: any) {
            dispatch(fetchingActorError(e.message))
        }
    }

    useEffect(() => {
        dispatch(fetchingActors)
    }, [])
    console.log(actors)

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
        <div id="actor">
            <div className="container">
                <div className="actor">
                    {
                        <div style={{
                            display: "flex"
                        }}>
                            {
                                actors.map((el) => (
                                    el.profile_path &&
                                    <div key={el.id}>
                                        <Link to={`/actor/${el.id}`}>
                                            <div className="actor-title">
                                                <img width={200}
                                                     src={`https://www.themoviedb.org/t/p/w138_and_h175_face${el.profile_path}`}
                                                     alt=""/>
                                                <h1>{el.original_name}</h1>
                                                <h2>{el.character}</h2>
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

export default Actors;