import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Input, message, Spin, Select, DatePicker } from 'antd'
import axios from '../../axios/axios'
import { MyButton } from '../../UI/Button.style'
import { refreshGroupsData } from '../../redux/groupsSlice'
import {
  fetchedCourses,
  fetchedError,
  fetchingCourses
} from '../../redux/coursesSlice'
import { fetchedTeachers, fetchingTeachers } from '../../redux/teachersSlice'
import { fetchedRooms, fetchingRooms } from '../../redux/roomsSlice'

const { RangePicker } = DatePicker

export default function AddGroupForm ({
  modalType,
  editingGroup,
  visible,
  setVisible
}) {
  const { teachers } = useSelector(state => state.teachers)
  const { courses } = useSelector(state => state.courses)
  const { rooms } = useSelector(state => state.rooms)
  const [uploading, setUploading] = useState(false)
  const url = '/api/groups'
  const [group, setGroup] = useState({
    name: '',
    time_id: '',
    group_start_date: '',
    group_end_date: '',
    teacher_ids: [],
    room_id: '',
    days: [],
    course_id: ''
  })
  const dispatch = useDispatch()

  // fetching courses
  useEffect(() => {
    dispatch(fetchingCourses())
    axios
      .get(`/api/courses`)
      .then(res => {
        dispatch(fetchedCourses(res?.data?.data))
      })
      .catch(err => {
        dispatch(fetchedError())
      })
  }, [])

  // fetching teachers
  useEffect(() => {
    dispatch(fetchingTeachers())
    axios.get(`/api/teachers`).then(res => {
      dispatch(fetchedTeachers(res?.data?.data))
    })
  }, [])

  // fetching rooms
  useEffect(() => {
    dispatch(fetchingRooms())
    axios.get(`/api/rooms`).then(res => {
      dispatch(fetchedRooms(res?.data?.data?.data))
    })
  }, [])

  useEffect(() => {
    if (modalType === 'add') {
      setGroup({
        name: '',
        time_id: '',
        group_start_date: '',
        group_end_date: '',
        teacher_ids: [],
        room_id: '',
        days: '',
        course_id: ''
      })
    } else {
      const {
        name,
        time,
        group_start_date,
        group_end_date,
        room,
        days,
        course
      } = editingGroup
      const teachers_ids = []
      editingGroup?.tachers?.map(item => {
        teachers_ids.push(item.id)
      })
      setGroup({
        name: name,
        time_id: time?.id,
        group_start_date: group_start_date,
        group_end_date: group_end_date,
        teacher_ids: teachers_ids,
        room_id: room?.id,
        days: days?.join(','),
        course_id: course?.id
      })
    }
  }, [modalType, visible])

  function handle (e) {
    const newGroup = { ...group }
    newGroup[e.target.id] = e.target.value
    setGroup(newGroup)
  }
  function submit (e) {
    e.preventDefault()
    const {
      name,
      time_id,
      group_start_date,
      teacher_ids,
      room_id,
      days,
      course_id
    } = group
    if (
      name &&
      time_id &&
      group_start_date &&
      teacher_ids &&
      room_id &&
      days &&
      course_id
    ) {
      setUploading(true)
      if (modalType === 'add') {
        axios
          .post(url, {
            name: group.name,
            time_id: group.time_id,
            group_start_date: group.group_start_date,
            group_end_date: group.group_end_date,
            teacher_ids: group.teacher_ids,
            room_id: group.room_id,
            days: group.days?.split(','),
            course_id: group.course_id
          })
          .then(res => {
            setGroup({
              name: '',
              time_id: '',
              group_start_date: '',
              group_end_date: '',
              teacher_ids: [],
              room_id: '',
              days: '',
              course_id: ''
            })
            message.success('Группа успешно добавлен!')
            dispatch(refreshGroupsData())
            setVisible()
          })
          .catch(err => {
            if (err.response.data.data.room_id) {
              message.error('Кабинет в это время занята!')
            } else {
              message.error('Произошла ошибка! Попробуйте еще раз!')
            }
          })
          .finally(() => setUploading(false))
      } else if (modalType === 'update') {
        axios
          .patch(url + '/' + editingGroup?.id, {
            group_id: editingGroup?.id,
            name: group.name,
            time_id: group.time_id,
            group_start_date: group_start_date,
            group_end_date: group.group_end_date,
            teacher_ids: group.teacher_ids,
            room_id: group.room_id,
            days: group.days?.split(','),
            course_id: group.course_id
          })
          .then(res => {
            setGroup({
              name: '',
              time_id: '',
              group_start_date: '',
              group_end_date: '',
              teacher_ids: [],
              room_id: '',
              days: '',
              course_id: ''
            })
            message.success('Группа успешно обновлен!')
            dispatch(refreshGroupsData())
            setVisible()
          })
          .catch(err => {
            if (err.response.data.data.room_id) {
              message.error('Кабинет в это время занята!')
            } else {
              message.error('Произошла ошибка! Попробуйте еще раз!')
            }
          })
          .finally(() => setUploading(false))
      }
    } else {
      message.error('Заполните все поля!')
    }
  }
  return (
    <div>
      <form onSubmit={e => submit(e)}>
        <p>Заполните все поля!</p>
        <Input
          required
          id='name'
          value={group?.name}
          onChange={e => {
            setGroup({ ...group, name: e.target.value })
          }}
          type='text'
          className='mb-4 mt-2'
        />
        <p>Выберите курс</p>
        <Select
          value={group?.course_id}
          onChange={e => {
            setGroup({ ...group, course_id: e })
          }}
          placeholder='Выбрать варианты'
          className='w-full mb-4 mt-2'
          showSearch={true}
        >
          {courses.map((course, index) => {
            return (
              <Select.Option value={course?.id} key={index}>
                {course.name}
              </Select.Option>
            )
          })}
        </Select>
        <p>Выберите учителя</p>
        <Select
          value={group?.teacher_ids}
          onChange={e => {
            setGroup({ ...group, teacher_ids: e })
          }}
          placeholder='Выбрать варианты'
          className='w-full mb-4 mt-2'
          showSearch={true}
          mode='multiple'
        >
          {teachers.map((teacher, index) => {
            return (
              <Select.Option value={teacher?.id} key={index}>
                {teacher.name}
              </Select.Option>
            )
          })}
        </Select>

        <p className='mb-2'>Дата старта группы</p>
        <div className='flex gap-x-2 mb-4'>
          <DatePicker
            required
            onChange={(date, dateString) => {
              setGroup({ ...group, group_start_date: dateString })
            }}
            placeholder='Выбрать дату'
          />
          <DatePicker
            required
            defaultValue={null}
            onChange={(date, dateString) => {
              setGroup({ ...group, group_start_date: dateString })
            }}
            placeholder='Выбрать дату'
          />
          {/* <input
            value={group?.group_start_date}
            id='group_start_date'
            onChange={e => handle(e)}
            type='date'
            placeholder='Выбрать дату'
            className='rounded-md px-2 py-1 border-2 border-gray-200 mt-2 w-full'
          />
          <input
            onChange={e => handle(e)}
            id='group_end_date'
            value={group?.group_end_date}
            type='date'
            placeholder='Выбрать дату'
            className='rounded-md px-2 py-1  border-2 border-gray-200 mt-2 w-full'
          /> */}
        </div>
        <p>Дни</p>
        <Select
          value={group?.days}
          onChange={e => {
            setGroup({ ...group, days: e })
          }}
          placeholder='Выбрать варианты'
          className='w-full mb-4 mt-2'
          showSearch={true}
        >
          <Select.Option value={'1,3,5'}>Нечетные дни</Select.Option>
          <Select.Option value={'2,4,6'}>Четные дни</Select.Option>
          <Select.Option value={'1,2,3,4,5,6'}>Каждый день</Select.Option>
          <Select.Option value={'6,7'}>Другое</Select.Option>
        </Select>
        <p>Выберите аудиторию</p>
        <Select
          value={group?.room_id}
          onChange={e => {
            setGroup({ ...group, room_id: e })
          }}
          placeholder='Выбрать варианты'
          className='w-full mb-4 mt-2'
          showSearch={true}
        >
          {rooms?.map((room, index) => {
            return (
              <Select.Option value={room?.id} key={room.id}>
                {room.name}
              </Select.Option>
            )
          })}
        </Select>
        <p>Время начала урока</p>
        <Select
          value={group?.time_id}
          onChange={e => {
            setGroup({ ...group, time_id: e })
          }}
          placeholder='Выбрать варианты'
          className='w-full mb-4 mt-2'
          showSearch={true}
        >
          <Select.Option value={1}>7:00</Select.Option>
          <Select.Option value={2}>7:30</Select.Option>
          <Select.Option value={3}>8:00</Select.Option>
          <Select.Option value={4}>9:00</Select.Option>
        </Select>
        <Spin spinning={uploading}>
          <MyButton htmlType='submit' color='primary'>
            Отправить
          </MyButton>
        </Spin>
      </form>
    </div>
  )
}
