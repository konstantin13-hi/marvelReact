import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';
import { useState,useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spiner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
const CharInfo =(props)=> {

    const [char,setChar] = useState(null);
   
    const {loading,error,getCharacter} = useMarvelService();
  

    useEffect(()=>{
        updateChar();
    },[])

    useEffect(()=>{
       updateChar();
    },[props.charId])

   

  const updateChar = () => {
    
        if (!props.charId) {
            return;
        }
            getCharacter(props.charId)
            .then(onCharLoaded)
      
    }

 const onCharLoaded = (char) => {
        setChar(char);
    }

        const skeleton = char || loading || error ? null : <Skeleton/>;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !char) ? <View char={char}/> : null;
        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    
}

const View  =({char})=>{
    const { name,description,thumbnail,homepage,wiki,comics} = char;
    return (
        <>
    <div className="char__basics">
    <img src={thumbnail} alt="abyss" style={{ objectFit: 'contain' }} />
        {/* <img src={thumbnail} alt="abyss"/> */}
        <div>
            <div className="char__info-name">{name}</div>
            <div className="char__btns">
                <a href={homepage} className="button button__main">
                    <div className="inner">homepage</div>
                </a>
                <a href={wiki} className="button button__secondary">
                    <div className="inner">Wiki</div>
                </a>
            </div>
        </div>
    </div>
    <div className="char__descr">
       {description}
           </div>
           {comics.length > 0 && (
  <div className="char__comics">Comics:</div>
)}
    
    <ul className="char__comics-list">
    {comics.slice(0, 5).map((comic, index) => (
    <Comics key={index} data={comic} />))}

    </ul>
    </>
)
}

const Comics = ({ data }) => {
    return <li className="char__comics-item">{data.name}</li>;
  };



export default CharInfo;
