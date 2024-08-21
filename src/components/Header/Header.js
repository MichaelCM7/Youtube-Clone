import React, { useRef } from 'react'
import "./Header.css"
import createIcon from "../../assets/icons/create.png"
import searchIcon from "../../assets/icons/search.png"
import menuIcon from "../../assets/icons/menu.png"
import ytLogo from "../../assets/icons/yt-logo.png"
import voiceSearch from "../../assets/icons/voiceSearch.png"
import notificationBell from "../../assets/icons/notificationBell.png"
import userProfile from "../../assets/profiles/user.jpg"

import { useNavigate } from 'react-router-dom'


export default function Header() {

    const navigate = useNavigate()

    const searchRef = useRef("");

    const search = () => {
        navigate(`/search/${searchRef.current}/`)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            search()
        }
    }

  return (
    <header className="Header">
        <div className="Left-section">
            <img className="hamburger-menu" src={menuIcon} />
            <img className="youtube-logo" src={ytLogo} />
        </div>

        <form className="Middle-section">
            <input 
                className="searchbar" 
                type="text" 
                placeholder="Search" 
                ref={searchRef}
                onChange={(e) => searchRef.current = e.target.value}
                onKeyDown={handleKeyDown}  
            />
            <button className="search-icon-btn" onClick={() => search()} type='submit' >
                <img className="search-icon" src={searchIcon} />
                <div className="tooltip">
                    Search
                </div>
            </button>
            <button className="voice-search-btn">
                <img className="voicesrch-icon" src={voiceSearch} />
                <div className="tooltip">
                    Search with your voice
                </div>
            </button>
        </form>
        
        <div className="Right-section">
            <button className="create-btn">
                <img className="create-icon" src={createIcon} />
                <div className="tooltip">
                    Create
                </div>
            </button>
            <div className="notification-icon-container">
                <button className="notification-btn">
                    <img className="notification-icon" src={notificationBell} />
                    <div className="notifications-count">
                        9+
                    </div>
                    <div className="tooltip">
                        Notifications
                    </div>
                </button >
            </div>

            <img className="current-user-profile-picture" src={userProfile} />
        </div>

    </header>
  )
}
