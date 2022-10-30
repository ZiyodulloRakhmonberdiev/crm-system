import { Table, Modal, Input, Select, Divider } from 'antd'
import { useState } from 'react'
import { PencilSquare, Trash } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
export default function Students () {
  // Multi Select input which is on the heading
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

  // Search functions which is in the heading on the page
  const [searchText, setSearchText] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)
  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      name: <Link to='/students/profile'>Yoqub Abdulazizov</Link>,
      email: 'umar@yandex.com',
      course: ['android', 'english'],
      teachers: ['Umida Makhmodova', 'Sanjar Akmalov'],
      phone: '88 855 86 85',
      balance: '500 000'
    },
    {
      id: 2,
      name: <Link to='/students/profile'>Yoqub Abdulazizov</Link>,
      email: 'yoqub@yandex.com',
      course: ['android', 'english'],
      teachers: ['Umida Makhmodova', 'Sanjar Akmalov'],
      phone: '88 855 13 49',
      balance: '1 500 000'
    },
    {
      id: 3,
      name: <Link to='/students/profile'>Temur Abdulazizov</Link>,
      email: 'umar@yandex.com',
      course: ['android', 'english'],
      teachers: ['Umida Makhmodova', 'Sanjar Akmalov'],
      phone: '88 855 86 85',
      balance: '500 000'
    },
    {
      id: 4,
      name: <Link to='/students/profile'>Jahon Abdulazizov</Link>,
      email: 'umar@yandex.com',
      course: ['android', 'english'],
      teachers: ['Umida Makhmodova', 'Sanjar Akmalov'],
      phone: '88 855 86 85',
      balance: '500 000'
    }
  ])

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
      title: 'Name',
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
      title: 'Email',
      dataIndex: 'email',
      fixed: 'top',
      render: record => {
        return <span className='text-xs'>{record}</span>
      }
    },
    {
      key: '4',
      title: 'Telefon',
      dataIndex: 'phone',
      fixed: 'top'
    },
    {
      key: '5',
      title: 'Kurslari',
      dataIndex: 'course',
      fixed: 'top',
      render: record => {
        return (
          <div className='flex gap-1 flex-wrap'>
            {record.map(c => (
              <span className='border rounded-sm text-xs border-slate-100 p-0.5'>
                {c}
              </span>
            ))}
          </div>
        )
      }
    },
    {
      key: '6',
      title: 'Ustozlari',
      dataIndex: 'teachers',
      fixed: 'top',
      render: record => {
        return (
          <div className='flex gap-1 flex-wrap'>
            {record.map(c => (
              <span className='border rounded-sm text-xs border-slate-100 p-0.5'>
                {c}
              </span>
            ))}
          </div>
        )
      }
    },
    {
      key: '7',
      title: 'Balansi',
      dataIndex: 'balance',
      fixed: 'top'
    },
    {
      key: '8',
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
      title: 'O`chirilsinmi?',
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
        <span className='text-2xl'>O'quvchilar</span>
      </Divider>
      <header className='flex flex-wrap gap-2'>
        <div className='w-42 sm:mr-8'>
          <Input.Search
            placeholder='Qidirish - ism, email, telefon'
            onSearch={value => {
              setSearchText(value)
            }}
            onChange={e => {
              setSearchText(e.target.value)
            }}
            allowClear
            className='min-w-[200px] md:min-w-[250px]'
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
      </header>
      <button
        onClick={handleModal}
        className='my-4 py-2 px-4 lg:py-4 lg:px-8 rounded-full bg-blue-400 hover:bg-blue-500 text-white transition'
      >
        Yangi o'quvchi qo'shish
      </button>
      {/* This modal for adding a new student */}
      <Modal
        title="Yangi o'quvchi qo`shish"
        visible={openModal}
        okText={<span className='text-sky-500 hover:text-white'>Qo'shish</span>}
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
        size='small'
        scroll={{
          x: 1000,
          y: 400
        }}
        className='overflow-auto'
      ></Table>
      {/* This modal for editing a student */}
      <Modal
        title='Tahrirlash'
        visible={isEditing}
        okText={<span className='text-sky-500 hover:text-white'>Saqlash</span>}
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
