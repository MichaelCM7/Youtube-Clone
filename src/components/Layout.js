import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header/Header'
import Navbar from './Navbar/Navbar'

export default function Layout() {
  return (
    <div>
      <Header />
      <Navbar />
      <Outlet />
    </div>
  )
}

