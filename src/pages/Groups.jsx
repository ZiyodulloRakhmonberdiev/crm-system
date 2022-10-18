import {
  Button,
  Table,
  Modal,
  Input,
  Select,
  Space,
  Dropdown,
  DatePicker,
  Menu,
  Divider
} from 'antd'
import { useState } from 'react'
import {
  ChatLeftDots,
  PencilSquare,
  ThreeDotsVertical,
  Trash
} from 'react-bootstrap-icons'
export default function Groups () {
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
  const teachers = ['Amir Kamol', 'Sanjar', 'Yulduz Ahmedova', 'Mirza O`roqov']
  const rooms = ['12 xona', '3 xona', '8 xona', '1 xona']
  const groupsStatus = [
    'Faol guruhlar',
    'Arxiv guruhlar',
    'Yakunlangan guruhlar'
  ]
  const days = ['Toq kunlar', 'Jufr kunlar', 'Har kuni', 'Boshqa']

  // Search functions which is in the heading on the page
  const [isEditing, setIsEditing] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)

  // Groups static data
  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      name: 'Pre Intermediate',
      course: 'android',
      teacher: 'Sanjar Akmalov',
      room: '21 xona',
      students: '50',
      day: 'toq',
      howMuchRunned: '3 oy 4 kun',
      duration: '12.10 - 24.01'
    },
    {
      id: 2,
      name: 'Android',
      course: 'android',
      teacher: 'Sanjar Akmalov',
      room: '21 xona',
      students: '50',
      day: 'toq',
      howMuchRunned: '3 oy 4 kun',
      duration: '12.10 - 24.01'
    },
    {
      id: 3,
      name: 'Web Design',
      course: 'android',
      teacher: 'Sanjar Akmalov',
      room: '21 xona',
      students: '50',
      day: 'toq',
      howMuchRunned: '3 oy 4 kun',
      duration: '12.10 - 24.01'
    },
    {
      id: 4,
      name: 'Python 35',
      course: 'android',
      teacher: 'Sanjar Akmalov',
      room: '21 xona',
      students: '50',
      day: 'toq',
      howMuchRunned: '3 oy 4 kun',
      duration: '12.10 - 24.01'
    },
    {
      id: 5,
      name: 'MERN Stack 3',
      course: 'android',
      teacher: 'Sanjar Akmalov',
      room: '21 xona',
      students: '50',
      day: 'toq',
      howMuchRunned: '3 oy 4 kun',
      duration: '12.10 - 24.01'
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
      fixed: 'top'
    },
    {
      key: '3',
      title: 'Kurs',
      dataIndex: 'course',
      fixed: 'top'
    },
    {
      key: '4',
      title: 'Xona',
      dataIndex: 'room',
      fixed: 'top'
    },
    {
      key: '5',
      title: `O'qituvchi`,
      dataIndex: 'teacher',
      fixed: 'top'
    },
    {
      key: '6',
      title: 'Kunlar',
      dataIndex: 'day',
      fixed: 'top'
    },
    {
      key: '7',
      title: 'Davomiyligi',
      dataIndex: 'duration',
      fixed: 'top'
    },
    {
      key: '8',
      title: `O'quvchilar`,
      dataIndex: 'students',
      fixed: 'top'
    },
    {
      key: '9',
      title: 'Amallar',
      render: record => {
        return (
          <div className='flex space-x-4'>
            <PencilSquare
              onClick={() => {
                onEditStudent(record)
              }}
            />
            <ChatLeftDots
              onClick={() => {
                onDeleteStudent(record)
              }}
              style={{ marginLeft: 12 }}
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

  // Add a new group
  const [openModal, setOpenModal] = useState(false)
  const handleModal = () => {
    setOpenModal(!openModal)
  }

  return (
    <div>
      <Divider orientation='center'>
        <span className='text-2xl'>Guruhlar</span>
      </Divider>
      <header className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2'>
        Filtrlash
        <Select
          mode='tabs'
          style={{
            width: '100%'
          }}
          placeholder='Guruhlar holati'
          allowClear
        >
          {groupsStatus.map((course, index) => {
            return (
              <Select.Option key={index} value={course}>
                {course}
              </Select.Option>
            )
          })}
        </Select>
        <Select
          mode='multiple'
          maxTagCount={2}
          style={{
            width: '100%'
          }}
          placeholder={`Kurslar bo'yicha`}
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
          placeholder={`O'qituvchi`}
          maxTagCount={2}
          allowClear
        >
          {teachers.map((item, index) => {
            return (
              <Select.Option key={index} value={item}>
                {item}
              </Select.Option>
            )
          })}
        </Select>
        <Select
          mode='multiple'
          style={{
            width: '100%'
          }}
          placeholder={`Kunlar bo'yicha`}
          maxTagCount={2}
          allowClear
        >
          {days.map((item, index) => {
            return (
              <Select.Option key={index} value={item}>
                {item}
              </Select.Option>
            )
          })}
        </Select>
        <DatePicker.RangePicker
          size={12}
          className='w-full'
          block
          format='YYYY-MM-DD'
        />
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
        scroll={{
          x: 850,
          y: 400
        }}
      ></Table>
      {/* This modal for editing group */}
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
        <label>Nomi:</label>
        <Input
          value={editingStudent?.name}
          onChange={e => {
            setEditingStudent(pre => {
              return { ...pre, name: e.target.value }
            })
          }}
          className='mb-2'
        />
        <label>Kurs:</label>
        <Input
          value={editingStudent?.course}
          onChange={e => {
            setEditingStudent(pre => {
              return { ...pre, course: e.target.value }
            })
          }}
          className='mb-2'
        />
        <label>Xona:</label>
        <Input
          value={editingStudent?.room}
          onChange={e => {
            setEditingStudent(pre => {
              return { ...pre, room: e.target.value }
            })
          }}
          className='mb-2'
        />
        <label>O'qituvchi:</label>
        <Input
          value={editingStudent?.teacher}
          onChange={e => {
            setEditingStudent(pre => {
              return { ...pre, teacher: e.target.value }
            })
          }}
          className='mb-2'
        />
        <label>Dars kuni:</label>
        <Select
          block
          mode='tabs'
          value={editingStudent?.day}
          onChange={e => {
            setEditingStudent(pre => {
              return { ...pre, day: e.value }
            })
          }}
        >
          {days.map((day, index) => {
            return (
              <Select.Option key={index} value={day}>
                {day}
              </Select.Option>
            )
          })}
        </Select>
        <label>Davomiyligi:</label>
        <Input
          value={editingStudent?.duration}
          onChange={e => {
            setEditingStudent(pre => {
              return { ...pre, duration: e.target.value }
            })
          }}
        />
        <label>O'quvchilar:</label>
        <Input
          value={editingStudent?.students}
          onChange={e => {
            setEditingStudent(pre => {
              return { ...pre, students: e.target.value }
            })
          }}
        />
      </Modal>
    </div>
  )
}
