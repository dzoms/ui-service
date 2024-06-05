import { useKeycloak } from '@react-keycloak/web'
import { useEffect, useRef } from 'react'
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

  const goToUserSettings = async () => {
    navigate(`/settings`)
  }

  const handleLogout = () => {
    keycloak.logout()
  }

  return (
    <div className='settings' ref={ref}>
      <span>Привет, {keycloak.tokenParsed.preferred_username}</span>
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
      <button className='setting' onClick={goToUserSettings}>
        настройки
      </button>
      <button className='exit' onClick={handleLogout}>
        выход
      </button>
    </div>
  )
}
