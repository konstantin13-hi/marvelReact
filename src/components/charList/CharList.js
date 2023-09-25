import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';
import { Component ,useState,useRef, useEffect} from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spiner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
 

const CharList =(props)=> {
       const[charList,setCharList] = useState([]);
       const[newItemLoading,setNewItemLoading]= useState(false);
       const[offset,setOffset]= useState(210);
       const[hoveredIndex,setHoveredIndex]= useState(null);
       const[charEnded,setCharEnded]= useState(false);
    
    
    const {loading,error,getAllCharacters,getCharacter} = useMarvelService();

   
    useEffect(() => {
        console.log("useEffect")
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)
    }

   const onCharListLoading = () => {
        setNewItemLoading(true);
    }

   const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }
            setCharList([...charList, ...newCharList]);
            setNewItemLoading(false);
            setOffset(()=>offset + 9);
           setCharEnded(ended);
            
     
    }
    // const onCharListLoaded = (newCharList) => {
    //     let ended = false;
    //     if (newCharList.length < 9) {
    //         ended = true;
    //     }

    //     setCharList(charList => [...charList, ...newCharList]);
    //     setNewItemLoading(newItemLoading => false);
    //     setOffset(offset => offset + 9);
    //     setCharEnded(charEnded => ended);
    // }

 

  const handleMouseEnter = (index) => {
        setHoveredIndex(index);
      };
    
   const handleMouseLeave = () => {
        setHoveredIndex(null);
      };

    const items =(charList)=>{
       return  (charList.map((character, index) => (
            <List
              key={character.id}
              character={character}
              isSelected={index === hoveredIndex}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={()=>handleMouseLeave()}
              onClick={() => props.onCharSelected(character.id)}
            />
          )))
    }
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;


        return (
            
            <div className="char__list">
                  {errorMessage}
                 {spinner}
                <ul className="char__grid">

           
            {items(charList)}
        
                </ul>
                <button className="button button__main button__long"  
                 disabled={newItemLoading}
                    style={{'display': charEnded ? 'none' : 'block'}}
                    onClick={() => onRequest(offset)}
                    > 
                    <div className="inner" >load more</div>
                </button>
            </div>
        );
    
}
const List = ({ character, isSelected, onMouseEnter, onMouseLeave, onClick}) => (
    <li className={`char__item ${isSelected ? 'char__item_selected' : ''}`} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}  onClick={onClick}> 
      <img src={character.thumbnail} alt={character.name} />
      <div className="char__name">{character.name}</div>
    </li>
  );

export default CharList;
