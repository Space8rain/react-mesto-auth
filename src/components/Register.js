import React from 'react'
import { Link } from 'react-router-dom'
import AuthForm from './AuthForm'
import '../blocks/sign-up/__link/sign-up__link.css'


function Register ({onRegister}) {

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  function handleChange(evt) {
    if (evt.target.name === 'email') {
      setEmail(evt.target.value)
    } else if (evt.target.name === 'password') {
      setPassword(evt.target.value)
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(email, password);
  }

  return (

      <AuthForm
        formName='register'
        formTitle='Регистрация'
        emailValue={email}
        passwordValue={password}
        onChange={handleChange}
        submitTitle='Зарегистрироваться'
        submit={handleSubmit}
      >
        <Link to='/sign-in' className='sign-up__link'>Уже зарегистрированы? Войти</Link>
      </AuthForm>
  )
}

export default Register