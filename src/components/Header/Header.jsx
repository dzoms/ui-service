import { faBell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from 'react'

import Notification from './../../components/Notification/Notification'

import { getAvatarUrl } from '../misc/Helpers'
import './Header.css'
import { useKeycloak } from '@react-keycloak/web'
import logo from '/image/logo.png'
import { Link } from 'react-router-dom'
import { userSettingsApi } from '../SettingsUser/UserSettingsApi'

export default function Header() {
  const [showNotification, setShowNotification] = useState(false)

  const { keycloak } = useKeycloak()
  const [avatar, setAvatar] = useState('')
  const [imageLoading, setImageLoading] = useState(true)


  const toggleNotification = () => {
    setShowNotification((prevState) => !prevState)
  }

  useEffect(() => {
    const fetchAvatar = async () => {
      if (keycloak.authenticated) {
        try {
          const response = await userSettingsApi.getUserSettings(keycloak.token, keycloak.subject);
          setAvatar(response.data.avatar);
        } catch (error) {
          console.error("Error fetching user settings:", error);
        }
      }
    };

    fetchAvatar();
  }, [keycloak]);

  const avatarImage = !avatar ? null : (
    <img
      src={getAvatarUrl(avatar)}
      onLoad={() => setImageLoading(false)}
      alt="user-avatar"
      style={{ display: imageLoading ? 'none' : 'block' }}
    />
  );

  

  return (
    <header>
      <div className='left' >
        <img src={logo} alt='Logo' />
        <div className='name-logo'>Dzoms</div>
      </div>
      <div className='right'>
        <FontAwesomeIcon icon={faBell} onClick={toggleNotification} />
        <div className='user-photo'>{avatarImage}</div>
      </div>
      {showNotification && <Notification onClose={() => setShowNotification(false)} />}
    </header>
  )
}
