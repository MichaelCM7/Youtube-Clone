import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header/Header'

export default function NoLayout() {
  return (
    <div>
        <Header />
        <Outlet />
    </div>
  )
}
