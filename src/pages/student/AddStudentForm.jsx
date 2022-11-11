import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { Telephone, Person } from 'react-bootstrap-icons'
import InputMask from 'react-input-mask'
import { Input, Form, Radio, message, Spin, DatePicker } from 'antd'

import axios from '../../axios/axios'
import { refreshStudentsData } from '../../redux/studentsSlice'
import { MyButton } from '../../UI/Button.style'
import { IconButton } from '../../UI/IconButton.style'

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
  console.log(student?.birthday)
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
            message.success('Пользователь успешно добавлен!')
            dispatch(refreshStudentsData())
            setVisible()
          })
          .catch(err => {
            if (err.response.data.data.phone) {
              message.error('Этот номер телефона уже зарегистрирован!')
            } else {
              message.error('Произошла ошибка! Попробуйте еще раз!')
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
            message.success('Пользователь успешно обновлен!')
            dispatch(refreshStudentsData())
            setVisible()
          })
          .catch(err => {
            if (err.response.data.data.phone) {
              message.error('Этот номер телефона уже зарегистрирован!')
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
        <p>Телефон</p>
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
        <p>Имя</p>
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
        <p>Фамилия</p>
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
        <p>Адрес</p>
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
        <p>Дата рождения</p>
        <DatePicker
          required
          defaultValue={student?.birthday}
          className='mb-4 mt-2'
          onChange={(date, dateString) => {
            setStudent({ ...student, birthday: dateString })
          }}
        />
        {/* <input
          type='date'
          onChange={e => {
            handle(e)
          }}
          className=' p-2 border border-slate-400'
        /> */}
        <p>Пол</p>
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
            Мужчина
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
            Женщина
          </Radio>
        </Radio.Group>
        {/* <p>Izoh</p>
        <Input.TextArea rows={4} className='mb-4 mt-2' id='comment' /> */}
        <Form.Item>
          <p>Пароль</p>
          <Input.Password
            required={modalType === 'add'}
            id='password'
            onChange={e => {
              handle(e)
            }}
            type='password'
            value={student?.password}
            className='mb-4 mt-2'
          />
        </Form.Item>
        <p>Дополнительные контакты</p>
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
            Отправить
          </MyButton>
        </Spin>
      </form>
    </div>
  )
}
