import React from 'react';
import MovieDetailPage from "./MovieDetail/MovieDetailPage";
import Actors from "./MovieDetail/Actors";
import Trailer from "./MovieDetail/Trailer";
// @ts-ignore
const DetailPage = ({language}) => {
    return (
        <>
            <MovieDetailPage language={language}/>
            <Actors language={language}/>
            <Trailer/>
        </>
    );
};

export default DetailPage;