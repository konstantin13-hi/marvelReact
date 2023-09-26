import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';
import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import {Link} from 'react-router-dom'
import Spinner from '../spiner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const ComicsList = () => {
    const [data,setData] = useState([]);
    const [offset,setOffset] = useState(0);
    const[newItemLoading,setNewItemLoading]= useState(false);
    const [comicsEnded, setComicsEnded] = useState(false);
    const {
    loading,
		error,
		getAllComics,
		} = useMarvelService();


    useEffect(()=>{
        console.log('useEffect-ComicsLIst')
        onChargeDataComics(offset,true);
    },[])
   
    const onChargeDataComics = (currentOffset,initial) => {
      initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(currentOffset)
          .then(onComicsListLoaded);
      }

      const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }
        setNewItemLoading(false);
        setData([...data, ...newComicsList]);
        setOffset(offset + 8);
        setComicsEnded(ended);
    }
    console.log('render-ComicsLIst')
    // function renderItems (arr) {
    //     const items = arr.map((item, i) => {
    //         return (
    //             <li className="comics__item" key={i}>
    //                 <a href="#">
    //                     <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
    //                     <div className="comics__item-name">{item.title}</div>
    //                     <div className="comics__item-price">{item.price}</div>
    //                 </a>
    //             </li>
    //         )
    //     })

    //     return (
    //         <ul className="comics__grid">
    //             {items}
    //         </ul>
    //     )
    // }

    // const items = renderItems(data);

    const errorMessage = error ? <ErrorMessage/> : null;
    
    const spinner = loading && !newItemLoading ? <Spinner/> : null;


    return (
        <div className="comics__list">
              {errorMessage}
              {spinner}
            <ul className="comics__grid">
          
            {data.map((item, index) => (
          <Comics key={index} item={item} /> // Используем дочерний компонент для каждого элемента
        ))}
      
            </ul>
            {/* {items} */}
            <button 
             disabled={newItemLoading}
             style={{'display': comicsEnded ? 'none' : 'block'}}
            onClick={()=>onChargeDataComics(offset)}
            className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

	

const Comics = ({ item}) => {
    return (
      <li  className="comics__item">
        <Link to={`/comics/${item.id}`}>
          <img src={item.thumbnail} alt="x-men" className="comics__item-img" />
          <div className="comics__item-name">{item.title}</div>
          <div className="comics__item-price">{item.price}</div>
        </Link>
      </li>
    );
  };

export default ComicsList;