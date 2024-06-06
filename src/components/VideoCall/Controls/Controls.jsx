import { faMicrophone, faMicrophoneSlash, faVideo, faVideoSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import './Controls.css'

const Controls = ({ leave, toggleMic, toggleWebcam, onShowMeetingInfo }) => {
  const [isMicOn, setIsMicOn] = useState(false)
  const [isWebcamOn, setIsWebcamOn] = useState(false)

  const handleToggleMic = () => {
    toggleMic()
    setIsMicOn(!isMicOn)
  }

  const handleToggleWebcam = () => {
    toggleWebcam()
    setIsWebcamOn(!isWebcamOn)
  }

  return (
    <div className='controls'>
      <button onClick={() => leave()}>Выйти</button>
      <button onClick={handleToggleMic}>{isMicOn ? <FontAwesomeIcon icon={faMicrophone} /> : <FontAwesomeIcon icon={faMicrophoneSlash} />}</button>
      <button onClick={handleToggleWebcam}>{isWebcamOn ? <FontAwesomeIcon icon={faVideo} /> : <FontAwesomeIcon icon={faVideoSlash} />}</button>
      <button onClick={onShowMeetingInfo}>Пригласить</button>
    </div>
  )
}

export default Controls
