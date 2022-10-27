import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Login from './components/Login'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Leads from './pages/Leads'
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
import Report from './pages/Report'
import Conversion from './pages/report/Conversion'
import Messages from './pages/report/Messages'
import TeacherProfile from './components/TeacherProfile'
import StudentProfile from './components/StudentProfile'
import Layout from './components/Layout'
export default function App () {
  return (
    <div >
          <ScrollToTop />
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route path='/' element={<Dashboard />} />
              <Route path='/leads' element={<Leads />} />
              <Route path='/students' element={<Students />} />
              <Route path='/teachers' element={<Teachers />} />
              <Route path='/groups' element={<Groups />} />
              <Route path='/finance' element={<Finance />} />

              <Route path='/finance/payment' element={<Payment />} />
              <Route path='/finance/takeoff' element={<TakeOff />} />
              <Route path='/finance/spend' element={<Spend />} />
              <Route path='/finance/salary' element={<Salary />} />
              <Route path='/finance/debtors' element={<Debtors />} />

              <Route path='/report' element={<Report />} />
              <Route path='/report/conversion' element={<Conversion />} />
              <Route path='/report/messages' element={<Messages />} />

              <Route path='/teachers/profile' element={<TeacherProfile />} />
              <Route path='/students/profile' element={<StudentProfile />} />
            </Route>

            <Route path='/login' element={<Login />} />
          </Routes>
    </div>
  )
}

