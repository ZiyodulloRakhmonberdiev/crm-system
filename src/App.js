import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/login/Login'
import Dashboard from './pages/dashboard/Dashboard'
import Leads from './pages/leads/Leads'
import Students from './pages/student/Students'
import Teachers from './pages/employee/Teachers'
import Groups from './pages/group/Groups'
import ScrollToTop from './ScrollToTop'
import Finance from './pages/finance/Finance'
import Payment from './pages/finance/Payment'
import TakeOff from './pages/finance/TakeOff'
import Spend from './pages/finance/Spend'
import Salary from './pages/finance/Salary'
import Debtors from './pages/finance/Debtors'
import Report from './pages/report/Report'
import Conversion from './pages/report/Conversion'
import Messages from './pages/report/Messages'
import TeacherProfile from './components/TeacherProfile'
import StudentProfile from './pages/student/StudentProfile'
import Layout from './components/Layout'
export default function App () {
  return (
    <div>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/leads' element={<Leads />} />
          <Route path='/groups' element={<Groups />} />

          <Route path='/students' element={<Students />} />
          <Route path='/students/profile/:id' element={<StudentProfile />} />

          <Route path='/teachers' element={<Teachers />} />
          <Route path='/teachers/profile' element={<TeacherProfile />} />

          <Route path='/finance' element={<Finance />} />
          <Route path='/finance/payment' element={<Payment />} />
          <Route path='/finance/takeoff' element={<TakeOff />} />
          <Route path='/finance/spend' element={<Spend />} />
          <Route path='/finance/salary' element={<Salary />} />
          <Route path='/finance/debtors' element={<Debtors />} />

          <Route path='/report' element={<Report />} />
          <Route path='/report/conversion' element={<Conversion />} />
          <Route path='/report/messages' element={<Messages />} />
        </Route>

        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
}
