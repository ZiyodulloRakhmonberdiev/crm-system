// import type { RadioChangeEvent } from 'antd'
import { useState, useEffect } from 'react'
import { Input, Form, Radio, message, Spin } from 'antd'
import { Telephone, Person } from 'react-bootstrap-icons'
import axios from '../../axios/axios'
import { MyButton } from '../../UI/Button.style'
import { IconButton } from '../../UI/IconButton.style'
import { useDispatch } from 'react-redux'
import { refreshStudentsData } from '../../redux/studentsSlice'
import InputMask from 'react-input-mask'

export default function AddStudentForm ({
  modalType,
  editingStudent,
  visible,
  setVisible
}) {
  const [uploading, setUploading] = useState(false)
  const url = '/api/students'
  const [student, setStudent] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    password: '',
    address: '',
    birthday: '',
    gender: '',
    additionPhone: ''
  })
  const dispatch = useDispatch()

  useEffect(() => {
    if (modalType === 'add') {
      setStudent({
        firstName: '',
        lastName: '',
        phone: '',
        password: '',
        address: '',
        birthday: '',
        gender: '',
        additionPhone: ''
      })
    } else {
      const {
        first_name,
        last_name,
        phone,
        address,
        birthday,
        gender,
        addition_phone
      } = editingStudent
      setStudent({
        firstName: first_name,
        lastName: last_name,
        phone: phone.length === 9 ? phone : phone.slice(4, 13),
        password: '',
        address: address,
        birthday: birthday,
        gender: gender,
        additionPhone: addition_phone
      })
    }
  }, [modalType, visible])

  function handle (e) {
    const newStudent = { ...student }
    newStudent[e.target.id] = e.target.value
    setStudent(newStudent)
  }

  function submit (e) {
    e.preventDefault()
    const { firstName, lastName, phone, address, birthday, gender } = student
    if (firstName && lastName && phone && address && birthday && gender) {
      setUploading(true)
      if (modalType === 'add') {
        axios
          .post(url, {
            first_name: student.firstName,
            last_name: student.lastName,
            phone: '+998' + student.phone?.split(' ').join(''),
            password: student.password,
            address: student.address,
            birthday: student.birthday,
            gender: student.gender,
            addition_phone: student.additionPhone
          })
          .then(res => {
            setStudent({
              firstName: '',
              lastName: '',
              phone: '',
              password: '',
              address: '',
              birthday: '',
              gender: '',
              additionPhone: ''
            })
            message.success("Foydalanuvchi muvaffaqiyatli qo'shildi")
            dispatch(refreshStudentsData())
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
          .patch(url + '/' + editingStudent?.id, {
            student_id: editingStudent?.id,
            first_name: student.firstName,
            last_name: student.lastName,
            phone: '+998' + student.phone?.split(' ').join(''),
            password: student.password,
            address: student.address,
            birthday: student.birthday,
            gender: student.gender,
            addition_phone: student.additionPhone
          })
          .then(res => {
            setStudent({
              firstName: '',
              lastName: '',
              phone: '',
              password: '',
              address: '',
              birthday: '',
              gender: '',
              additionPhone: ''
            })
            message.success('Foydalanuvchi muvaffaqiyatli yangilandi')
            dispatch(refreshStudentsData())
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
            setStudent({ ...student, phone: e.target.value })
          }}
          value={student.phone}
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
          id='firstName'
          value={student?.firstName}
          onChange={e => {
            handle(e)
          }}
          type='text'
          className='mb-4 mt-2'
        />
        <p>Familiya</p>
        <Input
          required
          id='lastName'
          value={student?.lastName}
          onChange={e => {
            handle(e)
          }}
          type='text'
          className='mb-4 mt-2'
        />
        <p>Manzil</p>
        <Input
          required
          id='address'
          onChange={e => {
            handle(e)
          }}
          type='text'
          value={student?.address}
          className='mb-4 mt-2'
        />
        <p>Tug'ilgan sana</p>
        <input
          required
          type='date'
          id='birthday'
          value={student?.birthday}
          onChange={e => {
            handle(e)
          }}
          className='mb-4 mt-2 p-2 border border-slate-400'
        />
        <p>Jinsi</p>
        <Radio.Group value={student.gender} className='mb-4 mt-2'>
          <Radio
            checked={student?.gender === 'male'}
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
            checked={student?.gender === 'female'}
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
        {/* <p>Izoh</p>
        <Input.TextArea rows={4} className='mb-4 mt-2' id='comment' /> */}
        <Form.Item>
          <p>Parol</p>
          <Input
            required
            id='password'
            onChange={e => {
              handle(e)
            }}
            type='password'
            value={student?.password}
            className='mb-4 mt-2'
          />
        </Form.Item>
        <p>Qo'shimcha aloqa</p>
        <div className='flex gap-2'>
          <IconButton color='success' className='mb-4 mt-2'>
            <Telephone />
          </IconButton>
          <IconButton color='primary' className='mb-4 mt-2'>
            <Person />
          </IconButton>
        </div>
        <Spin spinning={uploading}>
          <MyButton htmlType='submit' color='primary'>
            Yuborish
          </MyButton>
        </Spin>
      </form>
    </div>
  )
}
