import { Card, Dropdown, Space, Avatar, Tabs } from 'antd'
import { ArrowRight } from 'react-bootstrap-icons'
import photo from './../assets/img/teacher.png'
import { Link } from 'react-router-dom'
export default function TeacherProfile () {
  const { Meta } = Card
  const info = (
    <div className='bg-white rounded-md p-4 border'>
      <Meta
        avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
        title='Sanjar Ahmedov'
        description='Active'
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
        <Link>Profilga o'tish</Link>
      </div>
    </div>
  )
  return (
    <Tabs>
      <Tabs.TabPane tab='Profil' key='item-1'>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
          <div>
            <Card
              className='p-4 md:p-8 pb-0 mb-4 rounded-lg'
              cover={<img alt='' src={photo} />}
            >
              <p className='text-xl font-bold mb-4'>Kamolov Bobur</p>
              <div className='grid md:grid-cols-2 border-b mb-2 md:mb-4'>
                <label className='font-bold'>Telefon raqam:</label>
                <p>(91) 670 85 85</p>
              </div>
              <div className='grid md:grid-cols-2 border-b mb-2 md:mb-4'>
                <label className='font-bold'>Sohasi:</label>
                <p>English Teacher</p>
              </div>
              <div className='grid md:grid-cols-2 border-b mb-2 md:mb-4'>
                <label className='font-bold'>Qaysi filial:</label>
                <p>Saodat Learning Center</p>
              </div>
            </Card>
          </div>
          <div>
            <p className='text-xl font-bold mb-4'>Guruhlar</p>
            <div className='grid gap-2'>
              <div className='rounded-sm grid sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-white p-4 text-xs'>
                <span>Android</span>
                <span>Toq kunlar</span>
                <span>14:00</span>
                <span>12 o'quvchi</span>
              </div>
              <div className='rounded-sm grid sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-white p-4 text-xs'>
                <span>Pre-Intermediate</span>
                <span>Juft kunlar</span>
                <span>09:00</span>
                <span>5 o'quvchi</span>
              </div>
              <div className='rounded-sm grid sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-white p-4 text-xs'>
                <span>Flutter</span>
                <span>Toq kunlar</span>
                <span>16:00</span>
                <span>24 o'quvchi</span>
              </div>
            </div>
          </div>
          <div>
            <p className='text-xl font-bold mb-4'>Guruh haqida</p>
            <div className='rounded-lg bg-white p-4'>
              <div className='grid md:grid-cols-2 border-b mb-2 md:mb-4'>
                <label className='font-bold'>Guruh nomi:</label>
                <p className='text-slate-400'>Android 12</p>
              </div>
              <div className='grid md:grid-cols-2 border-b mb-2 md:mb-4'>
                <label className='font-bold'>Sohasi:</label>
                <p className='text-slate-400'>English Teacher</p>
              </div>
              <div className='grid md:grid-cols-2 border-b mb-2 md:mb-4'>
                <label className='font-bold'>Qaysi filial:</label>
                <p className='text-slate-400'>Saodat Learning Center</p>
              </div>
              <p className='font-bold mt-4 mb-2'>O'quvchilar ro'yxati</p>
              <div className='text-xs text-slate-400'>
                <div className='grid grid-cols-2 mb-2'>
                  <Dropdown overlay={info}>
                    <a onClick={e => e.preventDefault()}>
                      <Space>Sanjar Ahmedov</Space>
                    </a>
                  </Dropdown>
                  <p>+998 90 002 02 02</p>
                </div>
                <div className='grid grid-cols-2 mb-2'>
                  <Dropdown overlay={info}>
                    <a onClick={e => e.preventDefault()}>
                      <Space>Toshpo'lat Ahmedov</Space>
                    </a>
                  </Dropdown>
                  <p>+998 90 002 02 02</p>
                </div>
                <div className='grid grid-cols-2 mb-2'>
                  <Dropdown overlay={info}>
                    <a onClick={e => e.preventDefault()}>
                      <Space>Ikrom Ahmedov</Space>
                    </a>
                  </Dropdown>
                  <p>+998 90 002 02 02</p>
                </div>
                <div className='grid grid-cols-2 mb-2'>
                  <Dropdown overlay={info}>
                    <a onClick={e => e.preventDefault()}>
                      <Space>Umid Ahmedov</Space>
                    </a>
                  </Dropdown>
                  <p>+998 90 002 02 02</p>
                </div>
                <div className='grid grid-cols-2 mb-2'>
                  <Dropdown overlay={info}>
                    <a onClick={e => e.preventDefault()}>
                      <Space>Sanjar Ahmedov</Space>
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
        <div className='bg-white p-4 rounded-sm grid md:grid-cols-4'>
          <div className='block p-6 border-b md:border-b-0 md:border-r'>
            <label className='font-bold mb-2'>Guruhlar soni</label>
            <p>6</p>
          </div>
          <div className='block p-6 border-b md:border-b-0 md:border-r'>
            <label className='font-bold mb-2'>O'quvchilar soni</label>
            <p>52</p>
          </div>
          <div className='block p-6 border-b md:border-b-0 md:border-r'>
            <label className='font-bold mb-2'>Darslar soni</label>
            <p>146 soat</p>
          </div>
          <div className='block p-6 border-b md:border-b-0'>
            <label className='font-bold mb-2'>Maosh so'm</label>
            <p>12 000 000 so'm</p>
          </div>
        </div>
      </Tabs.TabPane>
    </Tabs>
  )
}
