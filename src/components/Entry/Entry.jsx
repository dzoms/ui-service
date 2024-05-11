import React from 'react'
import './Entry.css'

export default function Entry({ toggleComponent }) {
  return (
    <div className='entry'>
      <div className='block'>
        <span>вход</span>
        <input type='text' placeholder='логин' />
        <input type='text' placeholder='пароль' />
        <button>войти</button>
      </div>
      <button onClick={toggleComponent}>создать аккаунт</button>
    </div>
  )
}
