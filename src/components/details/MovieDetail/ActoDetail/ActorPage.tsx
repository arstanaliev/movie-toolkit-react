import React from 'react';
import ActorDetail from "./ActorDetail";
import ActorMovie from "./ActorMovie";

// @ts-ignore
const ActorPage = ({language}) => {
    return (
        <>
            <ActorDetail language={language}/>
            <ActorMovie language={language}/>
        </>
    );
};

export default ActorPage;