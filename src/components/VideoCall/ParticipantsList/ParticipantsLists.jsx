import { useMeeting } from '@videosdk.live/react-sdk'
import React from 'react'
import './ParticipantsList.css'

const ParticipantsList = () => {
  const { participants } = useMeeting()

  return (
    <div className='participants-list'>
      <h3>Участники</h3>
      <ul>
        {[...participants.keys()].map((participantId) => {
          const participant = participants.get(participantId)
          return (
            <li key={participantId}>
              {participant.displayName} {participant.isLocal ? '(You)' : ''}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default ParticipantsList
