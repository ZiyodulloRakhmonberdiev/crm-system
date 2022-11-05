import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

import { Card, Dropdown, Space, Avatar, Tabs, Table } from 'antd'
import { ArrowRight } from 'react-bootstrap-icons'
import photo from '../../assets/img/Default-avatar.jpg'

export default function TeacherProfile () {
  const { Meta } = Card
  const { teachersData } = useSelector(state => state.teachers)
  const info = (
    <div className='bg-white rounded-md p-4 border'>
      <Meta
        avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
        title='Sanjar Ahmedov'
        description='Faol'
      />
      <div className='border-b mb-2 md:mb-4'>
        <label className='text-xs text-slate-400'>Balans</label>
        <p>150 000.00 UZS</p>
      </div>
      <div className='border-b mb-2 md:mb-4'>
        <label className='text-xs text-slate-400'>
          Qachon ro'yxatga olingan
        </label>
        <p>11.10.2022</p>
      </div>
      <div className='border-b mb-2 md:mb-4'>
        <label className='text-xs text-slate-400'>Qo'shimcha</label>
        <p>Sinov darsidan keyin keldi</p>
      </div>
      <div className='text-right'>
        <Link className='flex items-center gap-2'>
          Profilga o'tish <ArrowRight className='text-xs' />
        </Link>
      </div>
    </div>
  )
  const columns = [
    {
      key: '1',
      title: 'Guruhlar soni',
      dataIndex: 'id',
      fixed: 'top'
    },
    {
      key: '2',
      title: "O'quvchilar soni",
      dataIndex: 'name',
      fixed: 'top'
    },
    {
      key: '3',
      title: 'Darslar soni',
      dataIndex: 'phone',
      fixed: 'top'
    },
    {
      key: '4',
      title: "Maosh miqdori: so'm",
      dataIndex: 'address',
      fixed: 'top'
    }
  ]
  return (
    <Tabs>
      <Tabs.TabPane tab='Profil' key='item-1' className='pt-20'>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
          <div>
            <Card className='md:p-4 mb-4 rounded-sm drop-shadow-md'>
              <div className='flex text-center flex-col items-center mb-4'>
                <img
                  alt=''
                  src={teachersData?.photo ? teachersData?.photo : photo}
                  className='w-32 h-32 mx-auto rounded-sm -mt-28 mb-4'
                />
                <p className='text-xl font-bold mb-4 text-slate-700'>
                  {teachersData?.name}
                </p>
              </div>

              <div className='grid md:grid-cols-2 mb-2 md:mb-4'>
                <label className='text-slate-600'>Telefon raqam:</label>
                <p>{teachersData?.phone}</p>
              </div>
              <div className='grid mb-2 md:mb-4'>
                <label className='text-slate-600 mb-1'>Rollar:</label>
                <div className='flex flex-wrap gap-2'>
                  <span className='px-2 py-0.5 rounded-md text-violet-500 border border-violet-500 text-sm'>
                    CEO
                  </span>
                  <span className='px-2 py-0.5 rounded-md text-violet-500 border border-violet-500 text-sm'>
                    English teacher
                  </span>
                  <span className='px-2 py-0.5 rounded-md text-violet-500 border border-violet-500 text-sm'>
                    Accounter
                  </span>
                </div>
              </div>
              <div className='grid mb-2 md:mb-4'>
                <label className='text-slate-600 mb-1'>Qaysi filial:</label>
                <div className='flex flex-wrap gap-2'>
                  <span className='px-2 py-0.5 rounded-md text-cyan-500 border border-cyan-500 text-sm'>
                    Saodat
                  </span>
                </div>
              </div>
            </Card>
          </div>
          <div>
            <p className='text-xl font-bold mb-4'>Guruhlar</p>
            <div className='grid gap-2'>
              <div className='rounded-sm flex flex-wrap gap-4 bg-orange-50 p-4 justify-between items-center'>
                <div className='grid gap-0.5'>
                  <div>
                    <span className='py-0.5 px-2 bg-orange-200 rounded-sm text-xs text-center'>
                      tesla
                    </span>
                  </div>
                  <span className='font-bold text-md'>Android 12-guruh</span>
                </div>
                <div className='grid gap-0.5 text-xs'>
                  <span>Toq kunlar</span>
                  <span>02.11.2022 - 12.12.2022</span>
                  <span>14:00</span>
                </div>
                <div>
                  <span className='bg-orange-500 rounded-sm text-white px-1 py-0.5'>
                    12
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className='text-xl font-bold mb-4'>Guruh haqida</p>
            <div className='rounded-sm bg-white p-4 drop-shadow'>
              <div className='grid md:grid-cols-2 border-b mb-2 md:mb-4'>
                <label className='font-bold'>Guruh nomi:</label>
                <p className='text-slate-400'>Android 12</p>
              </div>
              <div className='grid md:grid-cols-2 border-b mb-2 md:mb-4'>
                <label className='font-bold'>O'qituvchi:</label>
                <p className='text-slate-400'>Umar Bek</p>
              </div>
              <div className='grid md:grid-cols-2 border-b mb-2 md:mb-4'>
                <label className='font-bold'>Qaysi filial:</label>
                <p className='text-slate-400'>Saodat Learning Center</p>
              </div>
              <p className='font-bold mt-4 mb-2'>O'quvchilar ro'yxati</p>
              <div className='text-xs text-slate-400 '>
                <div className='grid md:grid-cols-2 border-b md:border-b-0 mb-2'>
                  <Dropdown overlay={info}>
                    <a onClick={e => e.preventDefault()}>
                      <Space>Sanjar Ahmedov</Space>
                    </a>
                  </Dropdown>
                  <p>+998 90 002 02 02</p>
                </div>
                <div className='grid md:grid-cols-2 border-b md:border-b-0 mb-2'>
                  <Dropdown overlay={info}>
                    <a onClick={e => e.preventDefault()}>
                      <Space>Toshpo'lat Ahmedov</Space>
                    </a>
                  </Dropdown>
                  <p>+998 90 002 02 02</p>
                </div>
              </div>
              <div className='text-right mt-4'>
                <Link className='flex gap-2 items-center justify-end'>
                  Guruhga o'tish <ArrowRight className='text-xs' />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Tabs.TabPane>
      <Tabs.TabPane tab='Ish haqi' key='item-2'>
        <Table
          columns={columns}
          className='overflow-auto'
          rowKey={uuidv4()}
        ></Table>
      </Tabs.TabPane>
    </Tabs>
  )
}
