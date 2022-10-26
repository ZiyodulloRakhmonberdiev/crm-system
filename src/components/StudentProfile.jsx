import { Dropdown, Menu } from 'antd'
import { CashStack, Chat } from 'react-bootstrap-icons'
import { EditOutlined } from '@ant-design/icons'
export default function StudentProfile () {
  return (
    <div>
      <p className='text-xl font-bold mb-4'>Umar Abdulazizov</p>
      <div className='rounded-lg bg-white p-4 md:w-2/3 lg:w-1/2'>
        <div className='grid md:grid-cols-2 border-b mb-2 md:mb-4'>
          <label className='font-bold'>ID:</label>
          <p className='text-slate-400'>1256215</p>
        </div>
        <div className='grid md:grid-cols-2 border-b mb-2 md:mb-4'>
          <label className='font-bold'>Balansi:</label>
          <p className='text-slate-400'>120 000</p>
        </div>
        <div className='grid md:grid-cols-2 border-b mb-2 md:mb-4'>
          <label className='font-bold'>Telefon:</label>
          <p className='text-slate-400'>+998 90 120 00 00</p>
        </div>
        <div className='grid md:grid-cols-2 border-b mb-2 md:mb-4'>
          <label className='font-bold'>Filial:</label>
          <p className='text-slate-400'>Demo</p>
        </div>
        <div className='grid md:grid-cols-2 border-b mb-2 md:mb-4'>
          <label className='font-bold'>Guruhlar:</label>
          <p className='text-slate-400'>Android</p>
        </div>
        <div className='grid md:grid-cols-2 border-b mb-2 md:mb-4'>
          <label className='font-bold'>Amallar:</label>
          <div className='flex gap-4'>
            <Dropdown
              overlay={
                <Menu
                  items={[
                    {
                      key: '1',
                      label: (
                        <a target='_blank' rel='noopener noreferrer'>
                          Tahrirlash
                        </a>
                      )
                    },
                    {
                      key: '2',
                      label: (
                        <a target='_blank' rel='noopener noreferrer'>
                          Guruhga qo'shish
                        </a>
                      )
                    },
                    {
                      key: '3',
                      label: (
                        <a target='_blank' rel='noopener noreferrer'>
                          O'chirish
                        </a>
                      )
                    }
                  ]}
                />
              }
              placement='bottomLeft'
              arrow
            >
              <span className='p-2 rounded-full mb-1 border flex items-center justify-center w-10 h-10'>
                <EditOutlined />
              </span>
            </Dropdown>
            <Dropdown
              overlay={
                <a className='border p-2 drop-shadow-md bg-white'>
                  Xabar yuborish
                </a>
              }
              placement='bottomLeft'
              arrow
            >
              <span className='p-2 rounded-full mb-1 border flex items-center justify-center w-10 h-10'>
                <Chat />
              </span>
            </Dropdown>
            <Dropdown
              overlay={
                <a className='border p-2 drop-shadow-md bg-white'>
                  To'lov amalga oshirish
                </a>
              }
              placement='bottomLeft'
              arrow
            >
              <span className='p-2 rounded-full mb-1 border flex items-center justify-center w-10 h-10'>
                <CashStack />
              </span>
            </Dropdown>
            {/* <p className='text-slate-400'><EditOutlined /></p>
            <p className='text-slate-400'><CashStack /></p>
            <p className='text-slate-400'>Guruhga o'tkazish</p>
            <p className='text-slate-400'>To'lov qilish</p>
            <p className='text-slate-400'>Xabar yuborish</p>
            <p className='text-slate-400'><Trash2 /></p> */}
          </div>
        </div>
      </div>
    </div>
  )
}
