import { Button, Checkbox, Form, Input } from 'antd'
import { Link } from 'react-router-dom'

export default function Login () {
  return (
    <Form
      name='normal_login'
      className='login-form mx-auto pa-4  mt-10'
      initialValues={{ remember: true }}
      style={{ maxWidth: 500, backgroundColor: '#fff', width: 'auto' }}
    >
      <h2 className='mb-4'>Kirish</h2>
      <Form.Item
        label='Telefon'
        name='phone'
        rules={[
          {
            required: true,
            message: 'Iltimos, telefon raqamingizni kiriting!'
          }
        ]}
      >
        <Input addonBefore='+998' placeholder='Telefon' />
      </Form.Item>
      <Form.Item
        label='Parol'
        name='password'
        rules={[{ required: true, message: 'Iltimos, parolingizni kiriting!' }]}
        autoComplete='off'
      >
        <Input.Password
          type='password'
          name='password'
          placeholder='Parol'
          autoComplete='off'
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name='remember' valuePropName='checked' noStyle>
          <Checkbox>Eslab qolish</Checkbox>
        </Form.Item>

        <a className='login-form-forgot' href=''>
          | Parolni unutdingizmi?
        </a>
      </Form.Item>

      <Form.Item>
        <Button
          type='primary'
          htmlType='submit'
          className='login-form-button mr-2 mb-2'
        >
          Kirish
        </Button>
        <Button type='secondary' className='login-form-button'>
          <Link to='/register'>Ro'yxatdan o'tish</Link>
        </Button>
      </Form.Item>
    </Form>
  )
}
