import { Facebook, Instagram, Telegram } from 'react-bootstrap-icons'
import logo from '../assets/img/logo.png'
import { Link } from 'react-router-dom'

export default function Header () {
  return (
    <header className='header py-5'>
      <div className='d-flex justify-space-between align-center'>
        <div className='navbar__logo'>
          <Link to='/'>
            <img src={logo} alt='' />
          </Link>
        </div>
        <div className='navbar d-flex align-center flex-row'>
          <div className='md-d-none'>+998 91 600 00 00</div>
          <ul className='d-flex mx-5 my-auto'>
            <li className='mx-2'>
              <a href='#' className='facebook'>
                <Facebook />
              </a>
            </li>
            <li className='mx-2'>
              <a href='#' className='instagram'>
                <Instagram />
              </a>
            </li>
            <li className='mx-2'>
              <a href='#' className='telegram'>
                <Telegram />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}
