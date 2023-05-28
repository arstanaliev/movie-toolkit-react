import React from 'react';
import MovieDetailPage from "./MovieDetail/MovieDetailPage";
import Actors from "./MovieDetail/Actors";
import Trailer from "./MovieDetail/Trailer";

const DetailPage = () => {
    return (
        <>
            <MovieDetailPage/>
            <Actors/>
            <Trailer/>
        </>
    );
};

export default DetailPage;