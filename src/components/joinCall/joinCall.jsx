import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './joinCall.css'

const JoinCall = () => {
  const [meetingId, setMeetingId] = useState('')
  const navigate = useNavigate()

  const handleJoinMeeting = () => {
    if (meetingId.trim()) {
      navigate(`/call/${meetingId}`)
    } else {
      alert('Пожалуйста, введите код доступа к звонку')
    }
  }

  return (
    <div className='join-call-container'>
      <div className='join-call'>
        <span>Присоединиться к звонку</span>
        <input type='text' value={meetingId} onChange={(e) => setMeetingId(e.target.value)} placeholder='код доступа' />
        <button onClick={handleJoinMeeting}>Присоединиться</button>
      </div>
    </div>
  )
}

export default JoinCall
