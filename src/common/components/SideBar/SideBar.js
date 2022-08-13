import React,{useState,useEffect} from 'react';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faHeadphonesAlt,
  faHeart,
  faPlayCircle,
  faSearch, faStream,
} from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as Avatar } from '../../../assets/images/avatar.svg';
import './_sidebar.scss';


function renderSideBarOption(link, icon, text, { selected } = {}) {
  return (
    <div
      className={cx('sidebar__option', { 'sidebar__option--selected': selected })}
    >
      <FontAwesomeIcon icon={icon} />
      <p>{text}</p>
    </div>
  )
}

export default function SideBar() {
  const CLIENT_ID = "79397e00debd41dc8aa372dd6193275c"
  const REDIRECT_URI = "http://localhost:3000"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

  const [token, setToken] = useState("")

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    // getToken()


    if (!token && hash) {
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

        window.location.hash = ""
        window.localStorage.setItem("token", token)
    }

    setToken(token)

}, [])

const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
}
  return (
    <div className="sidebar">
      <div className="sidebar__profile">
      <Avatar />
    {!token ?
    <a className="link" href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>

    
    <p>   Bob Smith</p>
    </a>:<p onClick={logout}>Logout</p>
  }  
     

      </div>
      <div className="sidebar__options">
        {renderSideBarOption('/', faHeadphonesAlt, 'Discover', { selected: true })}
        {renderSideBarOption('/search', faSearch, 'Search')}
        {renderSideBarOption('/favourites', faHeart, 'Favourites')}
        {renderSideBarOption('/playlists', faPlayCircle, 'Playlists')}
        {renderSideBarOption('/charts', faStream, 'Charts')}
      </div>
    </div>
  );
}
