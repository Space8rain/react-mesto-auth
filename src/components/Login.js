import React from 'react'
import AuthForm from './AuthForm'

function Login ({onLogin}) {

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
    if (!email || !password) {
      return;
    }
    onLogin(email, password);
  }

  return (
    <AuthForm 
      formName='login'
      formTitle='Вход'
      emailValue={email}
      passwordValue={password}
      onChange={handleChange}
      submitTitle='Войти'
      submit={handleSubmit}
    />
  )
}

export default Login