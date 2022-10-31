import React from 'react'
import { Outlet } from 'react-router-dom'
import ScrollToTop from '../ScrollToTop'
import Header from './Header'
import Sidebar from './Sidebar'

const Layout = () => {
  return (
    <div style={{ maxWidth: 1920 }} className='mx-auto'>
      <div>
        <Header />
        <Sidebar />
        <div className='ml-14 lg:ml-48 mt-14 p-2 lg:p-8 pb-16 mx-auto z-0'>
          <ScrollToTop />
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
