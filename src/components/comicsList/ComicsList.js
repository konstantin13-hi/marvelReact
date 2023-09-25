import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';
import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';

const ComicsList = () => {
    const [data,setData] = useState([]);
    const [offset,setOffset] = useState(0);
    const {loading,
		error,
		clearError,
		getAllCharacters,
		getCharacter,
		getAllComics,
		getComics,} = useMarvelService();


    useEffect(()=>{
        console.log('useEffect-ComicsLIst')
        onChargeDataComics(offset);
    },[])
   
    const onChargeDataComics = (currentOffset) => {
        getAllComics(currentOffset)
          .then(onComicsListLoaded);
      }

      const onComicsListLoaded = (newComicsList) => {

        setData([...data, ...newComicsList]);
        setOffset(offset + 8);
       
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

    return (
        <div className="comics__list">
            <ul className="comics__grid">
            {data.map((item, index) => (
          <Comics key={index} item={item} /> // Используем дочерний компонент для каждого элемента
        ))}
      
            </ul>
            {/* {items} */}
            <button 
            onClick={()=>onChargeDataComics(offset)}
            className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

	

const Comics = ({ item }) => {
    return (
      <li  className="comics__item">
        <a href="#">
          <img src={item.thumbnail} alt="x-men" className="comics__item-img" />
          <div className="comics__item-name">{item.title}</div>
          <div className="comics__item-price">{item.price}</div>
        </a>
      </li>
    );
  };

export default ComicsList;