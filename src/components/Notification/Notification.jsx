import { useEffect, useRef } from 'react'
import NotificationCall from './../../components/notificationCall/notificationCall'
import './Notification.css'

export default function Notification({ bellRef, onClose }) {
  const ref = useRef()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target) && bellRef.current && !bellRef.current.contains(event.target)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose, bellRef])

  return (
    <div className='notification' ref={ref}>
      <NotificationCall />
    </div>
  )
}
