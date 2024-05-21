import { faBell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

import Notification from './../../components/Notification/Notification'
import './Header.css'
import logo from '/image/logo.png'

export default function Header() {
  const [showNotification, setShowNotification] = useState(false)

  const toggleNotification = () => {
    setShowNotification((prevState) => !prevState)
  }

  return (
    <header>
      <div className='left'>
        <img src={logo} alt='Logo' />
        <div className='name-logo'>Dzoms</div>
      </div>
      <div className='right'>
        <FontAwesomeIcon icon={faBell} onClick={toggleNotification} />
        <div className='user-photo'></div>
      </div>
      {showNotification && <Notification onClose={() => setShowNotification(false)} />}
    </header>
  )
}
