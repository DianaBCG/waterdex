import './card.css';
import {useState} from 'react';

function CardComponent(props) {
  const {item, openModal, setSpecie} =  props;
  return (
    <div
      className="w-40 md:w-60 lg:w-60 h-20 rounded-xl m-1 min-w card"
      onClick={() => {
        openModal();
        setSpecie(item)
      }}
    >
      <img src={item.squareUrl || item.smallUrl} className="specie-img" />
      {item.name}
    </div>
  )
}

export default CardComponent;