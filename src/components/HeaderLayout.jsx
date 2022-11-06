import { TeamOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import {
  Arrow90degLeft,
  BoxArrowRight,
  Download,
  ExclamationCircle,
  Hourglass,
  Mortarboard
} from 'react-bootstrap-icons'
import student from '../assets/img/student.png'

export default function HeaderLayout () {
  return (
    <>
      <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
        <Link
          to='/students'
          className='bg-white flex flex-col md:flex-row justify-between col-span-6 md:col-span-2 lg:col-span-4 p-4 rounded-lg gap-4 text-center md:text-left'
        >
          <div className='flex items-center md:items-start md:justify-around flex-col'>
            <p className='text-lg text-violet-400'>O'quvchilar qaydnomasi</p>
            <p className='text-slate-400'>
              Bu oy o'quv markazi tarkibida
              <span className='text-violet-400'> 45</span> ta o'quvchi
              ro'yxatdan o'tdi. Hozirda o'quv markazida
              <span className='text-violet-400'> 875</span> ta o'quvchi mavjud
            </p>
            <button className='hover:bg-violet-400 text-violet-400 hover:text-white mt-2 border border-violet-400 transition rounded-sm p-2 w-40'>
              Barchasini ko'rish
            </button>
          </div>
          <div className='w-48 mx-auto'>
            <img src={student} alt='' className='w-full' />
          </div>
        </Link>
        <Link
          to='/leads'
          className='bg-white flex flex-col col-span-6 md:col-span-1 p-4 rounded-lg items-start justify-between'
        >
          <div className='text-2xl text-violet-400 bg-violet-50 p-2 rounded-md'>
            <Download />
          </div>
          <p className='text-slate-400 my-4'>Arizalar</p>
          <p className='text-slate-500 text-2xl'>123 ta</p>
        </Link>
        <Link
          to='/groups'
          className='bg-white flex flex-col col-span-6 md:col-span-1 p-4 rounded-lg items-start'
        >
          <div className='text-2xl text-cyan-400 bg-cyan-50 p-2 rounded-md'>
            <TeamOutlined />
          </div>
          <p className='text-slate-400 my-4'>Guruhlar</p>
          <p className='text-slate-500 text-2xl'>18 ta</p>
        </Link>
        <Link
          to='/students'
          className='bg-white flex flex-col col-span-6 md:col-span-1 p-4 rounded-lg items-start justify-between'
        >
          <div className='text-2xl text-cyan-400 bg-cyan-50 p-2 rounded-md'>
            <Mortarboard />
          </div>
          <p className='text-cyan-400 my-4'>Faol o'quvchilar</p>
          <p className='text-cyan-400 text-2xl'>875</p>
        </Link>
        <Link
          to='/'
          className='bg-white flex flex-col col-span-6 md:col-span-1 p-4 w-full rounded-lg items-start justify-between'
        >
          <div className='text-2xl text-violet-400 bg-violet-50 p-2 rounded-md'>
            <BoxArrowRight />
            <div />
          </div>
          <p className='text-violet-400 my-4'>Guruhni tark etdi</p>
          <p className='text-violet-400 text-2xl'>3 ta</p>
        </Link>
        <Link
          to='/finance/debtors'
          className='bg-white flex flex-col col-span-6 md:col-span-1 p-4 rounded-lg items-start justify-between'
        >
          <div className='text-2xl text-red-400 bg-red-50 p-2 rounded-md'>
            <ExclamationCircle />
          </div>
          <p className='text-red-400 my-4'>Qarzdorlar</p>
          <p className='text-red-400 text-2xl'>3 ta</p>
        </Link>
        <Link
          to='/'
          className='bg-white flex flex-col col-span-6 md:col-span-1 p-4 rounded-lg items-start justify-between'
        >
          <div className='text-2xl text-green-400 bg-green-50 p-2 rounded-md'>
            <Hourglass />
          </div>
          <p className='text-green-400 my-4'>Sinov darsida</p>
          <p className='text-green-500 text-2xl'>58 ta</p>
        </Link>
        <Link
          to='/'
          className='bg-white flex flex-col col-span-6 md:col-span-1 lg:col-span-2 p-4 rounded-lg items-start justify-between'
        >
          <div className='text-2xl text-slate-400 bg-slate-50 p-2 rounded-md'>
            <Arrow90degLeft />
          </div>
          <p className='text-slate-400 my-4'>Sinov darsidan keyin kelmadi</p>
          <p className='text-slate-500 text-2xl'>42 ta</p>
        </Link>
      </div>
    </>
  )
}
