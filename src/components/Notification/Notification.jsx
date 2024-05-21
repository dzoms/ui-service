import { useEffect, useRef } from 'react'
import NotificationCall from './../../components/notificationCall/notificationCall'
import './Notification.css'

export default function Notification({ onClose }) {
  const ref = useRef()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  return (
    <div className='notification' ref={ref}>
      <NotificationCall />
      <NotificationCall />
    </div>
  )
}
