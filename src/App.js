import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Login from './components/Login'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Teacher from './pages/Teacher'

export default function App () {
  return (
    <div style={{ maxWidth: 1920, marginLeft: 'auto', marginRight: 'auto' }}>
      <div>
        <Header />
        <Sidebar />
        <div
          className='ml-6 lg:ml-48 mt-14 p-8 mx-auto z-0'
          style={{ height: '100vh' }}
        >
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/teachers' element={<Teacher />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}
