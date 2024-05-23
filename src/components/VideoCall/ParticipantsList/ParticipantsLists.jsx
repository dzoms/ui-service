// ParticipantsList.js
import React from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
import "./ParticipantsList.css"; // Импортируйте дополнительные стили

const ParticipantsList = () => {
  const { participants } = useMeeting();

  return (
    <div className="participants-list">
      <h3>Participants</h3>
      <ul>
        {[...participants.keys()].map((participantId) => {
          const participant = participants.get(participantId);
          return (
            <li key={participantId}>
              {participant.displayName} {participant.isLocal ? "(You)" : ""}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ParticipantsList;