import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

import { Table, Modal, Input, Select, Drawer, Pagination } from 'antd'
import { PencilSquare, Trash, Mortarboard } from 'react-bootstrap-icons'

import axios from '../../axios/axios'
import { MyButton } from '../../UI/Button.style'
import { IconButton } from '../../UI/IconButton.style'
import AddStudentForm from './AddStudentForm'

import {
  fetchingStudents,
  fetchedStudents,
  fetchedError,
  setUserData
} from '../../redux/studentsSlice'

export default function Students () {
  // all states
  const [searchText, setSearchText] = useState('')
  const [editingStudent, setEditingStudent] = useState(null)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [visible, setVisible] = useState(false)

  const [modalType, setModalType] = useState('add')
  const [currentPage, setCurrentPage] = useState(1)
  const [per_page, setPerPage] = useState(30)
  const [last_page, setLastPage] = useState(1)
  const dispatch = useDispatch()
  const { students, loading, error, refreshStudents } = useSelector(
    state => state.students
  )

  // Multi Select inputs
  const courses = [
    'English',
    'Russian',
    'MobileDev',
    'WebDev',
    'SMM',
    'Python',
    'PHP'
  ]
  const finance = [
    'Bu oy to`lagan',
    'Qarzdor',
    'Qarzdor emas',
    'Chegirmasi mavjud',
    'Balansida pul bor'
  ]

  // Table select functions
  const onSelectChange = newSelectedRowKeys => {
    setSelectedRowKeys(newSelectedRowKeys)
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  }

  // students static data
  let dataSource = []
  students?.map(item => {
    dataSource?.push({
      id: item?.id,
      uid: uuidv4(),
      firstName: item?.first_name,
      lastName: item?.last_name,
      name: (
        <Link
          to={`/students/profile/${item.id}`}
          onClick={() => dispatch(setUserData(item))}
        >
          {item?.first_name + ' ' + item?.last_name}
        </Link>
      ),
      phone: item?.phone?.toLocaleString(),
      address: item?.address,
      birthday: item?.birthday,
      gender: item?.gender,
      additionPhone: item?.addition_phone?.map(phone => phone?.name),
      actions: (
        <div className='flex gap-2'>
          <IconButton
            color='primary'
            onClick={() => {
              onEditStudent(item)
            }}
          >
            <PencilSquare />
          </IconButton>
          <IconButton
            color='danger'
            onClick={() => {
              onDeleteStudent(item)
            }}
          >
            <Trash />
          </IconButton>
        </div>
      )
    })
  })

  // Table headers
  const columns = [
    {
      key: '1',
      title: 'ID',
      dataIndex: 'id',
      width: 80,
      render: record => {
        return <span className='pl-1'>{record}</span>
      }
    },
    {
      key: '2',
      title: 'Ism',
      dataIndex: 'name',
      fixed: 'top',
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          String(record.name)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.email)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.phone)
            .toLowerCase()
            .includes(value.toLowerCase())
        )
      }
    },
    {
      key: '3',
      title: 'Telefon',
      dataIndex: 'phone',
      fixed: 'top'
    },
    {
      key: '4',
      title: 'Manzil',
      dataIndex: 'address',
      fixed: 'top'
    },
    {
      key: '5',
      title: 'Amallar',
      fixed: 'top',
      width: 120,
      dataIndex: 'actions'
    }
  ]

  const onDeleteStudent = record => {
    Modal.confirm({
      title: "O'chirilsinmi?",
      okText: 'Ha',
      okType: 'danger',
      cancelText: "Yo'q"
      // onOk: () => {
      //   setDataSource(pre => {
      //     return pre.filter(student => student.id !== record.id)
      //   })
      // }
    })
  }
  const onEditStudent = student => {
    setModalType('update')
    setVisible(true)
    setEditingStudent({ ...student })
  }

  // fetching students
  useEffect(() => {
    dispatch(fetchingStudents())
    axios
      .get(`/api/students?page=${currentPage}`)
      .then(res => {
        dispatch(fetchedStudents(res?.data?.data?.data))
      })
      .catch(err => {
        dispatch(fetchedError())
      })
  }, [refreshStudents, currentPage])
  return (
    <div>
      <header className='bg-white flex flex-wrap flex-col md:flex-row p-4 rounded-lg items-center justify-start mb-8 gap-4'>
        <div className='text-2xl text-cyan-400 bg-cyan-50 p-2 rounded-md'>
          <Mortarboard />
        </div>
        <p className='text-cyan-400 text-2xl'>O'quvchilar</p>
        <p className='text-cyan-400'>Jami: {students.length} ta</p>
        <MyButton
          onClick={() => {
            setVisible(!visible)
            setModalType('add')
          }}
          className='md:ml-auto'
        >
          Yangi o'quvchi qo'shish
        </MyButton>
      </header>
      <div className='flex flex-wrap gap-2 mb-8'>
        <div className='w-42'>
          <Input.Search
            placeholder='Qidirish - ism, email, telefon'
            onSearch={value => {
              setSearchText(value)
            }}
            onChange={e => {
              setSearchText(e.target.value)
            }}
            allowClear
            className='min-w-[200px] md:min-w-[250px] sm:pr-8'
          />
        </div>
        <Select
          mode='multiple'
          maxTagCount={2}
          className='min-w-[200px]'
          placeholder="Kurslar bo'yicha"
          allowClear
        >
          {courses.map((course, index) => {
            return (
              <Select.Option key={index} value={course}>
                {course}
              </Select.Option>
            )
          })}
        </Select>
        <Select
          mode='multiple'
          placeholder='Moliyaviy holati'
          maxTagCount={2}
          allowClear
          className='min-w-[200px]'
        >
          {finance.map((item, index) => {
            return (
              <Select.Option key={index} value={item}>
                {item}
              </Select.Option>
            )
          })}
        </Select>
      </div>
      {/* Add a new student with Drawer */}
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
        <AddStudentForm
          modalType={modalType}
          editingStudent={editingStudent}
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
        rowSelection={rowSelection}
        className='overflow-auto'
        pagination={false}
        rowKey={record => record.uid}
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
