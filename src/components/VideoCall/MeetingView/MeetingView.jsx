import { useMeeting } from '@videosdk.live/react-sdk'
import React, { useMemo, useState } from 'react'
import Chat from '../Chat/Chat'
import Controls from '../Controls/Controls'
import ParticipantView from '../ParticipantView/ParticipantView'
import ParticipantsList from '../ParticipantsList/ParticipantsLists'
import PreJoinControls from '../PreJoinControls/PreJoinControls'
import './MeetingView.css'

const MeetingView = ({ meetingId, onMeetingLeave, isMicOnn, setIsMicOnn, isCameraOnn, setIsCameraOnn, namen, setNamen }) => {
  const [joined, setJoined] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const { join, leave, toggleMic, toggleWebcam, participants } = useMeeting({
    onMeetingJoined: () => setJoined(true),
    onMeetingLeft: () => {
      onMeetingLeave()
    },
  })

  const toggleModal = () => setShowModal(!showModal)

  const participantsWithCamera = useMemo(() => [...participants.keys()].filter((pid) => participants.get(pid).webcamOn), [participants])

  const participantsWithoutCamera = useMemo(() => [...participants.keys()].filter((pid) => !participants.get(pid).webcamOn), [participants])

  const joinMeeting = (isMicOn, isCameraOn, name) => {
    setJoined('JOINING')
    join({
      name: name,
      micEnabled: isMicOn,
      webcamEnabled: isCameraOn,
    })
  }

  return (
    <div className='meeting-container'>
      {joined ? (
        <>
          <div className='meeting-content'>
            <ParticipantsList />
            <div className='participants-and-chat'>
              <div className='participants-grid'>
                {participantsWithCamera.map((participantId) => (
                  <ParticipantView participantId={participantId} key={participantId} />
                ))}
                {participantsWithoutCamera.map((participantId) => (
                  <ParticipantView participantId={participantId} key={participantId} />
                ))}
              </div>
              <Chat />
            </div>
          </div>
          <Controls leave={leave} toggleMic={toggleMic} toggleWebcam={toggleWebcam} onShowMeetingInfo={toggleModal} />
          {showModal && (
            <div className='overlay-meeting'>
              <div className='modal-overlay'>
                <p>Meeting ID: {meetingId}</p>
                <button onClick={() => navigator.clipboard.writeText(meetingId)}>Copy Meeting ID</button>
                <button class='cancel-button' onClick={toggleModal}>
                  Закрыть
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <PreJoinControls
          isMicOnn={isMicOnn}
          setIsMicOnn={setIsMicOnn}
          isCameraOnn={isCameraOnn}
          setIsCameraOnn={setIsCameraOnn}
          namen={namen}
          setNamen={setNamen}
          joinMeeting={joinMeeting}
        />
      )}
    </div>
  )
}

export default MeetingView
