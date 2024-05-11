import React, { useState } from 'react'
import Register from './../../components/Register/Register.jsx'
import './Entry.css'

export default function Entry() {
  const [showRegister, setShowRegister] = useState(false)

  const entryClick = () => {
    setShowRegister(true)
  }

  return (
    <div className='right'>
      {!showRegister && (
        <div className='block'>
          <span>вход</span>
          <input type='text' placeholder='логин' />
          <input type='text' placeholder='пароль' />
          <button>войти</button>
        </div>
      )}

      {!showRegister && <button onClick={entryClick}>создать аккаунт</button>}

      {showRegister && <Register />}
    </div>
  )
}
