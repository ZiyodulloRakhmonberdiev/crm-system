import { Link } from 'react-router-dom'
import { Card, Divider } from 'antd'
import { CardChecklist, Chat } from 'react-bootstrap-icons'
export default function Finance () {
  const data = [
    {
      id: 1,
      name: 'Konversiya hisoboti',
      icon: <CardChecklist />,
      direction: '/report/conversion'
    },
    {
      id: 2,
      name: 'Yoborilgan xabarlar',
      icon: <Chat />,
      direction: '/report/messages'
    }
  ]
  return (
    <div>
      <Divider orientation='center'>
        <span className='text-2xl'>Hisobotlar</span>
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