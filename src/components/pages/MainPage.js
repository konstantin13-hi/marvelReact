import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";
import { BrowserRouter as Router, Route ,Switch} from "react-router-dom";

import decoration from '../../resources/img/vision.png';
import { Component , useState} from "react";


const MainPage =()=>{

    const [selectedChar,setChar] =useState(null);
    const onCharSelected =(id)=>{
        setChar(id);
     }

    return (
        <>
    <RandomChar/>
    <div className="char__content">
        <CharList onCharSelected={onCharSelected}/>
        <CharInfo charId={selectedChar}/>
    </div>
    <img className="bg-decoration" src={decoration} alt="vision"/>
    </>
    )
}

export default MainPage;