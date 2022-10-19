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
import TakeOff from './pages/finance/TakeOff'
import Spend from './pages/finance/Spend'
import Salary from './pages/finance/Salary'
import Debtors from './pages/finance/Debtors'

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
            <Route path='/finance/takeoff' element={<TakeOff />} />
            <Route path='/finance/spend' element={<Spend />} />
            <Route path='/finance/salary' element={<Salary />} />
            <Route path='/finance/debtors' element={<Debtors />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}
