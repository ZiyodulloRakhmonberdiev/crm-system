import { SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words'
import { Button, Table, Modal, Input, Space, Divider } from 'antd'
import { useRef, useState } from 'react'
import { PencilSquare, Trash } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'

export default function Teachers () {
  // Search functions which is in the heading on the table
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)
  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      name: <Link to='/teachers/profile'>Anvar Akbarxodjaev</Link>,
      email: 'anvar@gmail.com',
      phone: '+998906706555'
    },
    {
      id: 2,
      name: <Link to='/teachers/profile'>Anvar Akbarxodjaev</Link>,
      email: 'anvar@gmail.com',
      phone: '+998906706555'
    },
    {
      id: 3,
      name: <Link to='/teachers/profile'>Anvar Akbarxodjaev</Link>,
      email: 'anvar@gmail.com',
      phone: '+998906706555'
    },
    {
      id: 4,
      name: <Link to='/teachers/profile'>Anvar Akbarxodjaev</Link>,
      email: 'anvar@gmail.com',
      phone: '+998906706555'
    },
    {
      id: 5,
      name: <Link to='/teachers/profile'>Anvar Akbarxodjaev</Link>,
      email: 'anvar@gmail.com',
      phone: '+998906706555'
    }
  ])
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }
  const handleReset = clearFilters => {
    clearFilters()
    setSearchText('')
  }
  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div
        style={{
          padding: 8
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block'
          }}
        />
        <Space>
          <Button
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size='small'
            style={{
              width: 90
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size='small'
            style={{
              width: 90
            }}
          >
            Reset
          </Button>
          <Button
            type='link'
            size='small'
            onClick={() => {
              confirm({
                closeDropdown: false
              })
              setSearchText(selectedKeys[0])
              setSearchedColumn(dataIndex)
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownOpenChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100)
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      )
  })

  // Table headers
  const columns = [
    {
      key: '1',
      title: 'ID',
      dataIndex: 'id',
      width: 80
    },
    {
      key: '2',
      title: 'Ism',
      dataIndex: 'name',
      fixed: 'top',
      ...getColumnSearchProps('name')
    },
    {
      key: '3',
      title: 'Email',
      dataIndex: 'email',
      fixed: 'top',
      ...getColumnSearchProps('email')
    },
    {
      key: '4',
      title: 'Telefon',
      dataIndex: 'phone',
      fixed: 'top',
      ...getColumnSearchProps('phone')
    },
    {
      key: '5',
      title: 'Amallar',
      width: 270,
      fixed: 'top',
      render: record => {
        return (
          <div className='flex gap-2 flex-wrap'>
            <button
              className='flex items-center rounded-full p-2 mr-6 hover:mr-0 lg:mr-0 relative hover:pl-9 lg:pl-9 hover:bg-blue-500 transition-all w-0 hover:w-auto lg:w-auto lg:bg-blue-400'
              onClick={() => {
                onEditStudent(record)
              }}
            >
              <span className='p-2 rounded-full bg-white flex items-center justify-center mr-2 absolute left-0 border border-blue-400 inset-y-0 '>
                <PencilSquare className='text-blue-500' />
              </span>
              <span className='text-white text-xs'>Tahrirlash</span>
            </button>
            <button
              className='flex items-center rounded-full p-2 relative hover:pl-9 lg:pl-9 hover:bg-red-500 transition-all w-0 hover:w-auto lg:w-auto lg:bg-red-400'
              onClick={() => {
                onDeleteStudent(record)
              }}
            >
              <span className='p-2 rounded-full bg-white flex items-center justify-center mr-2 absolute -left-px inset-y-0 border border-red-400'>
                <Trash className='text-red-500' />
              </span>
              <span className='text-white text-xs'>O'chirish</span>
            </button>
          </div>
        )
      }
    }
  ]
  // Actions with table
  const onAddStudent = () => {
    const randomNumber = parseInt(Math.random() * 1000)
    const newStudent = {
      id: randomNumber,
      name: 'Name ' + randomNumber,
      email: randomNumber + '@gmail.com',
      address: 'Address ' + randomNumber
    }
    setDataSource(pre => {
      return [...pre, newStudent]
    })
  }
  const onDeleteStudent = record => {
    Modal.confirm({
      title: "O'chirilsinmi?",
      okText: 'Ha',
      okType: 'danger',
      cancelText: "Yo'q",
      onOk: () => {
        setDataSource(pre => {
          return pre.filter(student => student.id !== record.id)
        })
      }
    })
  }
  const onEditStudent = record => {
    setIsEditing(true)
    setEditingStudent({ ...record })
  }
  const resetEditing = () => {
    setIsEditing(false)
    setEditingStudent(null)
  }

  // Add a new teacher
  const [openModal, setOpenModal] = useState(false)
  const handleModal = () => {
    setOpenModal(!openModal)
  }
  return (
    <div>
      <Divider orientation='center'>
        <span className='text-2xl'>O'qituvchilar</span>
      </Divider>
      <button
        onClick={handleModal}
        className='my-4 py-2 px-4 lg:py-4 lg:px-8 rounded-full bg-blue-400 hover:bg-blue-500 text-white transition'
      >
        Yangi o'qituvchi qo'shish
      </button>
      {/* This Modal for adding new teacher */}
      <Modal
        title="Yangi o'qituvchi qo'shish"
        visible={openModal}
        okText="Qo'shish"
        cancelText='Yopish'
        onCancel={() => {
          handleModal()
        }}
      >
        <Input placeholder='Ism Familiya' className='mb-2' />
        <Input placeholder='Email' className='mb-2' />
        <Input placeholder='Telefon raqam' className='mb-2' />
      </Modal>
      <Table
        columns={columns}
        dataSource={dataSource}
        scroll={{
          x: 1000,
          y: 400
        }}
      ></Table>

      {/* This modal for editing teacher */}
      <Modal
        title='Tahrirlash'
        visible={isEditing}
        okText='Saqlash'
        cancelText='Yopish'
        onCancel={() => {
          resetEditing()
        }}
        onOk={() => {
          setDataSource(pre => {
            return pre.map(student => {
              if (student.id === editingStudent.id) {
                return editingStudent
              } else {
                return student
              }
            })
          })
          resetEditing()
        }}
      >
        <Input
          value={editingStudent?.name}
          onChange={e => {
            setEditingStudent(pre => {
              return { ...pre, name: e.target.value }
            })
          }}
          className='mb-2'
        />
        <Input
          value={editingStudent?.email}
          onChange={e => {
            setEditingStudent(pre => {
              return { ...pre, email: e.target.value }
            })
          }}
          className='mb-2'
        />
        <Input
          value={editingStudent?.phone}
          onChange={e => {
            setEditingStudent(pre => {
              return { ...pre, phone: e.target.value }
            })
          }}
        />
      </Modal>
    </div>
  )
}
