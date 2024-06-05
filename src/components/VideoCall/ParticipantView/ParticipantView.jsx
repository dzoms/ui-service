import { useParticipant } from '@videosdk.live/react-sdk'
import React, { useEffect, useMemo, useRef } from 'react'
import ReactPlayer from 'react-player'
import './ParticipantView.css'

const ParticipantView = ({ participantId }) => {
  const micRef = useRef(null)

  const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } = useParticipant(participantId)

  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream()
      mediaStream.addTrack(webcamStream.track)
      return mediaStream
    }
  }, [webcamStream, webcamOn])

  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream()
        mediaStream.addTrack(micStream.track)

        micRef.current.srcObject = mediaStream
        micRef.current.play().catch((error) => console.error('micRef.current.play() failed', error))
      } else {
        micRef.current.srcObject = null
      }
    }
  }, [micStream, micOn])

  return (
    <div className={`participant ${webcamOn ? '' : 'no-camera'}`}>
      <div className='participant-video-container'>
        {webcamOn ? (
          <ReactPlayer
            playsinline
            pip={false}
            light={false}
            controls={false}
            muted={true}
            playing={true}
            url={videoStream}
            height={'200px'}
            width={'100%'}
            onError={(err) => {
              console.log(err, 'participant video error')
            }}
          />
        ) : (
          <div className='no-camera-placeholder'>{displayName}</div>
        )}
        <div className={`mic-status ${micOn ? 'on' : 'off'}`}></div>
      </div>
      <audio ref={micRef} autoPlay playsInline muted={isLocal} />
    </div>
  )
}

export default ParticipantView
