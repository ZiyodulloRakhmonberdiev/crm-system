import { Button, Checkbox, Form, Input, message } from 'antd'
import { useRef, useState, useEffect, useContext } from 'react'
import AuthContext from '../../context/AuthProvider'
import axios from '../../axios/axios'

const LOGIN_URL = 'https://crm.my-project.site/api/signIn'

export default function Login () {
  const { setAuth } = useContext(AuthContext)
  const userRef = useRef()

  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [user, password])

  const onFinish = async e => {
    console.log(e)
    setTimeout(() => {
      success && message.success('Muvaffaqiyatli')
    }, 2000)
    setTimeout(() => {
      !success && message.error('Xatolik yuz berdi')
    }, 2000)
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: false
        }
      )
      console.log(JSON.stringify(response?.data))
      console.log(JSON.stringify(response))
      const accessToken = response?.data?.accessToken
      const roles = response?.data?.roles
      setAuth({ user, password, roles, accessToken })
      setUser('')
      setPassword('')
      setSuccess(true)
    } catch (err) {
      if (!err?.response) {
        setErrMsg('Server bilan aloqa mavjud emas')
      } else if (err.response?.status === 400) {
        setErrMsg('Telefon raqam yoki parol kiritilmadi')
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized')
      } else {
        setErrMsg('Xatolik yuz berdi')
      }
    }
  }

  return (
    <div className='absolute mx-auto inset-0 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 p-2'>
      <span>{errMsg}</span>
      <Form
        onFinish={onFinish}
        initialValues={{ remember: true }}
        style={{ maxWidth: 400, top: '50%' }}
        className='rounded-lg p-2 sm:p-8 sm:bg-white'
      >
        <Form.Item label='Telefon raqam' name='phone'>
          <Input
            placeholder='Telefon'
            onChange={e => setUser(e.target.value)}
            ref={userRef}
            value={user}
            required
          />
        </Form.Item>

        <Form.Item label='Parol' name='password'>
          <Input.Password
            type='password'
            name='password'
            placeholder='Parol'
            onChange={e => setPassword(e.target.value)}
            value={password}
            required
          />
        </Form.Item>

        <Form.Item>
          <Form.Item name='remember' valuePropName='checked' noStyle>
            <Checkbox>Eslab qolish</Checkbox>
          </Form.Item>

          <a className='login-form-forgot mr-2' href=''>
            | Parolni unutdingizmi?
          </a>
        </Form.Item>

        <Form.Item>
          <Button htmlType='submit' className='bg-sky-500 text-white'>
            Kirish
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
