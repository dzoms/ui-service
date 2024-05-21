// components/JoinCall.jsx
import React, { useState } from "react";
import SettingsMeeting from "../../components/SettingsMeeting/SettingsMeeting";
import "./joinCall.css";

const JoinCall = () => {
  const [meetingId, setMeetingId] = useState("");
  const [isJoining, setIsJoining] = useState(false);

  const handleJoinMeeting = async () => {
    setIsJoining(true);
    return meetingId;
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
          <button onClick={() => setIsJoining(true)}>Присоединиться</button>
        </div>
      ) : (
        <SettingsMeeting onCreateMeeting={handleJoinMeeting} />
      )}
    </>
  );
};

export default JoinCall;