import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Login from './components/Login'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Student from './pages/Student'
import Teacher from './pages/Teacher'
import ScrollToTop from './ScrollToTop'

export default function App () {
  return (
    <div style={{ maxWidth: 1920 }} className='mx-auto'>
      <div>
        <Header />
        <Sidebar />
        <div
          className='ml-8 lg:ml-48 mt-14 p-8 mx-auto z-0'
          style={{ height: '100vh' }}
        >
          <ScrollToTop />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/teachers' element={<Teacher />} />
            <Route path='/students' element={<Student />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}
