import { TeamOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import {
  Arrow90degLeft,
  BoxArrowRight,
  CashStack,
  Download,
  ExclamationCircle,
  Hourglass,
  Mortarboard
} from 'react-bootstrap-icons'
import student from '../assets/img/student.png'
import budget from '../assets/img/money.png'
export default function HeaderLayout () {
  const items = [
    {
      title: 'Arizachilar',
      value: '180',
      icon: <Download />
    },
    {
      title: "O'quvchilar",
      value: '750',
      icon: <Mortarboard />
    },
    {
      title: 'Guruhlar',
      value: '26',
      icon: <TeamOutlined />
    },
    {
      title: 'Qarzdorlar',
      value: '11',
      icon: <ExclamationCircle />
    },
    {
      title: 'Sinov darsida',
      value: '44',
      icon: <Hourglass />
    },
    {
      title: "Joriy oyda to'laganlar",
      value: '487',
      icon: <CashStack />
    },
    {
      title: 'Guruhni tark etganlar',
      value: '9',
      icon: <BoxArrowRight />
    },
    {
      title: 'Sinovda ketdi',
      value: '89',
      icon: <Arrow90degLeft />
    }
  ]
  return (
    <>
      <div className='grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-2 hidden'>
        {items.map(item => (
          <Link className='bg-white p-2 flex justify-center flex-col rounded-sm text-center'>
            <span className='text-4xl mx-auto flex-auto mb-4'>{item.icon}</span>
            <span className='flex-auto'>{item.title}</span>
            <span className='text-xl'>{item.value}</span>
          </Link>
        ))}
      </div>

      <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
        <Link className='bg-white p-2 flex flex-col md:flex-row justify-between col-span-6 md:col-span-2 lg:col-span-4 p-4 rounded-lg gap-4 text-center md:text-left'>
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
        <Link className='bg-white p-2 flex flex-col col-span-6 md:col-span-1 p-4 rounded-lg items-start justify-between'>
          <div className='text-2xl text-violet-400 bg-violet-50 p-2 rounded-md'>
            <Download />
          </div>
          <p className='text-slate-400 my-4'>Arizalar</p>
          <p className='text-slate-500 text-2xl'>123 ta</p>
        </Link>
        <Link className='bg-white p-2 flex flex-col col-span-6 md:col-span-1 p-4 rounded-lg items-start'>
          <div className='text-2xl text-cyan-400 bg-cyan-50 p-2 rounded-md'>
            <TeamOutlined />
          </div>
          <p className='text-slate-400 my-4'>Guruhlar</p>
          <p className='text-slate-500 text-2xl'>18 ta</p>
        </Link>
        {/* <Link className='bg-white p-2 flex flex-col md:flex-row  gap-4 col-span-4 row-span-4 p-4 rounded-lg justify-evenly items-center'>
          <div className='w-48'>
            <img src={budget} />
          </div>
          <div className='flex flex-col gap-4 bg-green-50 rounded-lg p-4 lg:p-8'>
            <p className='text-2xl mb-2 text-slate-500'>Oylik tushum</p>
            <div className='flex gap-4'>
              <div className='bg-slate-50 rounded-md p-4 border border-green-400'>
                <p className='text-slate-400'>Jami to'lovlar</p>
                <p className='text-slate-500 text-xl'>21.000.000 uzs</p>
              </div>
              <div className='bg-green-50 rounded-md p-4 text-green-400'>
                <p>Sof foyda</p>
                <p className='text-xl'>16.000.000 uzs</p>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-4 bg-red-50 p-4 rounded-lg lg:p-8'>
            <p className='text-2xl mb-2 text-slate-500'>Harajatlar</p>
            <div className='flex gap-4'>
              <div className='bg-slate-50 border border-red-400 rounded-md p-4'>
                <p className='text-slate-400'>Jami harajatlar</p>
                <p className='text-slate-500 text-xl'>5.000.000 uzs</p>
              </div>
            </div>
          </div>
        </Link> */}
        <Link className='bg-white p-2 flex flex-col col-span-6 md:col-span-1 p-4 rounded-lg items-start justify-between'>
          <div className='text-2xl text-cyan-400 bg-cyan-50 p-2 rounded-md'>
            <Mortarboard />
          </div>
          <p className='text-cyan-400 my-4'>Faol o'quvchilar</p>
          <p className='text-cyan-400 text-2xl'>875</p>
        </Link>
        <Link className='bg-white p-2 flex flex-col col-span-6 md:col-span-1 p-4 w-full rounded-lg items-start justify-between'>
          <div className='text-2xl text-violet-400 bg-violet-50 p-2 rounded-md'>
            <BoxArrowRight />
            <div />
          </div>
          <p className='text-violet-400 my-4'>Guruhni tark etdi</p>
          <p className='text-violet-400 text-2xl'>3 ta</p>
        </Link>
        <Link className='bg-white p-2 flex flex-col col-span-6 md:col-span-1 p-4 rounded-lg items-start justify-between'>
          <div className='text-2xl text-red-400 bg-red-50 p-2 rounded-md'>
            <ExclamationCircle />
          </div>
          <p className='text-red-400 my-4'>Qarzdorlar</p>
          <p className='text-red-400 text-2xl'>3 ta</p>
        </Link>
        <Link className='bg-white p-2 flex flex-col col-span-6 md:col-span-1 p-4 rounded-lg items-start justify-between'>
          <div className='text-2xl text-green-400 bg-green-50 p-2 rounded-md'>
            <Hourglass />
          </div>
          <p className='text-green-400 my-4'>Sinov darsida</p>
          <p className='text-green-500 text-2xl'>58 ta</p>
        </Link>
        <Link className='bg-white p-2 flex flex-col col-span-6 md:col-span-1 lg:col-span-2 p-4 rounded-lg items-start justify-between'>
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
