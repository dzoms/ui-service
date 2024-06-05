import { useKeycloak } from '@react-keycloak/web'
import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './Settings.css'

export default function Settings({ avatarRef, onClose }) {
  const ref = useRef()
  const navigate = useNavigate()
  const { keycloak } = useKeycloak()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target) && avatarRef.current && !avatarRef.current.contains(event.target)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose, avatarRef])

  const handleSettingsClick = () => {
    navigate('/user-settings') // Adjust the route to match the route defined in your routing configuration
  }

  const handleLogout = () => {
    keycloak.logout()
  }

  return (
    <div className='settings' ref={ref}>
      <span>Name</span>
      <div className='active'>
        <div className='status not'>
          <div className='circle'></div>
          <span>не в сети</span>
        </div>
        <div className='status online'>
          <div className='circle'></div>
          <span>онлайн</span>
        </div>
        <div className='status talk'>
          <div className='circle'></div>
          <span>разговариваю</span>
        </div>
      </div>
      <button className='setting' onClick={handleSettingsClick}>
        настройки
      </button>
      <button className='exit' onClick={handleLogout}>
        выход
      </button>
    </div>
  )
}
