// import type { RadioChangeEvent } from 'antd'
import { useState, useEffect } from 'react'
import { Input, Form, Radio, message, Spin, Checkbox } from 'antd'
import axios from '../../axios/axios'
import { MyButton } from '../../UI/Button.style'
import { useDispatch } from 'react-redux'
import { refreshEmployeesData } from '../../redux/employeesSlice'
import InputMask from 'react-input-mask'

export default function AddEmployeeForm ({
  modalType,
  editingEmployee,
  visible,
  setVisible
}) {
  const url = '/api/employees'
  const [employee, setEmployee] = useState({
    name: '',
    phone: '',
    roles: [],
    gender: '',
    salary: '',
    password: ""
  })
  const [uploading, setUploading] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (modalType === 'add') {
      setEmployee({
        name: '',
        phone: '',
        roles: [],
        gender: '',
        salary: '',
        password: ""
      })
    } else {
      const { name, phone, gender, salary, password, role } = editingEmployee
      setEmployee({
        name: name,
        phone: phone.length === 9 ? phone : phone.slice(4, 13),
        roles: role,
        gender: gender,
        salary: salary,
        password: password
      })
    }
  }, [modalType, visible])
  function handle (e) {
    const newEmployee = { ...employee }
    newEmployee[e.target.id] = e.target.value
    setEmployee(newEmployee)
  }

  function submit (e) {
    e.preventDefault()
    const { name, phone, roles, gender, salary, password } = employee
    if (name && phone && roles && gender && salary) {
      setUploading(true)
      if (modalType === 'add') {
        axios
          .post(url, {
            name: employee.name,
            phone: '+998' + employee.phone?.split(' ').join(''),
            roles: employee.roles,
            gender: employee.gender,
            salary: employee.salary,
            password: employee.password
          })
          .then(res => {
            setEmployee({
              name: '',
              phone: '',
              roles: [],
              gender: '',
              salary: ''
            })
            message.success("Foydalanuvchi muvaffaqiyatli qo'shildi")
            dispatch(refreshEmployeesData())
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
          .patch(url + '/' + editingEmployee?.id, {
            employee_id: editingEmployee?.id,
            name: employee.name,
            phone: '+998' + employee.phone?.split(' ').join(''),
            roles: employee.roles,
            gender: employee.gender,
            salary: employee.salary,
            password: employee.password
          })
          .then(res => {
            setEmployee({
              name: '',
              phone: '',
              roles: [],
              gender: '',
              salary: ''
            })
            message.success('Foydalanuvchi muvaffaqiyatli yangilandi')
            dispatch(refreshEmployeesData())
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
            setEmployee({ ...employee, phone: e.target.value })
          }}
          value={employee.phone}
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
          value={employee?.name}
          onChange={e => {
            handle(e)
          }}
          type='text'
          className='mb-4 mt-2'
        />
        <p>Rollar</p>
        <Checkbox.Group
          value={employee.roles}
          options={[
            {
              label: 'asas',
              value: 'ceo'
            },
            {
              label: 'Cashier',
              value: 'cashier'
            },
            {
              label: 'Administrator',
              value: 'Administrator'
            }
          ]}
          onChange={e => {
            setEmployee({ ...employee, roles: e })
          }}
          className='mb-4 mt-2'
        />
        <p>Jinsi</p>
        <Radio.Group value={employee?.gender} className='mb-4 mt-2'>
          <Radio
            checked={employee?.gender === 'male'}
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
            checked={employee?.gender === 'female'}
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
        <p>Ish haqi</p>
        <Input
          required
          id='salary'
          value={employee?.salary}
          onChange={e => {
            handle(e)
          }}
          type='number'
          className='mb-4 mt-2'
        />
        <p>Parol</p>
        <Input
          required={modalType === "add"}
          id='password'
          value={employee?.password}
          onChange={e => {
            handle(e)
          }}
          type='text'
          className='mb-4 mt-2'
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
