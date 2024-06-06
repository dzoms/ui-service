import { faCalendar, faClock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useKeycloak } from '@react-keycloak/web'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom' // Import useNavigate for navigation
import { userSettingsApi } from '../UserSettings/UserSettingsApi'
import { getAvatarUrl } from '../misc/Helpers'
import { notificationApi } from './NotificationServiceApi'
import './notificationCall.css'
import avatar from '/image/logo.png'

export default function NotificationCall() {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [userDetails, setUserDetails] = useState({})
  const { keycloak } = useKeycloak()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await notificationApi.getNotifications(keycloak.token)
        setNotifications(response.data)
        setLoading(false)

        const userIds = Array.from(new Set(response.data.map((n) => n.senderId)))
        userIds.forEach(async (userId) => {
          try {
            const userResponse = await userSettingsApi.getUserSettings(keycloak.token, userId)
            const { username, avatar } = userResponse.data
            setUserDetails((prev) => ({
              ...prev,
              [userId]: { username, avatar },
            }))
          } catch (error) {
            console.error('Error fetching user details:', error)
          }
        })
      } catch (err) {
        console.error('Error fetching notifications:', err)
        setLoading(false)
      }
    }

    fetchNotifications()
  }, [keycloak.token])

  if (loading) return <div>Loading...</div>

  const joinMeeting = (meetingId) => {
    navigate(`/call/${meetingId}`)
  }

  return (
    <div className='notification-call-container'>
      {notifications.length > 0 ? (
        notifications.map((notification, index) => {
          const user = userDetails[notification.senderId] || {}
          const avatarUrl = user.avatar ? getAvatarUrl(user.avatar) : avatar
          const userName = user.username || 'Неизвестный пользователь'

          return (
            <div key={index} className='notification-call'>
              <div className='avatar'>
                <img src={avatarUrl} alt='Avatar' />
              </div>
              <div className='info-call'>
                <div className='invitation'>
                  <span>{userName} приглашает вас на собрание </span>
                </div>
                <div className='time'>
                  <FontAwesomeIcon icon={faClock} />
                  <span>{new Date(notification.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className='data'>
                  <FontAwesomeIcon icon={faCalendar} />
                  <span>{new Date(notification.time).toLocaleDateString('ru-RU')}</span>
                </div>
                <button className='join-call-button' onClick={() => joinMeeting(notification.meetingId)}>
                  Присоединиться
                </button>
              </div>
            </div>
          )
        })
      ) : (
        <div>Уведомления не найдены</div>
      )}
    </div>
  )
}
