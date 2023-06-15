import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Popular from "./components/Popular";
import Header from "./components/Header";
import {Route, Routes} from "react-router-dom";
import NowPlaying from "./components/NowPlaying";
import TopRated from "./components/TopRated";
import DetailPage from "./components/details/DetailPage";
import ActorPage from "./components/details/MovieDetail/ActoDetail/ActorPage";
import SearchPage from "./components/Search/SearchPage";
import Search from "./components/Search/Search";

function App() {
    const [dark, setDark] = useState(false)
    const [language, setLanguage] = useState('')
    const [filter, setFilter] = useState("")
    return (
    <div className="App" style={{
        background: dark ? "black" : "white"
    }}>
        <Header setDark={setDark} dark={dark} setLanguage={setLanguage} language={language} setFilter={setFilter} filter={filter}/>
        <Routes>
            <Route path={"/"} element={<Popular language={language}/>}/>
            <Route path={"/now-playing"} element={<NowPlaying language={language}/>}/>
            <Route path={"/top-rated"} element={<TopRated language={language}/>}/>
            <Route path={"/detail/:detailId"} element={<DetailPage language={language}/>}/>
            <Route path={"/actor/:detailId"} element={<ActorPage language={language}/>}/>
            <Route path={"/search/"} element={<SearchPage language={language} filter={filter}/>}/>
        </Routes>
    </div>
  );
}

export default App;
