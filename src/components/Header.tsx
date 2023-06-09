import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Simulate} from "react-dom/test-utils";
import {useAppSelector} from "../hooks/useAppSelector";

const Header = () => {
    const [value, setValue] = useState("")
    const navigate = useNavigate()
    const handleClick = (e: any) => {
        navigate(`/search/:${e}`)
    }
    console.log(value)
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
                    <input type="search" placeholder="Search a movie..."
                           onChange={event => setValue(event.target.value)}
                           onKeyDown={(event) => {
                               if (event.key === "Enter") {
                                   handleClick(value)
                               }
                           }}/>
                </div>
            </div>
        </div>
    );
};

export default Header;