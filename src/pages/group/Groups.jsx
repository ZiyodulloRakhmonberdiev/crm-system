import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { v4 as uuidv4 } from 'uuid'
import AddGroupForm from './AddGroupForm'

import { Table, Modal, Select, DatePicker, Drawer, Pagination } from 'antd'
import { TeamOutlined } from '@ant-design/icons'
import { PencilSquare, Trash } from 'react-bootstrap-icons'
import { MyButton } from '../../UI/Button.style'
import { IconButton } from '../../UI/IconButton.style'
import axios from '../../axios/axios'
import {
  fetchingGroups,
  fetchedGroups,
  fetchedError,
  refreshGroupsData,
  setGroupData
} from '../../redux/groupsSlice'
import {
  fetchedTeachers,
  fetchingTeachers,
  setTeachersData
} from '../../redux/teachersSlice'

export default function Groups () {
  const [visible, setVisible] = useState(false)
  const [modalType, setModalType] = useState('add')
  const [currentPage, setCurrentPage] = useState(1)
  const [per_page, setPerPage] = useState(30)
  const [last_page, setLastPage] = useState(1)
  const dispatch = useDispatch()
  const { groups, loading, error, refreshGroups, groupData } = useSelector(
    state => state.groups
  )
  const { teachers, refreshTeachers } = useSelector(state => state.teachers)

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
  const groupsStatus = [
    'Faol guruhlar',
    'Arxiv guruhlar',
    'Yakunlangan guruhlar'
  ]
  const days = ['Toq kunlar', 'Juft kunlar', 'Har kuni', 'Boshqa']

  // Search functions which is in the heading on the page
  const [editingGroup, setEditingGroup] = useState(null)

  // fetching teachers
  useEffect(() => {
    dispatch(fetchingTeachers())
    axios.get(`/api/teachers`).then(res => {
      dispatch(fetchedTeachers(res?.data?.data))
    })
  }, [])

  const shortDays = [
    {
      id: 1,
      day: 'По'
    },
    {
      id: 2,
      day: 'Вт'
    },
    {
      id: 3,
      day: 'Ср'
    },
    {
      id: 4,
      day: 'Чт'
    },
    {
      id: 5,
      day: 'Пт'
    },
    {
      id: 6,
      day: 'Сб'
    },
    {
      id: 7,
      day: 'Вс'
    }
  ]

  // get days
  const getDays = days => {
    let returnData = null
    switch (days) {
      case ['1', '3', '5']:
        returnData = 'Toq kunlar'
      case ['2', '4', '6']:
        returnData = 'Juft kunlar'
      case ['6', '7'] || ['7']:
        returnData = 'Dam olish kunlari'
      default:
        returnData = (
          <div className='flex flex-wrap gap-1'>
            {days?.map(item => {
              return (
                <span
                  className='px-1 py-0.5 rounded-md text-white bg-gray-400 font-semibold'
                  style={{ fontSize: '10px' }}
                >
                  {shortDays.find(x => x.id == item)?.day}
                </span>
              )
            })}
          </div>
        )
    }
    return returnData
  }

  // Groups static data
  let dataSource = []
  groups?.map(item => {
    dataSource?.push({
      id: item?.id,
      uid: uuidv4(),
      name: (
        <Link
          to={`/groups/${item?.id}`}
          onClick={() => dispatch(setGroupData(item))}
          className='text-violet-700'
        >
          {item?.name}
        </Link>
      ),
      course: item?.course?.name,
      room: item?.room?.name,
      teachers: item?.tachers?.map(teacher => (
        <>
          <Link
            onClick={() => {
              dispatch(
                setTeachersData(teachers?.find(x => x?.id === teacher?.id))
              )
            }}
            to={`/teachers/profile/${teacher?.id}`}
            className='px-2 py-2 mb-1 mr-2 rounded-md text-violet-700'
          >
            {teacher?.name}
          </Link>
          <br />
        </>
      )),
      days: (
        <>
          <div className='flex flex-wrap gap-1'>{getDays(item?.days)}</div>
          <span>{item?.time?.time}</span>
        </>
      ),
      duration: (
        <div>
          <p>{item?.group_start_date} -</p>
          <p>{item?.group_end_date}</p>
        </div>
      ),
      student_count: item?.student_count,
      actions: (
        <div className='flex gap-2'>
          <IconButton
            color='primary'
            onClick={() => {
              onEditGroup(item)
            }}
          >
            <PencilSquare />
          </IconButton>
          <IconButton
            color='danger'
            onClick={() => {
              onDeleteGroup(item)
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
      width: 40,
      render: record => {
        return <span className='pl-1 text-xs'>{record}</span>
      }
    },
    {
      key: '2',
      title: 'Nomi',
      dataIndex: 'name',
      fixed: 'top',
      render: record => {
        return <span className='text-xs'>{record}</span>
      }
    },
    {
      key: '3',
      title: 'Kurs',
      dataIndex: 'course',
      fixed: 'top',
      render: record => {
        return <span className='text-xs'>{record}</span>
      }
    },
    {
      key: '4',
      title: 'Xona',
      dataIndex: 'room',
      fixed: 'top',
      render: record => {
        return <span className='text-xs'>{record}</span>
      }
    },
    {
      key: '5',
      title: `O'qituvchi`,
      dataIndex: 'teachers',
      fixed: 'top',
      render: record => {
        return <span className='text-xs'>{record}</span>
      },
      width: '250px'
    },
    {
      key: '6',
      title: 'Kunlar',
      dataIndex: 'days',
      fixed: 'top',
      render: record => {
        return <span className='text-xs'>{record}</span>
      }
    },
    {
      key: '7',
      title: 'Davomiyligi',
      dataIndex: 'duration',
      fixed: 'top',
      render: record => {
        return <span className='text-xs'>{record}</span>
      }
    },
    {
      key: '8',
      title: `O'quvchilar`,
      dataIndex: 'student_count',
      fixed: 'top',
      render: record => {
        return <span className='text-xs'>{record}</span>
      }
    },
    {
      key: '9',
      title: 'Amallar',
      dataIndex: 'actions',
      fixed: 'top',
      render: record => {
        return <span className='text-xs'>{record}</span>
      }
    }
  ]

  const onDeleteGroup = record => {
    Modal.confirm({
      title: "O'chirilsinmi?",
      okText: 'Ha',
      okType: 'danger',
      cancelText: "Yo'q"
    })
  }
  const onEditGroup = Group => {
    setModalType('update')
    setVisible(true)
    setEditingGroup({ ...Group })
  }

  // fetching groups
  useEffect(() => {
    dispatch(fetchingGroups())
    axios
      .get(`/api/groups?page=${currentPage}`)
      .then(res => {
        dispatch(fetchedGroups(res?.data?.data?.data))
      })
      .catch(err => {
        dispatch(fetchedError())
      })
  }, [refreshGroups, currentPage])
  return (
    <div>
      <header className='bg-white flex flex-wrap flex-col md:flex-row p-4 rounded-lg items-center justify-start mb-8 gap-4'>
        <div className='text-2xl text-cyan-400 bg-cyan-50 p-2 rounded-md'>
          <TeamOutlined />
        </div>
        <p className='text-cyan-400 text-2xl'>Guruhlar</p>
        <p className='text-cyan-400'>Jami: {groups.length} ta</p>
        <MyButton
          onClick={() => {
            setVisible(!visible)
            setModalType('add')
          }}
          className='md:ml-auto'
        >
          Yangi guruh qo'shish
        </MyButton>
      </header>
      <div className='flex gap-4 mb-8'>
        <Select
          mode='multiple'
          maxTagCount={1}
          placeholder='Guruhlar holati'
          allowClear
          className='min-w-[200px]'
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
          className='min-w-[200px]'
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
          className='min-w-[200px]'
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
          className='min-w-[200px]'
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
          className='min-w-[200px]'
          block
          format='YYYY-MM-DD'
        />
      </div>
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
        <AddGroupForm
          modalType={modalType}
          editingGroup={editingGroup}
          visible={visible}
          setVisible={() => setVisible(false)}
        />
      </Drawer>
      <Table
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        scroll={{
          x: 1000
        }}
        className='overflow-auto'
        pagination={false}
        size='small'
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
