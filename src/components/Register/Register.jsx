import React from 'react'
import './Register.css'

export default function Register({ toggleComponent }) {
  return (
    <div className='register'>
      <div className='block'>
        <span>регистрация</span>
        <input type='text' placeholder='логин' />
        <input type='text' placeholder='пароль' />
        <button onClick={toggleComponent}>зарегистрироваться</button>
      </div>
    </div>
  )
}
