import React from 'react'

function AuthForm({ formName, formTitle, emailValue, passwordValue, onChange, submitTitle, submit, ...props }) {
  return (
    <div className={formName}>
      <div className='sign-up'>
        <p className='sign-up__title'>{formTitle}</p>
        <form className="sign-up__form" onSubmit={submit}>
          <input
            required
            className='sign-up__input'
            placeholder="Email"
            name='email'
            type='email'
            value={emailValue}
            onChange={onChange}
          />
          <input
            required
            className='sign-up__input'
            placeholder="Пароль"
            name='password'
            type='password'
            value={passwordValue}
            onChange={onChange}
          />
          <button type="submit" className="sign-up__button">{submitTitle}</button>
        </form>
        {props.children}
      </div>
    </div>
  )
}

export default AuthForm

