import { PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'
import { Input, Layout, Menu, Modal } from 'antd'
import { useState } from 'react'
import {
  CashStack,
  Download,
  MicrosoftTeams,
  Mortarboard,
  PlusCircle,
  Search,
  House,
  Wallet2,
  DoorOpen,
  Layers,
  Palette2
} from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'

export default function Sidebar () {
  function getItem (label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label
    }
  }
  const { Sider } = Layout
  const items = [
    getItem(<Link to='/'>Главная страница</Link>, 'home', <House />),
    getItem(<Link to='/leads'>Заявки</Link>, 'application', <Download />),
    getItem(<Link to='/students'>Студенты</Link>, 'pupils', <Mortarboard />),
    getItem(
      <Link to='/teachers'>Учителя</Link>,
      'teachers',
      <MicrosoftTeams />
    ),
    getItem(<Link to='/groups'>Группы</Link>, 'groups', <TeamOutlined />),
    getItem(<Link to='/finance'>Финансы</Link>, 'finance', <CashStack />),
    getItem(<Link to='/report'>Отчеты</Link>, 'report', <PieChartOutlined />),
    getItem('Дополнительные', 'addition', <Wallet2 />, [
      getItem(
        <Link className='flex items-center justify-start gap-3' to='/employees'>
          <Layers /> Сотрудники
        </Link>,
        'employees'
      ),
      getItem(
        <Link className='flex items-center justify-start gap-3' to='/courses'>
          <Palette2 /> Курсы
        </Link>,
        'courses'
      ),
      getItem(
        <Link className='flex items-center justify-start gap-3' to='/rooms'>
          <DoorOpen /> Кабинеты
        </Link>,
        'rooms'
      )
    ])
  ]

  return (
    <Layout>
      <Sider
        breakpoint='lg'
        collapsedWidth='56'
        style={{ height: '100vh' }}
        className='mt-14 pt-4 fixed overflow-y-scroll pb-24'
      >
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={['4']}
          items={items}
        />
      </Sider>
    </Layout>
  )
}
