import { Table, Modal, Input, Select, DatePicker, Divider } from 'antd'
import { useEffect, useState } from 'react'
import { PencilSquare, Trash } from 'react-bootstrap-icons'
import { MyButton } from '../../UI/Button.style'
import { IconButton } from '../../UI/IconButton.style'
import axios from '../../axios/axios'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchGroups,
  fetchingError,
  fetchingGroups
} from '../../redux/groupsSlice'

export default function Groups () {
  const dispatch = useDispatch()
  const { groups, loading, error } = useSelector(state => state.groups)
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
  let dataSource = []
  groups?.map(item => {
    dataSource?.push({
      id: item?.id,
      name: item?.name,
      course: item?.course?.name,
      room: item?.room?.name,
      teachers: item?.tachers?.map(teacher => teacher?.name),
      days: item?.days?.map(day => day),
      duration: (
        <span>
          {item?.group_start_date} - {item?.group_end_date}
        </span>
      ),
      students: item?.student_count
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
      title: 'Nomi',
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
      dataIndex: 'teachers',
      fixed: 'top'
    },
    {
      key: '6',
      title: 'Kunlar',
      dataIndex: 'days',
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
    // setDataSource(pre => {
    //   return [...pre, newStudent]
    // })
  }
  const onDeleteStudent = record => {
    Modal.confirm({
      title: "O'chirilsinmi?",
      okText: 'Ha',
      okType: 'danger' ,
      cancelText: "Yo'q", 
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

  // fetching groups
  useEffect(() => {
    dispatch(fetchingGroups())
    axios
      .get('/api/groups')
      .then(res => {
        dispatch(fetchGroups(res?.data?.data?.data))
      })
      .catch(err => {
        dispatch(fetchingError())
      })
  }, [])

  return (
    <div>
      <Divider orientation='center'>
        <span className='text-2xl'>Guruhlar</span>
      </Divider>
      <header className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2'>
        <Select
          mode='multiple'
          maxTagCount={1}
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
          placeholder="O'qituvchi"
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
          placeholder="Kunlar bo'yicha"
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
      <MyButton onClick={handleModal} className='my-4'>
        Guruh qo'shish
      </MyButton>
      <Modal
        title="Yangi guruh qo'shish"
        visible={openModal}
        okText='Saqlash'
        onCancel={() => {
          resetEditing()
          handleModal()
        }}
        cancelText='Yopish'
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
        <label>Dars kunlari:</label>
        <br />
        <Select
          block
          mode='tabs'
          value={editingStudent?.day}
          onChange={e => {
            setEditingStudent(pre => {
              return { ...pre, day: e.value }
            })
          }}
          className='mb-2 min-w-[150px]'
        >
          {days.map((day, index) => {
            return (
              <Select.Option key={index} value={day}>
                {day}
              </Select.Option>
            )
          })}
        </Select>
        <br />
        <label>Davomiyligi:</label>
        <Input
          value={editingStudent?.duration}
          onChange={e => {
            setEditingStudent(pre => {
              return { ...pre, duration: e.target.value }
            })
          }}
          className='mb-2'
        />
      </Modal>
      <Table
        columns={columns}
        dataSource={dataSource}
        scroll={{
          x: 1000,
          y: 400
        }}
      ></Table>
      <Modal
        title='Tahrirlash'
        visible={isEditing}
        okText='Saqlash'
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
        <label>Dars kunlari:</label>
        <br />
        <Select
          block
          mode='tabs'
          value={editingStudent?.day}
          onChange={e => {
            setEditingStudent(pre => {
              return { ...pre, day: e.value }
            })
          }}
          className='mb-2 min-w-[150px]'
        >
          {days.map((day, index) => {
            return (
              <Select.Option key={index} value={day}>
                {day}
              </Select.Option>
            )
          })}
        </Select>
        <br />
        <label>Davomiyligi:</label>
        <Input
          value={editingStudent?.duration}
          onChange={e => {
            setEditingStudent(pre => {
              return { ...pre, duration: e.target.value }
            })
          }}
          className='mb-2'
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
