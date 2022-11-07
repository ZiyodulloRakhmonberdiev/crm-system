import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Input, message, Spin, Select } from 'antd'
import axios from '../../axios/axios'
import { MyButton } from '../../UI/Button.style'
import { refreshGroupsData } from '../../redux/groupsSlice'

export default function AddGroupForm ({
  modalType,
  editingGroup,
  visible,
  setVisible
}) {
  const { teachers } = useSelector(state => state.teachers)
  const { courses } = useSelector(state => state.courses)
  const { rooms } = useSelector(state => state.rooms)

  // const courses_data = []
  // courses.map(item => {
  //   courses_data?.push({
  //     value: item?.id,
  //     name: item?.name
  //   })
  // })

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

  useEffect(() => {
    if (modalType === 'add') {
      setGroup({
        name: '',
        time_id: '',
        group_start_date: '',
        group_end_date: '',
        teacher_ids: '',
        room_id: '',
        days: '',
        course_id: ''
      })
    } else {
      const {
        name,
        time_id,
        group_start_date,
        group_end_date,
        teacher_ids,
        room_id,
        days,
        course_id
      } = editingGroup
      setGroup({
        name: name,
        time_id: time_id,
        group_start_date: group_start_date,
        group_end_date: group_end_date,
        teacher_ids: teacher_ids,
        room_id: room_id,
        days: days,
        course_id: course_id
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
            days: group.days,
            course_id: group.course_id
          })
          .then(res => {
            setGroup({
              name: '',
              time_id: '',
              group_start_date: '',
              group_end_date: '',
              teacher_ids: '',
              room_id: '',
              days: '',
              course_id: ''
            })
            message.success("Foydalanuvchi muvaffaqiyatli qo'shildi")
            dispatch(refreshGroupsData())
            setVisible()
          })
          .catch(err => {
            if (err.response.data.data.room_id) {
              message.error(
                "Bu vaqtda bu xonaga boshqa guruh ro'yxatdan o'tgan!"
              )
            } else {
              message.error("Xatolik yuz berdi! Qayta urinib ko'ring!")
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
            days: group.days,
            course_id: group.course_id
          })
          .then(res => {
            setGroup({
              name: '',
              time_id: '',
              group_start_date: '',
              group_end_date: '',
              teacher_ids: '',
              room_id: '',
              days: '',
              course_id: ''
            })
            message.success('Foydalanuvchi muvaffaqiyatli yangilandi')
            dispatch(refreshGroupsData())
            setVisible()
          })
          .catch(err => {
            if (err.response.data.data.room_id) {
              message.error(
                "Bu vaqtda bu xonaga boshqa guruh ro'yxatdan o'tgan!"
              )
            } else {
              message.error("Xatolik yuz berdi! Qayta urinib ko'ring!")
            }
          })
          .finally(() => setUploading(false))
      }
    } else {
      message.error("Barcha maydonni to'ldiring!")
    }
  }

  return (
    <div>
      <form onSubmit={e => submit(e)}>
        <p>Guruh nomi</p>
        <Input
          required
          id='name'
          value={group?.name}
          onChange={e => {
            handle(e)
          }}
          type='text'
          className='mb-4 mt-2'
        />
        <p>Kursni tanlang</p>
        <Select
          value={group?.course_id}
          onChange={e => {
            setGroup({ ...group, course_id: e })
          }}
          placeholder='Kursni tanlang'
          className='w-full mb-4 mt-2'
        >
          {courses.map((course, index) => {
            return (
              <Select.Option value={course?.name} key={index}>
                {course.name}
              </Select.Option>
            )
          })}
        </Select>
        <p>O'qituvchini tanlang</p>
        <Select
          value={teachers?.teacher_ids}
          onChange={e => {
            setGroup({ ...group, teacher_ids: e })
          }}
          placeholder="O'qituvchini tanlang"
          className='w-full mb-4 mt-2'
        >
          {teachers.map((teacher, index) => {
            return (
              <Select.Option value={teacher?.name} key={index}>
                {teacher.name}
              </Select.Option>
            )
          })}
        </Select>
        <p>Kunlar</p>
        <Select
          value={group?.days}
          onChange={e => {
            setGroup({ ...group, days: e })
          }}
          placeholder='Kunlar tanlang'
          className='w-full mb-4 mt-2'
        >
          <Select.Option value={group?.days}>Toq kunlar</Select.Option>
          <Select.Option value={group?.days}>Juft kunlar</Select.Option>
          <Select.Option value={group?.days}>Har kuni</Select.Option>
          <Select.Option value={group?.days}>Dam olish kunlari</Select.Option>
        </Select>
        <p>Xonani tanlang</p>
        <Select
          value={group?.room_id}
          onChange={e => {
            setGroup({ ...group, room_id: e })
          }}
          placeholder='Xonani tanlang'
          className='w-full mb-4 mt-2'
        >
          {rooms.map((room, index) => {
            return (
              <Select.Option value={room?.name} key={index}>
                {room.name}
              </Select.Option>
            )
          })}
        </Select>
        <p>Dars boshlanish vaqti</p>
        <Select
          value={group?.course_id}
          onChange={e => {
            setGroup({ ...group, course_id: e })
          }}
          placeholder='Kursni tanlang'
          className='w-full mb-4 mt-2'
        >
          <Select.Option value={group?.time_id}>8:00</Select.Option>
          <Select.Option value={group?.time_id}>8:30</Select.Option>
          <Select.Option value={group?.time_id}>9:00</Select.Option>
          <Select.Option value={group?.time_id}>9:30</Select.Option>
        </Select>
        <Spin spinning={uploading}>
          <MyButton htmlType='submit' color='primary'>
            Yuborish
          </MyButton>
        </Spin>
      </form>
    </div>
  )
}
