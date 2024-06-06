import { useKeycloak } from '@react-keycloak/web'
import { useMeeting } from '@videosdk.live/react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from 'semantic-ui-react'
import { notificationApi } from '../../notificationCall/NotificationServiceApi'
import Chat from '../Chat/Chat'
import Controls from '../Controls/Controls'
import ParticipantView from '../ParticipantView/ParticipantView'
import ParticipantsList from '../ParticipantsList/ParticipantsLists'
import PreJoinControls from '../PreJoinControls/PreJoinControls'
import { userSettingsApi } from './../../UserSettings/UserSettingsApi'
import './MeetingView.css'

const MeetingView = ({ meetingId, onMeetingLeave, isMicOnn, setIsMicOnn, isCameraOnn, setIsCameraOnn, namen, setNamen }) => {
  const [joined, setJoined] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [users, setUsers] = useState([])
  const [searchText, setSearchText] = useState('')
  const { keycloak } = useKeycloak()
  const { join, leave, toggleMic, toggleWebcam, participants } = useMeeting({
    onMeetingJoined: () => setJoined(true),
    onMeetingLeft: () => {
      onMeetingLeave()
    },
  })

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log('fff')
        const response = await userSettingsApi.getAll(keycloak.token)
        console.log(response)
        setUsers(response.data)
      } catch (error) {
        console.error('Ошибка при получении пользователей:', error)
      }
    }

    if (keycloak.authenticated) {
      fetchUsers()
    }
  }, [keycloak])

  const toggleModal = () => setShowModal(!showModal)

  const joinMeeting = (isMicOn, isCameraOn, name) => {
    setJoined('JOINING')
    join({
      name: name,
      micEnabled: isMicOn,
      webcamEnabled: isCameraOn,
    })
  }

  const handleSendNotification = async () => {
    if (selectedUser) {
      try {
        console.log(selectedUser)
        const response = await notificationApi.createNotification(keycloak.token, selectedUser, meetingId)
        console.log('Notification sent:', response.data)
      } catch (error) {
        console.error('Error sending notification:', error)
      }
    } else {
      alert('Please select a user to send the notification.')
    }
  }

  return (
    <div className='meeting-container'>
      {joined ? (
        <>
          <div className='meeting-content'>
            <ParticipantsList />
            <div className='participants-and-chat'>
              <div className='participants-grid'>
                {[...participants.keys()].map((participantId) => (
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
                <div style={{ maxHeight: '150px', overflowY: 'auto', marginTop: '10px' }}>
                  {users.map((user) => (
                    <div key={user.id}>{user.username}</div>
                  ))}
                </div>

                <Button onClick={handleSendNotification}>Send Notification</Button>
                <button className='cancel-button' onClick={toggleModal}>
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
