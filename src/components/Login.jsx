import { Button, Checkbox, Form, Input, message } from 'antd'
import { useState } from 'react'

export default function Login () {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  
  const onFinish = e => {
    setTimeout(() => {
      message.success('Muvaffaqiyatli')
    }, 2000)
    console.log(e)
  }


  
  return (
    <div className='absolute mx-auto inset-0 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 p-2'>
      <Form
        onFinish={onFinish}
        initialValues={{ remember: true }}
        style={{ maxWidth: 400, top: '50%' }}
        className='rounded-lg p-2 sm:p-8 sm:bg-white'
      >
        <Form.Item label='Telefon raqam' name='phone'>
          <Input
            addonBefore='+998'
            placeholder='Telefon'
            onChange={e => setPhone(e.target.value)}
            required
          />
        </Form.Item>
        <Form.Item label='Parol' name='password'>
          <Input.Password
            type='password'
            name='password'
            placeholder='Parol'
            required
            onChange={e => setPassword(e.target.value)}
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
