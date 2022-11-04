import { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { Button, Table, Input, Modal, Space, Drawer, Pagination } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words'

import { PencilSquare, Trash, MicrosoftTeams } from 'react-bootstrap-icons'
import { MyButton } from '../../UI/Button.style'
import { IconButton } from '../../UI/IconButton.style'
import axios from '../../axios/axios'

import {
  fetchingTeachers,
  fetchedTeachers,
  fetchedError,
  setTeachersData
} from '../../redux/teachersSlice'

import AddTeacherForm from './AddTeacherForm'

export default function Teachers () {
  // Search functions which is in the heading on the table
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef(null)
  const [isEditing, setIsEditing] = useState(false)

  const [editingTeacher, setEditingTeacher] = useState(null)
  const [visible, setVisible] = useState(false)

  const [modalType, setModalType] = useState('add')
  const [currentPage, setCurrentPage] = useState(1)
  const [per_page, setPerPage] = useState(30)
  const [last_page, setLastPage] = useState(1)
  const dispatch = useDispatch()

  const { teachers, loading, error, refreshTeachers } = useSelector(
    state => state.teachers
  )

  // teachers static data
  let dataSource = []
  teachers?.map(item => {
    dataSource?.push({
      id: item?.id,
      name: item?.name,
      name: (
        <Link
          to={`/teachers/profile/${item.id}`}
          onClick={() => dispatch(setTeachersData(item))}
        >
          {item?.name}
        </Link>
      ),
      phone: item?.phone?.toLocaleString(),
      gender: item?.gender,
      actions: (
        <div className='flex gap-2'>
          <IconButton
            color='primary'
            onClick={() => {
              onEditTeacher(item)
            }}
          >
            <PencilSquare />
          </IconButton>
          <IconButton
            color='danger'
            onClick={() => {
              onEditTeacher(item)
            }}
          >
            <Trash />
          </IconButton>
        </div>
      )
    })
  })
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
      title: 'Telefon',
      dataIndex: 'phone',
      fixed: 'top',
      ...getColumnSearchProps('phone')
    },
    {
      key: '4',
      title: 'Amallar',
      width: 120,
      dataIndex: 'actions'
    }
  ]
  // Actions with table
  const onDeleteStudent = record => {
    Modal.confirm({
      title: "O'chirilsinmi?",
      okText: 'Ha',
      okType: 'danger',
      cancelText: "Yo'q"
      // onOk: () => {
      //   setDataSource(pre => {
      //     return pre.filter(teacher => teacher.id !== record.id)
      //   })
      // }
    })
  }

  const onEditTeacher = teacher => {
    setModalType('update')
    setVisible(true)
    setIsEditing(true)
    setEditingTeacher({ ...teacher })
  }

  const resetEditing = () => {
    setIsEditing(false)
    setEditingTeacher(null)
  }

  // fetching teachers
  useEffect(() => {
    dispatch(fetchingTeachers())
    axios
      .get(`/api/teachers?page=${currentPage}`)
      .then(res => {
        dispatch(fetchedTeachers(res?.data?.data?.data))
      })
      .catch(err => {
        dispatch(fetchedError())
      })
  }, [refreshTeachers, currentPage])
  return (
    <div>
      <div className='bg-white flex flex-col md:flex-row p-4 rounded-lg items-center justify-start mb-8 gap-4'>
        <div className='text-2xl text-violet-400 bg-violet-50 p-2 rounded-md'>
          <MicrosoftTeams />
        </div>
        <p className='text-violet-400 text-2xl'>O'qituvchilar</p>
        <p className='text-violet-400'>Jami: 24 ta</p>
      </div>
      <MyButton
        onClick={() => {
          setVisible(!visible)
          setModalType('add')
        }}
        className='my-4'
      >
        Yangi o'qituvchi qo'shish
      </MyButton>
      <Drawer
        open={visible}
        title={
          modalType === 'add'
            ? "Yangi o'quvchi qo'shish"
            : "O'quvchini yangilash"
        }
        onClose={() => {
          setVisible(!visible)
        }}
        maskClosable={true}
      >
        <AddTeacherForm
          modalType={modalType}
          editingTeacher={editingTeacher}
          visible={visible}
          setVisible={() => setVisible(false)}
        />
      </Drawer>
      <Table
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        scroll={{
          x: 1000,
          y: 400
        }}
      ></Table>
      <br />
      <center>
        <Pagination
          pageSize={per_page ? per_page : 30}
          total={last_page * per_page}
          current={currentPage}
          onChange={(page, x) => {
            setCurrentPage(page)
            setPerPage(x)
          }}
        />
      </center>
    </div>
  )
}
