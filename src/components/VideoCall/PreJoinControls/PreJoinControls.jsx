import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './PreJoinControls.css'

const PreJoinControls = ({ isMicOnn, setIsMicOnn, isCameraOnn, setIsCameraOnn, namen, setNamen, joinMeeting }) => {
  const navigate = useNavigate()
  const videoRef = useRef(null)

  useEffect(() => {
    if (isCameraOnn) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream
        })
        .catch((error) => {
          console.error('Error accessing media devices.', error)
        })
    } else {
      if (videoRef.current) {
        let tracks = videoRef.current.srcObject ? videoRef.current.srcObject.getTracks() : []
        tracks.forEach((track) => track.stop())
        videoRef.current.srcObject = null
      }
    }
  }, [isCameraOnn])

  const toggleMic = () => setIsMicOnn(!isMicOnn)
  const toggleCamera = () => setIsCameraOnn(!isCameraOnn)

  return (
    <div className='pre-join-container'>
      <div className='video-preview'>
        {isCameraOnn ? <video ref={videoRef} autoPlay muted className='local-video-preview'></video> : <div className='camera-off-preview'>Камера выключена</div>}
      </div>
      <div className='controls'>
        <div class='up'>
          <input type='text' placeholder='Введите ваше имя' value={namen} onChange={(e) => setNamen(e.target.value)} className='name-input' />
        </div>
        <div class='down'>
          <button onClick={toggleMic}>{isMicOnn ? 'Выключить микрофон' : 'Включить микрофон'}</button>
          <button onClick={toggleCamera}>{isCameraOnn ? 'Выключить камеру' : 'Включить камеру'}</button>
        </div>
      </div>
      <div className='action-buttons'>
        <button class='cancel-button' onClick={() => navigate('/')}>
          Выход
        </button>
        <button class='start-button' onClick={() => joinMeeting(isMicOnn, isCameraOnn, namen)}>
          Присоединиться
        </button>
      </div>
    </div>
  )
}

export default PreJoinControls
