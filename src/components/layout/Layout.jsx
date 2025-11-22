import React from 'react'
import Navbar from '../navbar/Navbar.jsx'
import Footer from '../footer/Footer.jsx'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="container py-5">
        <Outlet/>
      </div>
      <Footer />
    </>
  )
}
