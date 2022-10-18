import { Link } from 'react-router-dom'
import { Card, Divider } from 'antd'
import {
  ArrowUpLeftCircle,
  CashStack,
  Coin,
  Collection,
  CollectionPlay,
  ExclamationCircle,
  Wallet
} from 'react-bootstrap-icons'
export default function Finance () {
  const data = [
    {
      id: 1,
      name: "Barcha To'lovlar",
      icon: <CashStack />,
      direction: '/finance/payment'
    },
    {
      id: 2,
      name: 'Yechib olinish',
      icon: <Coin />,
      direction: '/'
    },
    {
      id: 3,
      name: 'Ish haqi',
      icon: <Wallet />,
      direction: '/'
    },
    {
      id: 4,
      name: "To'lovlar guruhi",
      icon: <Collection />,
      direction: '/'
    },
    {
      id: 5,
      name: "Kurs to'lovlar",
      icon: <CollectionPlay />,
      direction: '/'
    },
    {
      id: 6,
      name: 'Harajatlar',
      icon: <ArrowUpLeftCircle />,
      direction: '/'
    },
    {
      id: 1,
      name: 'Qarzdorlar',
      icon: <ExclamationCircle />,
      direction: '/'
    }
  ]
  return (
    <div>
      <Divider orientation='center'>
        <span className='text-2xl'>Jami to'lovlar</span>
      </Divider>
      <div className='text-lg lg:text-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-transparent gap-4 pb-8'>
        {data.map(item => (
          <Card.Grid key={item.id} className='rounded-2xl bg-white w-full'>
            <Link
              to={item.direction}
              className='flex flex-col justify-center items-center gap-4 py-4'
            >
              <span className='text-2xl lg:text-4xl'>{item.icon}</span>
              {item.name}
            </Link>
          </Card.Grid>
        ))}
      </div>
    </div>
  )
}
