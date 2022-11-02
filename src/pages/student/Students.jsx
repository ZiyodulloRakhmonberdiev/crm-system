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
  fetchedError
} from '../../redux/studentsSlice'

export default function Students () {
  const dispatch = useDispatch()
  const { students, loading, error } = useSelector(state => state.students)

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
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
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
        <Link to={`/students/profile/${item.id}`}>
          {item?.first_name + ' ' + item?.last_name}
        </Link>
      ),
      phone: item?.phone,
      address: item?.address,
      birthday: item?.birthday,
      gender: item?.gender,
      additionPhone: item?.addition_phone?.map(phone => phone?.name)
    })
  })
  students?.map(item => <StudentProfile item={item} />)

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
  const [birthday, setBirthday] = useState('')
  const [gender, setGender] = useState('')
  const [additionPhone, setAdditionPhone] = useState([])
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
    // {
    //   key: '5',
    //   title: 'Kurslari',
    //   dataIndex: 'course',
    //   fixed: 'top'
    // render: record => {
    //   return (
    //     <div className='flex gap-1 flex-wrap'>
    //       {record.map(c => (
    //         <span className='border rounded-sm text-xs border-slate-100 p-0.5'>
    //           {c}
    //         </span>
    //       ))}
    //     </div>
    //   )
    // }
    // },
    // {
    //   key: '6',
    //   title: "O'qituvchilar",
    //   dataIndex: 'teachers',
    //   fixed: 'top'
    // render: record => {
    //   return (
    //     <div className='flex gap-1 flex-wrap'>
    //       {record.map(c => (
    //         <span className='border rounded-sm text-xs border-slate-100 p-0.5'>
    //           {c}
    //         </span>
    //       ))}
    //     </div>
    //   )
    // }
    // },
    // {
    //   key: '7',
    //   title: 'Balansi',
    //   dataIndex: 'balance',
    //   fixed: 'top'
    // },
    {
      key: '5',
      title: 'Amallar',
      width: 270,
      fixed: 'top',
      render: record => {
        return (
          <div className='flex gap-2'>
            <IconButton
              color='primary'
              onClick={() => {
                onEditStudent(record)
              }}
            >
              <PencilSquare />
            </IconButton>
            <IconButton
              color='danger'
              onClick={() => {
                onDeleteStudent(record)
              }}
            >
              <Trash />
            </IconButton>
          </div>
        )
      }
    }
  ]

  // Actions with table
  const onAddStudent = () => {
    // const
    const randomNumber = parseInt(Math.random() * 1000)
    const newStudent = {
      // id: randomNumber,
      first_name: firstName,
      last_name: lastName,
      phone,
      password,
      address,
      birthday,
      gender,
      addition_phone: additionPhone
    }
    axios
      .post('https://crm.my-project.site/api/students', newStudent, {
        headers: { 'Content-Type': 'application/json' },
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
    dataSource(pre => {
      return [...pre, newStudent]
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
  const onEditStudent = record => {
    setIsEditing(true)
    setEditingStudent({ ...record })
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
  }, [])
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
          }}
          className='ml-auto'
        >
          Yangi o'quvchi qo'shish
        </MyButton>
      </header>
      {/* Add a new student with Drawer */}
      <Drawer
        visible={visible}
        title="Yangi o'quvchi qo'shish"
        onClose={() => {
          setVisible(!visible)
        }}
        maskClosable={true}
      >
        <Form>
          <p>Telefon</p>
          <Input
            onChange={e => {
              setPhone(e.target.value)
            }}
            type='text'
            addonBefore='+998'
            className='mb-4 mt-2'
          />
          <p>Ism</p>
          <Input
            onChange={e => {
              setFirstName(e.target.value)
            }}
            type='text'
            className='mb-4 mt-2'
          />
          <p>Familiya</p>
          <Input
            onChange={e => {
              setLastName(e.target.value)
            }}
            type='text'
            className='mb-4 mt-2'
          />
          <p>Manzil</p>
          <Input
            onChange={e => {
              setAddress(e.target.value)
            }}
            type='text'
            className='mb-4 mt-2'
          />
          <p>Tug'ilgan sana</p>
          <DatePicker
            onChange={e => {
              setBirthday(e.target.value)
            }}
            className='mb-4 mt-2'
          />
          <p>Jinsi</p>
          <Radio.Group
            className='mb-4 mt-2'
            onChange={e => {
              setGender(e.target.value)
            }}
          >
            <Radio value='erkak'> Erkak </Radio>
            <Radio value='Ayol'> Ayol </Radio>
          </Radio.Group>
          <p>Izoh</p>
          <Input.TextArea rows={4} className='mb-4 mt-2' />
          <p>Qo'shimcha aloqa</p>
          <div className='flex gap-2'>
            <IconButton color='success' className='mb-4 mt-2'>
              <Telephone />
            </IconButton>
            <IconButton color='primary' className='mb-4 mt-2'>
              <Person />
            </IconButton>
          </div>
          <Form.Item>
            <MyButton htmlType='submit' onClick={onAddStudent} color='primary'>
              Yuborish
            </MyButton>
          </Form.Item>
        </Form>
      </Drawer>
      <Table
        columns={columns}
        dataSource={dataSource}
        size='small'
        scroll={{
          x: 1000,
          y: 400
        }}
        rowSelection={rowSelection}
        className='overflow-auto'
      ></Table>
      {/* Edit the student with Drawer */}
      <Drawer
        visible={isEditing}
        title='Tahrirlash'
        onClose={() => {
          setIsEditing(!isEditing)
        }}
        maskClosable={true}
      >
        <Form>
          <p>Telefon</p>
          <Input
            onChange={e => {
              setPhone(e.target.value)
            }}
            type='text'
          />
          <p>Ism</p>
          <Input
            onChange={e => {
              setFirstName(e.target.value)
            }}
            type='text'
            className='mb-4 mt-2'
          />
          <p>Familiya</p>
          <Input
            onChange={e => {
              setLastName(e.target.value)
            }}
            type='text'
            className='mb-4 mt-2'
          />
          <p>Tug'ilgan sana</p>
          <DatePicker
            onChange={e => {
              setBirthday(e.target.value)
            }}
            className='mb-4 mt-2'
          />
          <p>Jinsi</p>
          <Radio.Group
            className='mb-4 mt-2'
            onChange={e => {
              setGender(e.target.value)
            }}
          >
            <Radio value='erkak'> Erkak </Radio>
            <Radio value='Ayol'> Ayol </Radio>
          </Radio.Group>
          <p>Qo'shimcha aloqa</p>
          <div className='flex gap-2'>
            <IconButton color='success' className='mb-4 mt-2'>
              <Telephone />
            </IconButton>
            <IconButton color='primary' className='mb-4 mt-2'>
              <Person />
            </IconButton>
          </div>
          <Form.Item>
            <MyButton htmlType='submit' color='primary'>
              Yuborish
            </MyButton>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  )
}
