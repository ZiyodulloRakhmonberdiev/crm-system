import hero from '../assets/img/hero.png'
import { Button } from 'antd'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Hero () {
  const [loading, setLoading] = useState(false)
  const [loadingLogin, setLoadingLogin] = useState(false)
  const timeOut = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }
  const timeOutLogin = () => {
    setLoadingLogin(true)
    setTimeout(() => {
      setLoadingLogin(false)
    }, 1000)
  }
  return (
    <div className='hero'>
      <div className='d-flex'>
        {/* Text content */}
        <div className='pa-10 hero__text-content'>
          <h1>
            Biz bilan ajoyib CRM tizimini tashkil et. Mijozlar ma'lumotlarini
            oson boshqar!
          </h1>
          <h4 type='secondary'>
            CRM tizimi - ma'lumotlarni vizualizatsiya qilishni, elektron pochta
            va boshqalar yordamida mijozlar bilan munosabatlaringizni tartibga
            solish va kengaytirishni osonlashtiradi
          </h4>

          {/* Buttons group */}
          <div className='mt-5 d-flex sm-d-block pb-5'>
            <Button
              type='primary'
              className='mr-5 mb-2'
              loading={loading}
              onClick={timeOut}
            >
              <Link to='/register'>Ro'yxatdan o'tish</Link>
            </Button>
            <Button
              type='default'
              loading={loadingLogin}
              onClick={timeOutLogin}
            >
              <Link to='/login'>Kirish</Link>
            </Button>
          </div>
        </div>

        {/* Image content */}
        <div className='lg-d-none'>
          <img src={hero} alt='' />
        </div>
      </div>
    </div>
  )
}
