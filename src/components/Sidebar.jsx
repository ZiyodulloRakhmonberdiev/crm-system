import { PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'
import { Input, Layout, Menu, Modal } from 'antd'
import { useState } from 'react'
import {
  CashStack,
  Download,
  MicrosoftTeams,
  Mortarboard,
  PlusCircle,
  Search
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
  const [isOpenSearchModal, setIsOpenSearchModal] = useState(false)
  const items = [
    getItem('Hisob', 'account', <UserOutlined />, [
      getItem('Mening hisobim', 'myAccount'),
      getItem('Chiqish', 'exit')
    ]),
    getItem(`Qo'shish`, 'add', <PlusCircle />, [
      getItem(`User qo'shish`, 'user'),
      getItem(`To'lov qo'shish`, 'payment')
    ]),
    getItem('Arizalar', 'application', <Download />),
    getItem(<Link to='/students'>O'quvchilar</Link>, 'pupils', <Mortarboard />),
    getItem(
      <Link to='/teachers'>O'qituvchilar</Link>,
      'teachers',
      <MicrosoftTeams />
    ),
    getItem(<Link to='/groups'>Guruhlar</Link>, 'groups', <TeamOutlined />),
    getItem(<Link to='/finance'>Moliya</Link>, 'finance', <CashStack />),
    getItem('Hisobot', 'report', <PieChartOutlined />),
    getItem(
      <span
        onClick={() => {
          setIsOpenSearchModal(!isOpenSearchModal)
        }}
      >
        Qidiruv
      </span>,
      'search',
      <Search
        onClick={() => {
          setIsOpenSearchModal(!isOpenSearchModal)
        }}
      />
    )
  ]

  // Modal Search Function
  const resetEditing = () => {
    setIsOpenSearchModal(false)
  }
  return (
    <Layout>
      <Sider
        breakpoint='lg'
        collapsedWidth='56'
        onBreakpoint={broken => {
          console.log(broken)
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type)
        }}
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
      <Modal
        title='Qidirish'
        visible={isOpenSearchModal}
        okText={<span className='text-sky-500 hover:text-white'>Qidirish</span>}
        onCancel={() => {
          resetEditing()
        }}
      >
        <Input placeholder='Qidirish' className='mb-2' />
      </Modal>
    </Layout>
  )
}
