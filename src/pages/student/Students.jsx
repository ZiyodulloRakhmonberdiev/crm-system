import { Table, Modal, Input, Select, Drawer } from 'antd'
import { useState, useEffect } from 'react'
import { PencilSquare, Trash, Mortarboard } from 'react-bootstrap-icons'
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
  // const [dataSource, setDataSource] = useState([
  //   {
  //     id: 1,
  //     name: <Link to='/students/profile'>Yoqub Abdulazizov</Link>,
  //     email: 'umar@yandex.com',
  //     course: ['android', 'english'],
  //     teachers: ['Umida Makhmodova', 'Sanjar Akmalov'],
  //     phone: '88 855 86 85',
  //     balance: '500 000'
  //   },
  //   {
  //     id: 2,
  //     name: <Link to='/students/profile'>Yoqub Abdulazizov</Link>,
  //     email: 'yoqub@yandex.com',
  //     course: ['android', 'english'],
  //     teachers: ['Umida Makhmodova', 'Sanjar Akmalov'],
  //     phone: '88 855 13 49',
  //     balance: '1 500 000'
  //   },
  //   {
  //     id: 3,
  //     name: <Link to='/students/profile'>Temur Abdulazizov</Link>,
  //     email: 'umar@yandex.com',
  //     course: ['android', 'english'],
  //     teachers: ['Umida Makhmodova', 'Sanjar Akmalov'],
  //     phone: '88 855 86 85',
  //     balance: '500 000'
  //   },
  //   {
  //     id: 4,
  //     name: <Link to='/students/profile'>Jahon Abdulazizov</Link>,
  //     email: 'umar@yandex.com',
  //     course: ['android', 'english'],
  //     teachers: ['Umida Makhmodova', 'Sanjar Akmalov'],
  //     phone: '88 855 86 85',
  //     balance: '500 000'
  //   }
  // ])

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
    const randomNumber = parseInt(Math.random() * 1000)
    const newStudent = {
      id: randomNumber,
      name: 'Name ' + randomNumber,
      email: randomNumber + '@gmail.com',
      address: 'Address ' + randomNumber
    }
    // setDataSource(pre => {
    //   return [...pre, newStudent]
    // })
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
  const handleVisible = () => {
    setVisible(!visible)
  }

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
      <Drawer
        visible={visible}
        title="Yangi o'quvchi qo'shish"
        onClose={() => {
          setVisible(!visible)
        }}
        maskClosable={true}
      >
        <label>Telefon</label>
        <Input type='text' addonBefore='+998' className='mb-4 mt-2' />
        <label>Ism</label>
        <Input type='text' className='mb-4 mt-2' />
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
      <Modal
        title='Tahrirlash'
        visible={isEditing}
        okText='Saqlash'
        cancelText='Yopish'
        onCancel={() => {
          resetEditing()
        }}
        // onOk={() => {
        //   setDataSource(pre => {
        //     return pre.map(student => {
        //       if (student.id === editingStudent.id) {
        //         return editingStudent
        //       } else {
        //         return student
        //       }
        //     })
        //   })
        //   resetEditing()
        // }}
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
