import HeaderLayout from '../../components/HeaderLayout'
import Schedule from '../Schedule/Schedule'
import Teachers from '../teacher/Teachers'
export default function Dashboard () {
  return (
    <div className='container'>
      <HeaderLayout />
      <div className='mt-6 bg-white p-4 rounded-md shadow-sm'>
        <Schedule />
      </div>
    </div>
  )
}
