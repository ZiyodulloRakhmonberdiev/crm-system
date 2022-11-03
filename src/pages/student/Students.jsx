import {
  Table,
  Modal,
  Input,
  Select,
  Drawer,
  DatePicker,
  Form,
  Radio,
  message
} from 'antd'
import { useState, useEffect } from 'react'
import {
  PencilSquare,
  Trash,
  Mortarboard,
  Telephone,
  Person
} from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import axios from '../../axios/axios'
import { MyButton } from '../../UI/Button.style'
import { IconButton } from '../../UI/IconButton.style'
import { useDispatch, useSelector } from 'react-redux'
import StudentProfile from './StudentProfile'

import {
  fetchingStudents,
  fetchedStudents,
  fetchedError,
  setUserData
} from '../../redux/studentsSlice'
import AddStudentForm from './AddStudentForm'

export default function Students () {
  // all states 
  // Search functions which is in the heading on the page
  const [searchText, setSearchText] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null) 
  // Add a new student
  const [formLoading, setFormLoading] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [address, setAddress] = useState('')
  const [additionPhone, setAdditionPhone] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  const [modalType, setModalType] = useState("add")

  const dispatch = useDispatch()
  const { students, loading, error, refreshStudents } = useSelector(state => state.students)

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
      firstName: item?.first_name,
      lastName: item?.last_name,
      name: (
        <Link to={`/students/profile/${item.id}`} onClick={() => dispatch(setUserData(item))}>
          {item?.first_name + ' ' + item?.last_name}
        </Link>
      ),
      phone: "+998 "+Number(item?.phone)?.toLocaleString(),
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
  students?.map(item => <StudentProfile item={item} />)

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
      width: 100,
      dataIndex: "actions"
    }
  ]
  // Actions with table
  const onAddStudent = async e => {
    e.preventDefault()
    // const
    const randomNumber = parseInt(Math.random() * 1000)
    // id: randomNumber,
    // birthday,
    // gender,
    const newStudent = {
      first_name: firstName,
      last_name: lastName,
      phone,
      password,
      address,
      addition_phone: additionPhone
    }
    await axios
      .post('/api/students', newStudent, {
        headers: {
          'Content-Type': 'application/json',
          'Content-Encoding': 'gzip',
          Vary: 'Authorization',
          'Access-Control-Allow-Origin': '*',
          'X-RateLimit-Remaining': '59',
          'X-RateLimit-Limit': '60',
          expires: '-1',
          pragma: 'no-cache',
          'Cache-Control': 'private, must-revalidate',
          'X-Powered-By': 'PHP/8.1.0',
          Server: 'nginx'
        },
        withCredentials: false
      })
      .then(response => {
        // setFirstName('')
        // setLastName('')
        // setPhone('')
        // setPassword('')
        // setAddress('')
        // setBirthday('')
        // setGender('')
        // setAdditionPhone('')
        message.success('Muvaffaqiyatli')
      })
      .catch(err => {
        message.error('Xatolik yuz berdi')
      })
      .finally(() => {
        setFormLoading(false)
      })
  }

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
    setModalType("update")
    setVisible(true)
    setIsEditing(true)
    setEditingStudent({ ...student })
    console.log(student)
  }
  const resetEditing = () => {
    setIsEditing(false)
    setEditingStudent(null)
  }

  // Add a new teacher
  const [visible, setVisible] = useState(false)

  // fetching students
  useEffect(() => {
    dispatch(fetchingStudents())
    axios
      .get('/api/students')
      .then(res => {
        dispatch(fetchedStudents(res?.data?.data?.data))
      })
      .catch(err => {
        dispatch(fetchedError())
      })
  }, [refreshStudents])
  return (
    <div>
      <div className='bg-white flex flex-col md:flex-row p-4 rounded-lg items-center justify-start mb-8 gap-4'>
        <div className='text-2xl text-cyan-400 bg-cyan-50 p-2 rounded-md'>
          <Mortarboard />
        </div>
        <p className='text-cyan-400 text-2xl'>O'quvchilar</p>
        <p className='text-cyan-400'>Jami: 312 ta</p>
      </div>
      <header className='flex flex-wrap gap-2 mb-8'>
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
        <MyButton
          onClick={() => {
            setVisible(!visible)
            setModalType("add")
          }}
          className='ml-auto'
        >
          Yangi o'quvchi qo'shish
        </MyButton>
      </header>
      {/* Add a new student with Drawer */}
      <Drawer
        open={visible}
        title={modalType === "add" ? "Yangi o'quvchi qo'shish" : "O'quvchini yangilash"}
        onClose={() => {
          setVisible(!visible)
        }}
        maskClosable={true}
      >
        <AddStudentForm modalType={modalType} editingStudent={editingStudent} visible={visible} setVisible={() => setVisible(false)} />
      </Drawer>
      <Table
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        size='small'
        scroll={{
          x: 1000,
          y: 400
        }}
        rowSelection={rowSelection}
        className='overflow-auto'
        pagination={false}
      ></Table> 
    </div>
  )
}
