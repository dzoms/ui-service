<<<<<<< HEAD
=======
import { useKeycloak } from '@react-keycloak/web'
>>>>>>> 6a43db5ac4abff2c3e93161954d8615bb3bfbbd7
import { MeetingProvider } from '@videosdk.live/react-sdk'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { authToken, createMeeting } from '../../components/VideoCall/API'
import MeetingView from '../../components/VideoCall/MeetingView/MeetingView'
import './CallPage.css'

const CallPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { meetingId } = useParams()
  console.log('id: ', meetingId)

  const [isMicOnn, setIsMicOnn] = useState(true)
  const [isCameraOnn, setIsCameraOnn] = useState(true)
  const [namen, setNamen] = useState('Name')
  const { keycloak } = useKeycloak()

  const getOrCreateMeeting = async () => {
    if (!meetingId) {
      const id = await createMeeting({ token: authToken })
      navigate(`/call/${id}`)
    }
  }

  const onMeetingLeave = () => {
    navigate('/')
  }

  useEffect(() => {
    if (!meetingId) {
      getOrCreateMeeting()
    }
  }, [meetingId])
<<<<<<< HEAD

=======
>>>>>>> 6a43db5ac4abff2c3e93161954d8615bb3bfbbd7

  return authToken && meetingId ? (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: isMicOnn,
        webcamEnabled: isCameraOnn,
        name: namen || 'No Name',
      }}
      token={authToken}
    >
      <MeetingView
        meetingId={meetingId}
        onMeetingLeave={onMeetingLeave}
        isMicOnn={isMicOnn}
        setIsMicOnn={setIsMicOnn}
        isCameraOnn={isCameraOnn}
        setIsCameraOnn={setIsCameraOnn}
        namen={namen}
        setNamen={setNamen}
      />
    </MeetingProvider>
  ) : (
    <p>Loading...</p>
  )
}

export default CallPage
