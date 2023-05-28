import React from 'react';
import logo from './logo.svg';
import './App.css';
import Popular from "./components/Popular";
import Header from "./components/Header";
import {Route, Routes} from "react-router-dom";
import NowPlaying from "./components/NowPlaying";
import TopRated from "./components/TopRated";
import DetailPage from "./components/details/DetailPage";
import ActorDetail from "./components/details/MovieDetail/ActoDetail/ActorDetail";
import ActorPage from "./components/details/MovieDetail/ActoDetail/ActorPage";
import Search from "./components/Search/Search";

function App() {
  return (
    <div className="App">
        <Header/>
        <Routes>
            <Route path={"/"} element={<Popular/>}/>
            <Route path={"/now-playing"} element={<NowPlaying/>}/>
            <Route path={"/top-rated"} element={<TopRated/>}/>
            <Route path={"/detail/:detailId"} element={<DetailPage/>}/>
            <Route path={"/actor/:detailId"} element={<ActorPage/>}/>
            <Route path={"/search/:searchId"} element={<Search/>}/>
        </Routes>
    </div>
  );
}

export default App;
