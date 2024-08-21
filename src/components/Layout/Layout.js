import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import Navbar from '../Navbar/Navbar'

import "./Layout.css"

export default function Layout() {
  return (
    <div>
      <Header />
      <div className='mainPage'>
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

