import { Dropdown, Menu, Space } from 'antd'
import { BookmarkPlus, CashStack, Person } from 'react-bootstrap-icons'
import { Select } from 'antd'
import { Link } from 'react-router-dom'
import logo from '../assets/img/logo.png'
import SearchInput from './SearchInput'

export default function Header () {
  const { Option } = Select

  const menu = (
    <Menu
      items={[
        {
          label: <a href=''>Yangi a'zo qo'shish</a>,
          key: '0'
        }
      ]}
    />
  )
  const account = (
    <Menu
      items={[
        {
          label: <a href=''>Mening hisobim</a>,
          key: '0'
        },
        {
          label: <a href=''>Chiqish</a>,
          key: '1'
        }
      ]}
    />
  )
  const payment = (
    <Menu
      items={[
        {
          label: <a href=''>To'lovni kiritish</a>,
          key: '0'
        }
      ]}
    />
  )
  return (
    <header
      style={{
        width: '100%',
        maxWidth: 1920
      }}
      className='fixed bg-white h-14 flex align-center px-4 lg:px-8 z-20'
    >
      <div className='flex justify-between items-center container'>
        <div className='flex align-center justify-between'>
          <Link to='/' className='flex align-center h-auto'>
            <img src={logo} alt='' className='w-32' />
          </Link>
          <Select
            labelInValue
            defaultValue={{ value: 'demo', label: 'DEMO VERSION' }}
            style={{ backgroundColor: 'transparent' }}
            className='w-32 lg:w-44 ml-8 lg:ml-4'
            bordered={false}
          >
            <Option value='demo'>DEMO VERSION</Option>
            <Option value='chilanzar'>Chilonzor filiali</Option>
            <Option value='margilan'>Marg'ilon filiali</Option>
            <Option value='urgut'>Urgut filiali</Option>
          </Select>
        </div>
        <div className='hidden lg:block'>
          <SearchInput />
        </div>
        <div className='hidden lg:flex space-x-2 md:space-x-4'>
          <Dropdown overlay={menu} trigger={['click']}>
            <a onClick={e => e.preventDefault()}>
              <Space>
                <BookmarkPlus className='text-xl' />
              </Space>
            </a>
          </Dropdown>
          <Dropdown overlay={payment} trigger={['click']}>
            <a onClick={e => e.preventDefault()}>
              <Space>
                <CashStack className='text-xl' />
              </Space>
            </a>
          </Dropdown>
          <Dropdown overlay={account} trigger={['click']}>
            <a onClick={e => e.preventDefault()}>
              <Space>
                <Person className='text-xl' />
              </Space>
            </a>
          </Dropdown>
        </div>
      </div>
    </header>
  )
}
