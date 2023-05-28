import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useAppSelector} from "../../../../hooks/useAppSelector";
import {useAppDispatch} from "../../../../hooks/useAppDispatch";
import {AppDispatch} from "../../../../store/store";
import axios from "axios";
import {APIKEY} from "../../../../APIKEY/APIKEY";
import {fetchingActorSuccess} from "../../../../store/Reducer/detailRedusers/ActorsSlice";
import {
    fetchingActorDetail,
    fetchingActorDetailError,
    fetchingActorDetailSuccess
} from "../../../../store/Reducer/detailRedusers/ActorDetailSlice/ActorDetailSlice";
import Actors from "../Actors";
import {RiLoader3Fill} from "react-icons/ri";

const ActorDetail = () => {

    const [accordion, setAccordion] = useState(false)
    const {detailId} = useParams()
    const {actorDetail, loader, error} = useAppSelector(state => state.actorDetailSlice)
    const dispatch = useAppDispatch()

    const fetchingActorDetails = async (dispatch: AppDispatch) => {
        try {
            dispatch(fetchingActorDetail())
            const responsive = await axios.get(`https://api.themoviedb.org/3/person/${detailId}?api_key=${APIKEY}&language=en-US`)
            dispatch(fetchingActorDetailSuccess(responsive.data))
        } catch (e: any) {
            dispatch(fetchingActorDetailError(e.message))
        }
    }
    useEffect(() => {
        dispatch(fetchingActorDetails)
    }, [])
    console.log(actorDetail)

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

    const {profile_path, id, name, biography, birthday} = actorDetail
    return (
        <div>
            {
                <div id="actor-detail">
                    <div className="container">
                        <div className="actor-detail">
                            <div>
                                <div className="actor-detail-img">
                                    <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${profile_path}`} alt=""/>
                                </div>
                            </div>
                            <div className="actor-detail-title">
                                <h1>{name}({birthday})</h1>
                                <h2>Biography: <p>{biography ? biography.length < 201 ? biography :
                                    (<p style={{
                                        display: accordion ? "none" : "block"
                                    }}>{biography.slice(0, 300)}...</p>) : ""}
                                    <p style={{
                                        display: accordion ? "block" : "none"
                                    }}>{biography}</p>
                                    <button onClick={() => setAccordion(!accordion)} style={{
                                        display: accordion ? "none" : "block",
                                        cursor: "pointer"
                                    }}> Читать Дальше
                                    </button>
                                    <button onClick={() => setAccordion(!accordion)} style={{
                                        display: accordion ? "block" : "none",
                                        cursor: "pointer"
                                    }}>Свернуть
                                    </button>
                                </p></h2>
                            </div>
                        </div>

                    </div>
                </div>
            }
        </div>
    );
};

export default ActorDetail;