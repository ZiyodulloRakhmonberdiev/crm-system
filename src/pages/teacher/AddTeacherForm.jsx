// import type { RadioChangeEvent } from 'antd'
import { useState, useEffect } from 'react'
import { Input, Form, Radio, message, Spin } from 'antd'
import axios from '../../axios/axios'
import { MyButton } from '../../UI/Button.style'
import { useDispatch } from 'react-redux'
import { refreshTeachersData } from '../../redux/teachersSlice'
import InputMask from 'react-input-mask'

export default function AddTeacherForm ({
  modalType,
  editingTeacher,
  visible,
  setVisible
}) {
  const url = '/api/teachers'
  const [teacher, setTeacher] = useState({
    name: '',
    phone: '',
    password: '',
    gender: '',
    salary_percentage: ''
  })
  const [uploading, setUploading] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (modalType === 'add') {
      setTeacher({
        name: '',
        phone: '',
        password: '',
        gender: '',
        salary_percentage: ''
      })
    } else {
      const { name, phone, gender, salary_percentage } = editingTeacher
      setTeacher({
        name: name,
        phone: phone.length === 9 ? phone : phone.slice(4, 13),
        password: '',
        gender: gender,
        salary_percentage: salary_percentage
      })
    }
  }, [modalType, visible])

  function handle (e) {
    const newTeacher = { ...teacher }
    newTeacher[e.target.id] = e.target.value
    setTeacher(newTeacher)
  }

  function submit (e) {
    e.preventDefault()
    const { name, phone, gender, salary_percentage } = teacher
    if (name && phone && gender && salary_percentage) {
      setUploading(true)
      if (modalType === 'add') {
        axios
          .post(url, {
            name: teacher.name,
            phone: '+998' + teacher.phone?.split(' ').join(''),
            password: teacher.password,
            gender: teacher.gender,
            salary_percentage: teacher.salary_percentage
          })
          .then(res => {
            setTeacher({
              name: '',
              phone: '',
              password: '',
              gender: '',
              salary_percentage: ''
            })
            message.success("Foydalanuvchi muvaffaqiyatli qo'shildi")
            dispatch(refreshTeachersData())
            setVisible()
          })
          .catch(err => {
            if (err.response.data.data.phone) {
              message.error("Bu telefon raqami oldin ro'yhatdan o'tgan!")
            } else {
              message.error("Xatolik yuz berdi! Qayta urinib ko'ring!")
            }
          })
          .finally(() => setUploading(false))
      } else if (modalType === 'update') {
        axios
          .patch(url + '/' + editingTeacher?.id, {
            teacher_id: editingTeacher?.id,
            name: teacher.name,
            phone: '+998' + teacher.phone?.split(' ').join(''),
            password: teacher.password,
            gender: teacher.gender,
            salary_percentage: teacher.salary_percentage
          })
          .then(res => {
            setTeacher({
              name: '',
              phone: '',
              password: '',
              gender: '',
              salary_percentage: ''
            })
            message.success('Foydalanuvchi muvaffaqiyatli yangilandi')
            dispatch(refreshTeachersData())
            setVisible()
          })
          .catch(err => {
            if (err.response.data.data.phone) {
              message.error("Bu telefon raqami oldin ro'yhatdan o'tgan!")
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
        <p>Telefon</p>
        <InputMask
          mask='99 999 99 99'
          onChange={e => {
            setTeacher({ ...teacher, phone: e.target.value })
          }}
          value={teacher.phone}
          maskChar={null}
        >
          {props => (
            <Input
              {...props}
              required
              addonBefore='+998'
              className='mb-4 mt-2'
            />
          )}
        </InputMask>

        <p>Ism</p>
        <Input
          required
          id='name'
          value={teacher?.name}
          onChange={e => {
            handle(e)
          }}
          type='text'
          className='mb-4 mt-2'
        />
        <p>Jinsi</p>
        <Radio.Group value={teacher?.gender} className='mb-4 mt-2'>
          <Radio
            checked={teacher?.gender === 'male'}
            value='male'
            id='gender'
            name='gender'
            onChange={e => {
              handle(e)
            }}
          >
            Erkak
          </Radio>
          <Radio
            checked={teacher?.gender === 'female'}
            value='female'
            id='gender'
            name='gender'
            onChange={e => {
              handle(e)
            }}
          >
            Ayol
          </Radio>
        </Radio.Group>
        <p>Ish haqi stavkasi</p>
        <Input
          required
          id='salary_percentage'
          value={teacher?.salary_percentage}
          onChange={e => {
            handle(e)
          }}
          type='text'
          className='mb-4 mt-2'
        />
        <Form.Item>
          <p>Parol</p>
          <Input
            required
            id='password'
            onChange={e => {
              handle(e)
            }}
            type='password'
            value={teacher?.password}
            className='mb-4 mt-2'
          />
        </Form.Item>
        <Spin spinning={uploading}>
          <MyButton htmlType='submit' color='primary'>
            Yuborish
          </MyButton>
        </Spin>
      </form>
    </div>
  )
}
