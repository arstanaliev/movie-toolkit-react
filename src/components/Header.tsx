import React, {useState} from 'react';
import {Link} from "react-router-dom";
import Search from "./Search/Search";
import {MdDarkMode, MdLightMode} from "react-icons/md";
import {RxHamburgerMenu} from "react-icons/rx";
import {AiOutlineClose} from "react-icons/ai";

// @ts-ignore
const Header = ({setDark, dark, setLanguage, language, setFilter, filter}) => {
    const [burger, setBurger] = useState(false)
    const handleChange = (event: any) => {
        setLanguage(event.target.value)
    }
    console.log(language)
    return (
        <div id="header">
            <div className="container">
                <div className="header">
                    <div className="header-burger">
                        <div className="burger-btn">
                            <button onClick={() => setBurger(!burger)} style={{
                                display: burger ? "none" : "block"
                            }}><RxHamburgerMenu/></button>
                            <button onClick={() => setBurger(!burger)} style={{
                                display: burger ? "block" : "none"
                            }}><AiOutlineClose/></button>
                        </div>

                        <div className="burger-menu" style={{
                            left: burger ? "0" : "-200px"
                        }}>
                            <Link to={"/"}>Popular</Link> <br/>
                            <Link to={"/now-playing "}>Now-Playing</Link> <br/>
                            <Link to={"/top-rated"}>Top-Rated</Link>
                        </div>
                    </div>

                    <Link to={"/"} className="header-logo">Welcome</Link>
                    <div className="header-menu">
                        <Link to={"/"}>Popular</Link>
                        <Link to={"/now-playing"}>Now-Playing</Link>
                        <Link to={"/top-rated"}>Top-Rated</Link>
                    </div>
                    <Search language={language} setFilter={setFilter} filter={filter}/>
                    <div className="header-dark">
                        <MdDarkMode onClick={() => setDark(!dark)} style={{
                            display: dark ? "none" : "block",
                            transition: "all 3s ease 3s"
                        }}/>
                        <MdLightMode onClick={() => setDark(!dark)} style={{
                            display: dark ? "block" : "none",
                            transition: "all 3s ease 3s"
                        }}/>
                    </div>
                    <div>
                        <select name="language" id="language" onChange={handleChange}>
                            <option value="en">EN</option>
                            <option value="ru">RU</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;