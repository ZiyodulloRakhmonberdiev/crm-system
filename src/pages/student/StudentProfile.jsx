import { Tabs, Table } from 'antd'
import {
  CashStack,
  Envelope,
  Flag,
  TelephoneFill,
  Trash
} from 'react-bootstrap-icons'
import { EditOutlined, TeamOutlined } from '@ant-design/icons'
import { IconButton } from '../../UI/IconButton.style'
import { useSelector } from 'react-redux'

export default function StudentProfile () {
  const { userData } = useSelector(state => state.students)
  const columns = [
    {
      key: '1',
      title: 'Sana',
      dataIndex: 'id',
      fixed: 'top'
    },
    {
      key: '2',
      title: 'Miqdor',
      dataIndex: 'name',
      fixed: 'top'
    },
    {
      key: '3',
      title: 'Izoh',
      dataIndex: 'phone',
      fixed: 'top'
    },
    {
      key: '4',
      title: 'Hodim',
      dataIndex: 'address',
      fixed: 'top'
    }
  ]
  return (
    <div className='grid grid-cols-6 gap-12'>
      <div className='col-span-6 md:col-span-2'>
        <p className='text-xl mb-4'>{userData?.first_name } {userData?.last_name}</p>
        <div className='rounded-sm bg-white px-6 py-8 drop-shadow-md'>
          <div className='grid mb-2 md:mb-4'>
            <label className='text-xl mb-2'>{userData?.first_name } {userData?.last_name}</label>
            <p className='text-slate-400 text-xs'>(id: {userData?.id})</p>
          </div>
          <div className='grid mb-2 md:mb-4'>
            <label className='mb-2'>Balans</label>
            <p className='text-red-400'>120 000 so'm</p>
          </div>
          <div className='grid mb-2 md:mb-4'>
            <label className='mb-2'>Aloqa vositalari</label>
            <div>
              <p className='text-xs mb-1'>Telefon:</p>
              <span className='text-xs border border-green-400 rounded-md p-0.5 flex items-center justify-center gap-1 w-36'>
                <TelephoneFill className='text-green-400' />
                 {userData?.phone}
              </span>
            </div>
          </div>
          <div className='flex gap-4'>
            <IconButton color='success'>
              <EditOutlined />
            </IconButton>
            <IconButton color='primary'>
              <Envelope />
            </IconButton>
            <IconButton color='success'>
              <CashStack />
            </IconButton>
            <IconButton color='primary'>
              <TeamOutlined />
            </IconButton>
            <IconButton color='success'>
              <Flag />
            </IconButton>
            <IconButton color='danger'>
              <Trash />
            </IconButton>
          </div>
        </div>
      </div>
      <Tabs className='col-span-6 md:col-span-4'>
        <Tabs.TabPane tab='Profil' key='item-1'>
          <label className='text-lg'>Guruhlar</label>
          <div className='bg-orange-50 mt-2 p-3 lg:p-8 text-slate-500 mb-8'>
            Pre-Intermediate
          </div>
          <label className='text-lg'>To'lovlar</label>
          <Table columns={columns} className='overflow-auto mt-2'></Table>
        </Tabs.TabPane>
        <Tabs.TabPane tab='Tarix' key='item-2'>
          <div className='bg-orange-50 p-4'>Qaydlar mavjud emas</div>
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}
