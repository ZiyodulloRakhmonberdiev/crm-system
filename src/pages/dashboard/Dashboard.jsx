import HeaderLayout from '../../components/HeaderLayout'
import Teachers from '../employee/Teachers'
export default function Dashboard () {
  return (
    <div className='container'>
      <HeaderLayout />
      <div className='mt-12'>
        <Teachers />
      </div>
    </div>
  )
}
