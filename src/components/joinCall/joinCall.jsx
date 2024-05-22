// components/JoinCall.jsx
import React, { useState } from "react";
import SettingsMeeting from "../SettingsMeeting/SettingsMeeting";
import "./joinCall.css";

const JoinCall = () => {
  const [meetingId, setMeetingId] = useState("");
  const [isJoining, setIsJoining] = useState(false);

  const handleStartJoining = () => {
    if (meetingId.trim()) {
      setIsJoining(true);
    } else {
      alert("Пожалуйста, введите код доступа к звонку");
    }
  };

  const handleCloseModal = () => {
    setIsJoining(false);
  };

  return (
    <div className="join-call-container">
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

      {isJoining && (
        <div className="modal">
          <div className="modal-content">
            <SettingsMeeting meetingId={meetingId} />
            <button className="close-modal" onClick={handleCloseModal}>Закрыть</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JoinCall;