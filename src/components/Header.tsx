import React from 'react';
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <div id="header">
            <div className="container">
                <div className="header">
                    <h1>Welcome</h1>
                    <div className="header-menu">
                        <Link to={"/"}>Popular</Link>
                        <Link to={"/now-playing"}>Now-Playing</Link>
                        <Link to={"/top-rated"}>Top-Rated</Link>
                    </div>
                    <input type="search" placeholder="Search a movie"/>
                </div>
            </div>
        </div>
    );
};

export default Header;