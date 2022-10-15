import { PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import {
  CashStack,
  Download,
  MicrosoftTeams,
  Mortarboard,
  PlusCircle
} from 'react-bootstrap-icons'
import SearchInput from './SearchInput'

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
    getItem('Hisob', 'account', <UserOutlined />, [
      getItem('Mening hisobim', 'myAccount'),
      getItem('Chiqish', 'exit')
    ]),
    getItem('Qo`shish', 'add', <PlusCircle />, [
      getItem('User qo`shish', 'user'),
      getItem('To`lov qo`shish', 'payment')
    ]),
    getItem('Arizalar', 'application', <Download />),
    getItem('O`quvchilar', 'pupils', <Mortarboard />),
    getItem('O`qituvchilar', 'teachers', <MicrosoftTeams />),
    getItem('Guruhlar', 'groups', <TeamOutlined />),
    getItem('Moliya', 'finance', <CashStack />),
    getItem('Hisobot', 'report', <PieChartOutlined />)
  ]
  return (
    <Layout>
      <Sider
        breakpoint='lg'
        collapsedWidth='0'
        onBreakpoint={broken => {
          console.log(broken)
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type)
        }}
        style={{ minHeight: '100vh', height: '100%' }}
        className='mt-14 pt-4 absolute'
      >
        <div className='lg:hidden mt-2 lg:mt-0 w-40 mx-auto'>
          <SearchInput />
        </div>
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
