// import type { RadioChangeEvent } from 'antd'
import { useState } from 'react'
import { Input, DatePicker, Form, Radio, message } from 'antd'
import { Telephone, Person } from 'react-bootstrap-icons'
import axios from '../../axios/axios'
import { MyButton } from '../../UI/Button.style'
import { IconButton } from '../../UI/IconButton.style'
import moment from 'moment'

export default function AddStudentForm () {
  const url = 'https://crm.my-project.site/api/students'
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

  function handle (e) {
    const newStudent = { ...student }
    newStudent[e.target.id] = e.target.value
    setStudent(newStudent)
    console.log(newStudent)
  }

  function submit (e) {
    e.preventDefault()
    axios
      .post(url, {
        first_name: student.firstName,
        last_name: student.lastName,
        phone: student.phone,
        password: student.password,
        address: student.address,
        birthday: student.birthday,
        gender: student.gender,
        addition_phone: student.additionPhone
      })
      .then(res => {
        console.log(res.data)
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
      })
      .catch(err => {
        console.log(err)
        message.error("Barcha maydonni to'ldiring")
      })
  }
  return (
    <div>
      <Form onSubmit={e => submit(e)}>
        <p>Telefon</p>
        <Input
          required
          id='phone'
          value={student.phone}
          onChange={e => {
            handle(e)
          }}
          type='text'
          addonBefore='+998'
          maxLength={7}
          className='mb-4 mt-2'
        />
        <p>Ism</p>
        <Input
          required
          id='firstName'
          value={student.firstName}
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
          value={student.lastName}
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
          value={student.address}
          className='mb-4 mt-2'
        />
        <p>Tug'ilgan sana</p>
        <input
          required
          type='date'
          format={'Sana'}
          id='birthday'
          value={student.birthday}
          onChange={e => {
            handle(e)
          }}
          className='mb-4 mt-2 p-4 text-sm'
        />
        <p>Jinsi</p>
        <Radio.Group className='mb-4 mt-2'>
          <Radio
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
        <p>Izoh</p>
        <Input.TextArea rows={4} className='mb-4 mt-2' id='comment' />
        <Form.Item>
          <p>Parol</p>
          <Input
            required
            id='password'
            onChange={e => {
              handle(e)
            }}
            type='password'
            value={student.password}
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
        <Form.Item>
          <MyButton htmlType='submit' color='primary' onClick={submit}>
            Yuborish
          </MyButton>
        </Form.Item>
      </Form>
    </div>
  )
}
