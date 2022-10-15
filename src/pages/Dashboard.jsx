import Header from '../components/Header'
import HeaderLayout from '../components/HeaderLayout'
import Sidebar from '../components/Sidebar'

export default function Dashboard () {
  return (
    <div className='container'>
      <Header />
      <Sidebar />
      <div className='ml-0 lg:ml-48 mt-14 p-8'>
        <HeaderLayout />
      </div>
    </div>
  )
}
