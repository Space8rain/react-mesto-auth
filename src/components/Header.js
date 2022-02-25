import React from 'react'
import logoPath from '../images/header_logo.png'
import {Route, Link} from 'react-router-dom'

function Header({userEmail, onLogOut}) {
  return (
    <header className="header">
      <img className="header__logo" src={logoPath} alt="лого Mesto Russia" />

      <Route path={'/sign-up'}>
        <Link to='/sign-in' className='header__auth-link'>
          Войти
        </Link>
      </Route>

      <Route path={'/sign-in'}>
        <Link to='/sign-up' className='header__auth-link'>
          Регистрация
        </Link>
      </Route>

      <Route exact path={'/'}>
        <div className='header__wrap'>
          <p className='header__auth-link'>{userEmail}</p>
          <Link to='/sign-in' onClick={onLogOut} className='header__auth-link'>
            Выйти
          </Link>
        </div>
      </Route>
    </header>

    
  )
}

export default Header