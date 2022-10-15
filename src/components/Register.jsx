import { Button, Form, Input } from 'antd'
import { Link } from 'react-router-dom'
export default function Register () {
  return (
    <Form
      name='normal_login'
      className='mx-auto pa-4  mt-10 '
      initialValues={{ remember: true }}
      style={{ maxWidth: 500, backgroundColor: '#fff' }}
    >
      <h2 className='mb-4'>Ro'yxatdan o'tish</h2>
      <Form.Item
        name={'name'}
        label='Ism'
        rules={[
          {
            required: true,
            message: 'Iltimos, ismingizni kiriting!'
          }
        ]}
        autoComplete='off'
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={'email'}
        label='Email'
        rules={[
          {
            required: true,
            message: 'Iltimos, emailingizni kiriting!'
          }
        ]}
        autoComplete='off'
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='Telefon'
        name='phone'
        rules={[
          {
            required: true,
            message: 'Iltimos, telefon raqamingizni kiriting!'
          }
        ]}
        autoComplete='off'
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
        <Link className='login-form-forgot' to='/login'>
          Avval ro'yxatdan o'tganmisiz?
        </Link>
      </Form.Item>

      <Form.Item>
        <Button
          type='primary'
          htmlType='submit'
          className='login-form-button mr-2 mb-2'
        >
          Ro'yxatdan o'tish
        </Button>
        <Button type='secondary' className='login-form-button'>
          <Link to='/login'>Kirish</Link>
        </Button>
      </Form.Item>
    </Form>
  )
}
