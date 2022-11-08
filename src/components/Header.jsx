import { Dropdown, Menu, Space, Input, Spin } from 'antd'
import { BookmarkPlus, CashStack, Person } from 'react-bootstrap-icons'
import { Select } from 'antd'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import logo from '../assets/img/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import axios from '../axios/axios'
import {
  fetchedBranches,
  fetchingBranches,
  setSelectedBranch
} from '../redux/branchesSlice'
import { logout } from '../redux/loginSlice'
export default function Header () {
  const { branches, loading, selected_branch } = useSelector(
    state => state.branches
  )
  const dispatch = useDispatch()
  const { Option } = Select
  const navigate = useNavigate()
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
          label: <a onClick={() => {
            dispatch(logout())
            localStorage.removeItem("crm_token")
            navigate("/login", { replace: true })
          }} >Chiqish</a>,
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

  useEffect(() => {
    dispatch(fetchingBranches())
    axios.get('/api/branches').then(res => {
      dispatch(fetchedBranches(res.data.data))
      dispatch(setSelectedBranch(res.data.data[0]))
    })
  }, [])

  return (
    <header
      style={{
        width: '100%',
        maxWidth: 1920
      }}
      className='fixed bg-white h-14 flex align-center px-4 lg:px-8 z-20 border-b'
    >
      <div className='flex justify-between items-center container'>
        <div className='flex align-center justify-between'>
          <Link to='/' className='flex align-center h-auto'>
            <img src={logo} alt='' className='w-32' />
          </Link>
          <Spin spinning={loading}>
            <Select
              loading={loading}
              value={selected_branch?.id}
              style={{ backgroundColor: 'transparent' }}
              className='w-32 lg:w-44 ml-8 lg:ml-4'
              bordered={false}
              onChange={e => {
                dispatch(setSelectedBranch(e))
              }}
            >
              {branches?.map(item => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Spin>
        </div>
        <div className='w-42 hidden lg:block'>
          <Input.Search
            placeholder='Qidirish...'
            allowClear
            className='min-w-[250px]'
          />
        </div>
        <div className='hidden lg:flex space-x-2 md:space-x-4'>
          <Dropdown overlay={menu} trigger={['click']}>
            <a onClick={e => e.preventDefault()}>
              <Space className='p-2 rounded-full border border-green-400 text-green-400 hover:bg-green-400 hover:text-white transition font-bold'>
                <BookmarkPlus className='text-xl' />
              </Space>
            </a>
          </Dropdown>
          <Dropdown overlay={payment} trigger={['click']}>
            <a onClick={e => e.preventDefault()}>
              <Space className='p-2 rounded-full border border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white transition'>
                <CashStack className='text-xl' />
              </Space>
            </a>
          </Dropdown>
          <Dropdown overlay={account} trigger={['click']}>
            <a onClick={e => e.preventDefault()}>
              <Space className='border border-slate-500 rounded-full p-2 bg-slate-500 text-white hover:bg-white hover:text-slate-400 transition'>
                <Person className='text-xl' />
              </Space>
            </a>
          </Dropdown>
        </div>
      </div>
    </header>
  )
}
