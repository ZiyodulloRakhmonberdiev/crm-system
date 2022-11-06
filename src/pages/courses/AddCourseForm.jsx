// import type { RadioChangeEvent } from 'antd'
import { useState, useEffect } from 'react'
import { Input, message, Spin } from 'antd'
import axios from '../../axios/axios'
import { MyButton } from '../../UI/Button.style'
import { useDispatch } from 'react-redux'
import { refreshCoursesData } from '../../redux/coursesSlice'

export default function AddCourseForm ({
  modalType,
  editingCourse,
  visible,
  setVisible
}) {
  const url = '/api/courses'
  const [course, setCourse] = useState({
    name: '',
    price: '',
    lesson_duration: '',
    month: ''
  })
  const [uploading, setUploading] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (modalType === 'add') {
      setCourse({
        name: '',
        price: '',
        lesson_duration: '',
        month: ''
      })
    } else {
      const { name, price, month, lesson_duration } = editingCourse
      setCourse({
        name: name,
        price: price,
        lesson_duration: lesson_duration,
        month: month
      })
    }
  }, [modalType, visible])

  function handle (e) {
    const newCourse = { ...course }
    newCourse[e.target.id] = e.target.value
    setCourse(newCourse)
  }

  function submit (e) {
    e.preventDefault()
    const { name, price, lesson_duration, month } = course
    if (name && price && lesson_duration && month) {
      setUploading(true)
      if (modalType === 'add') {
        axios
          .post(url, {
            name: course.name,
            price: course.price,
            lesson_duration: course.lesson_duration,
            month: course.month
          })
          .then(res => {
            setCourse({
              name: '',
              price: '',
              lesson_duration: '',
              month: ''
            })
            message.success("Kurs muvaffaqiyatli qo'shildi")
            dispatch(refreshCoursesData())
            setVisible()
          })
          .catch(err => {
            message.error("Xatolik yuz berdi! Qayta urinib ko'ring!")
          })
          .finally(() => setUploading(false))
      } else if (modalType === 'update') {
        axios
          .patch(url + '/' + editingCourse?.id, {
            course_id: editingCourse?.id,
            name: course.name,
            price: course.price,
            lesson_duration: course.lesson_duration,
            month: course.month
          })
          .then(res => {
            setCourse({
              name: '',
              price: '',
              lesson_duration: '',
              month: ''
            })
            message.success('Kurs muvaffaqiyatli yangilandi')
            dispatch(refreshCoursesData())
            setVisible()
          })
          .catch(err => {
            message.error("Xatolik yuz berdi! Qayta urinib ko'ring!")
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
        <p>Kurs nomi</p>
        <Input
          required
          id='name'
          value={course?.name}
          onChange={e => {
            handle(e)
          }}
          type='text'
          className='mb-4 mt-2'
          name='name'
        />
        <p>Kurs davomiyligi</p>
        <Input
          required
          id='lesson_duration'
          value={course?.lesson_duration}
          onChange={e => {
            handle(e)
          }}
          type='text'
          className='mb-4 mt-2'
          name='lesson_duration'
        />
        <p>Kurs o'tish muddati (oy)</p>
        <Input.Number
          required
          id='month'
          value={course?.month}
          onChange={e => {
            handle(e)
          }}
          type='text'
          className='mb-4 mt-2'
          name='month'
        />
        <p>Kurs narxi (so'm)</p>
        <Input.Number
          required
          id='price'
          value={course?.price}
          onChange={e => {
            handle(e)
          }}
          type='text'
          className='mb-4 mt-2'
          name='price'
        />
        <Spin spinning={uploading}>
          <MyButton htmlType='submit' color='primary'>
            Yuborish
          </MyButton>
        </Spin>
      </form>
    </div>
  )
}
