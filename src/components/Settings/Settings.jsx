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

  const goToSettingsUser = async () => {
    navigate(`/settings`)
  }

  return (
    <div className='settings' ref={ref}>
      <span>Привет, {keycloak.tokenParsed.preferred_username}</span>
      <button class='setting' onClick={goToSettingsUser}>
        Настройки
      </button>
    </div>
  )
}
