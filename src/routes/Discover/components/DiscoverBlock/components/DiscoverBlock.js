import React,{useState,useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import DiscoverItem from './DiscoverItem';
import axios from 'axios';
import '../styles/_discover-block.scss';


function scrollContainer(id, { isNegative } = {}) {


  return () => {
    const scrollableContainer = document.getElementById(id);
    const amount = isNegative ? -scrollableContainer.offsetWidth : scrollableContainer.offsetWidth;

    scrollableContainer.scrollLeft = scrollableContainer.scrollLeft + amount;
  };
}

export default function DiscoverBlock({ text, id, data, imagesKey = 'images' }) {
  const[newRelases,setNewReleased]=useState([])

let userToken=localStorage.getItem("token")
  const ReleaseSongs = async (e) => {
    e.preventDefault()
    const {data} = await axios.get("https://api.spotify.com/v1/browse/new-releases", {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
       console.log(data.albume)
    setNewReleased(data.albume.items)
}
  return (
    <div className="discover-block">
      <div className="discover-block__header">
        <h2>{text}</h2>
        <span />
        {
          data.length ? (
            <div className="animate__animated animate__fadeIn">
              <FontAwesomeIcon
                icon={faChevronLeft}
                onClick={scrollContainer(id, { isNegative: true })}
              />
             
              <FontAwesomeIcon
                icon={faChevronRight}
                onClick={scrollContainer(id)}
              />
            </div>
          ) : null
        }
      </div>
      <div className="discover-block__row" id={id}>
        {data.map(({ [imagesKey]: images, name }) => (
          <DiscoverItem key={name} images={images} name={name} />
        ))}
      </div>
    </div>
  );
}
