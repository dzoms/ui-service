import { faCalendar, faClock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './notificationCall.css'
import avatar from '/image/logo.png'

export default function NotificationCall() {
  return (
    <div className='notification-call'>
      <div className='avatar'>
        <img src={avatar} alt='Avatar' />
      </div>
      <div className='info-call'>
        <div className='invitation'>
          <span>Фамилия Имя</span> приглашает вас на собрание
        </div>
        <div className='time'>
          <FontAwesomeIcon icon={faClock} />
          <span>12:00</span>
        </div>
        <div className='data'>
          <FontAwesomeIcon icon={faCalendar} />
          <span>24 августа</span>
        </div>
      </div>
    </div>
  )
}
