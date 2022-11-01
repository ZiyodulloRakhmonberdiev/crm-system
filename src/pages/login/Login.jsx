import { Button, Checkbox, Form, Input, message, Spin } from 'antd'
import { useRef, useState, useEffect, useContext } from 'react'
import AuthContext from '../../context/AuthProvider'
import axios from '../../axios/axios'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { checkUserIdLoggedIn, login } from '../../redux/loginSlice'

const LOGIN_URL = 'https://crm.my-project.site/api/signIn'

export default function Login() {
  const { setAuth } = useContext(AuthContext)
  const userRef = useRef()
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    userRef.current.focus()
    checkUserIdLoggedIn()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [user, password])

  const onFinish = async e => {
    setLoading(true)
    axios.post(
      LOGIN_URL,
      JSON.stringify({ phone: user, password }),
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: false
      }
    )
      .then((response) => {
        dispatch(login({ token: response?.data?.data?.token, user: { name: response?.data?.data?.name, id: response?.data?.data?.id, role: response?.data?.data?.role } }))
        setUser('')
        setPassword('')
        setSuccess(true)
        localStorage.setItem("crm_token", response?.data?.data?.token)
        message.success('Muvaffaqiyatli')
        navigate("/", { replace: true })
      })
      .catch(err => {
        message.error('Xatolik yuz berdi')
      })
      .finally(() => {
        setLoading(false)
      })

  }

  return (
    <div className='absolute mx-auto inset-0 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 p-2'>
      <Spin spinning={ loading }>
        <span>{ errMsg }</span>
        <Form
          onFinish={ onFinish }
          initialValues={ { remember: true } }
          style={ { maxWidth: 400, top: '50%' } }
          className='rounded-lg p-2 sm:p-8 sm:bg-white'
        >
          <Form.Item label='Telefon raqam' name='phone'>
            <Input
              placeholder='Telefon'
              onChange={ e => setUser(e.target.value) }
              ref={ userRef }
              value={ user }
              required
            />
          </Form.Item>

          <Form.Item label='Parol' name='password'>
            <Input.Password
              type='password'
              name='password'
              placeholder='Parol'
              onChange={ e => setPassword(e.target.value) }
              value={ password }
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
      </Spin>
    </div>
  )
}
