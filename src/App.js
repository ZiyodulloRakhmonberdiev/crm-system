import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Login from './components/Login'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Students from './pages/Students'
import Teachers from './pages/Teachers'
import Groups from './pages/Groups'
import ScrollToTop from './ScrollToTop'
import Finance from './pages/Finance'
import Payment from './pages/finance/Payment'

export default function App () {
  return (
    <div style={{ maxWidth: 1920 }} className='mx-auto'>
      <div>
        <Header />
        <Sidebar />
        <div className='ml-14 lg:ml-48 mt-14 p-2 lg:p-8 pb-16 mx-auto z-0'>
          <ScrollToTop />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/students' element={<Students />} />
            <Route path='/teachers' element={<Teachers />} />
            <Route path='/groups' element={<Groups />} />
            <Route path='/finance' element={<Finance />} />
            <Route path='/finance/payment' element={<Payment />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}
