// components/JoinCall.jsx
import React, { useState } from "react";
import SettingsMeeting from "../SettingsMeeting/SettingsMeeting";
import "./joinCall.css";

const JoinCall = () => {
  const [meetingId, setMeetingId] = useState("");
  const [isJoining, setIsJoining] = useState(false);

  const handleJoinMeeting = async () => {
    return meetingId;
  };

  const handleStartJoining = () => {
    if (meetingId.trim()) {
      setIsJoining(true);
    } else {
      alert("Пожалуйста, введите код доступа к звонку");
    }
  };

  return (
    <>
      {!isJoining ? (
        <div className="join-call">
          <span>Присоединиться к звонку</span>
          <input
            type="text"
            value={meetingId}
            onChange={(e) => setMeetingId(e.target.value)}
            placeholder="код доступа"
          />
          <button onClick={handleStartJoining}>Присоединиться</button>
        </div>
      ) : (
        <SettingsMeeting meetingId={meetingId} />
      )}
    </>
  );
};

export default JoinCall;