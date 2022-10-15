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
export default function HeaderLayout () {
  const items = [
    {
      title: 'Arizachilar',
      value: '180',
      icon: <Download />
    },
    {
      title: 'O`quvchilar',
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
      title: 'Joriy oyda to`laganlar',
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
      <div className='grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-2'>
        {items.map(item => (
          <Link className='bg-white p-2 flex justify-center flex-col rounded-sm text-center'>
            <span className='text-4xl mx-auto flex-auto mb-4'>{item.icon}</span>
            <span className='flex-auto'>{item.title}</span>
            <span className='text-xl'>{item.value}</span>
          </Link>
        ))}
      </div>
    </>
  )
}
