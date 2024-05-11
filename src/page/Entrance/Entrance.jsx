import React, { useState } from 'react'
import Entry from './../../components/Entry/Entry'
import Register from './../../components/Register/Register'
import './Entrance.css'
import logo from '/image/logo.png'
import wave from '/image/wave.png'

export default function Entrance() {
  const [isRegisterShown, setIsRegisterShown] = useState(true)

  const toggleComponent = () => {
    setIsRegisterShown(!isRegisterShown)
  }

  return (
    <div className='entrance'>
      <div className='left'>
        <img src={logo} />
        <span>Dzoms</span>
      </div>
      <div className='right'>{isRegisterShown ? <Entry toggleComponent={toggleComponent} /> : <Register toggleComponent={toggleComponent} />}</div>
      <img src={wave} />
    </div>
  )
}
