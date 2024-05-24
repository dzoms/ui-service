import { useEffect, useRef } from 'react'
import './Settings.css'

export default function Settings({ avatarRef, onClose }) {
  const ref = useRef()

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

  return (
    <div className='settings' ref={ref}>
      <span>Name</span>
      <div class='active'>
        <div class='not'></div>
        <div class='online'></div>
        <div class='talk'></div>
      </div>
      <div class='setting'></div>
      <div class='exit'>выход</div>
    </div>
  )
}
