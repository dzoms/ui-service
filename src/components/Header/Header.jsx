import { faBell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef, useState } from 'react'

import Notification from './../../components/Notification/Notification'
import Settings from './../../components/Settings/Settings'

import { useKeycloak } from '@react-keycloak/web'
import { userSettingsApi } from '../SettingsUser/UserSettingsApi'
import { getAvatarUrl } from '../misc/Helpers'
import './Header.css'
import logo from '/image/logo.png'

export default function Header() {
  const [showNotification, setShowNotification] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const bellRef = useRef(null)
  const avatarRef = useRef(null)

  const { keycloak } = useKeycloak()
  const [avatar, setAvatar] = useState('')
  const [imageLoading, setImageLoading] = useState(true)

  const toggleNotification = () => {
    setShowNotification((prevState) => !prevState)
    setShowSettings(false) // Скрыть настройки при открытии уведомлений
  }

  const toggleSettings = () => {
    setShowSettings((prevState) => !prevState)
    setShowNotification(false) // Скрыть уведомления при открытии настроек
  }

  useEffect(() => {
    const fetchAvatar = async () => {
      if (keycloak.authenticated) {
        try {
          const response = await userSettingsApi.getUserSettings(keycloak.token, keycloak.subject)
          setAvatar(response.data.avatar)
        } catch (error) {
          console.error('Error fetching user settings:', error)
        }
      }
    }

    fetchAvatar()
  }, [keycloak])

  const avatarImage = !avatar ? null : (
    <img
      src={getAvatarUrl(avatar)}
      onLoad={() => setImageLoading(false)}
      alt='user-avatar'
      ref={avatarRef}
      style={{ display: imageLoading ? 'none' : 'block' }}
      onClick={toggleSettings}
    />
  )

  return (
    <header>
      <div className='left'>
        <img src={logo} alt='Logo' />
        <div className='name-logo'>Dzoms</div>
      </div>
      <div className='right'>
        <FontAwesomeIcon icon={faBell} onClick={toggleNotification} ref={bellRef} />
        <div className='user-photo'>{avatarImage}</div>
      </div>
      {showNotification && <Notification bellRef={bellRef} onClose={() => setShowNotification(false)} />}
      {showSettings && <Settings avatarRef={avatarRef} onClose={() => setShowSettings(false)} />}
    </header>
  )
}
