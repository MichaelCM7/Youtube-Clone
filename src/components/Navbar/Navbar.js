import React from 'react'
import "./Navbar.css"
import home from "../../assets/icons/home.png"
import shorts from "../../assets/icons/shorts.png"
import subscriptions from "../../assets/icons/subscriptions.png"
import youIcon from "../../assets/icons/youIcon.png"
import { Link } from "react-router-dom"


function Navbar() {
  return (
    <nav className="sidebar" id="sidebar">
        <div id="mySidebar">
        <div className="sidebar-link">
            <div className="sidebar-icon-ph">
                <img className="sidebar-icon" src={home} />
            </div>
            <Link className="sidebar-icon-name navlink" to="/">
                <p className="name">
                    Home
                </p>
            </Link>
        </div>

        <div className="sidebar-link">
            <div className="sidebar-icon-ph">
                <img className="sidebar-icon" src={shorts} />
            </div>
            <div className="sidebar-icon-name">
                <p className="name">
                    Shorts
                </p>
            </div>
        </div>

        <div className="sidebar-link">
            <div className="sidebar-icon-ph">
                <img className="sidebar-icon" src={subscriptions} />
            </div>
            <div className="sidebar-icon-name">
                <p className="name">
                    Subscriptions
                </p>
            </div>
        </div>

        <div className="sidebar-link">
            <div className="sidebar-icon-ph">
                <img className="sidebar-icon" src={youIcon} />
            </div>
            <div className="sidebar-icon-name">
                <p className="name">
                    You
                </p>
            </div>
        </div>

        </div>
    </nav>
  )
}

export default Navbar