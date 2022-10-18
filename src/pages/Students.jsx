import { Button, Table, Modal, Input, Select, Divider } from 'antd'
import { useState } from 'react'
import { PencilSquare, Trash } from 'react-bootstrap-icons'
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
      name: 'Umar Abdulazizov',
      email: 'umar@yandex.com',
      course: ['android', 'english'],
      teachers: ['Umida Makhmodova', 'Sanjar Akmalov'],
      phone: '88 855 86 85',
      balance: '500 000'
    },
    {
      id: 2,
      name: 'Yoqub Abdulazizov',
      email: 'yoqub@yandex.com',
      course: ['android', 'english'],
      teachers: ['Umida Makhmodova', 'Sanjar Akmalov'],
      phone: '88 855 13 49',
      balance: '1 500 000'
    },
    {
      id: 3,
      name: 'Temur Abdulazizov',
      email: 'umar@yandex.com',
      course: ['android', 'english'],
      teachers: ['Umida Makhmodova', 'Sanjar Akmalov'],
      phone: '88 855 86 85',
      balance: '500 000'
    },
    {
      id: 4,
      name: 'Jahongir Abdulazizov',
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
      title: 'Actions',
      render: record => {
        return (
          <div className='flex space-x-4'>
            <PencilSquare
              onClick={() => {
                onEditStudent(record)
              }}
            />
            <Trash
              onClick={() => {
                onDeleteStudent(record)
              }}
              style={{ marginLeft: 12 }}
            />
          </div>
        )
      },
      fixed: 'top'
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
      <header className='flex gap-2'>
        <Input.Search
          placeholder='Ism, email yoki telefon orqali qidirish'
          onSearch={value => {
            setSearchText(value)
          }}
          onChange={e => {
            setSearchText(e.target.value)
          }}
          allowClear
        />
        <Select
          mode='multiple'
          maxTagCount={2}
          style={{
            width: '100%'
          }}
          placeholder='Kurslar bo`yicha'
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
          style={{
            width: '100%'
          }}
          placeholder='Moliyaviy holati'
          maxTagCount={2}
          allowClear
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
      <Button onClick={handleModal} className='my-4'>
        Yangi o'quvchi qo'shish
      </Button>
      {/* This modal for adding a new student */}
      <Modal
        title='Yangi o`quvchi qo`shish'
        visible={openModal}
        okText={<span className='text-sky-500 hover:text-white'>Qo'shish</span>}
        onCancel={() => {
          handleModal()
        }}
      >
        <Input placeholder='Ism Familiya' className='mb-2' />
        <Input placeholder='Email' className='mb-2' />
        <Input
          addonBefore='+998'
          placeholder='Telefon raqam'
          className='mb-2'
        />
      </Modal>
      <Table
        columns={columns}
        dataSource={dataSource}
        size='small'
        scroll={{
          x: 850,
          y: 400
        }}
      ></Table>
      {/* This modal for editing a student */}
      <Modal
        title='Tahrirlash'
        visible={isEditing}
        okText={<span className='text-sky-500 hover:text-white'>Saqlash</span>}
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
