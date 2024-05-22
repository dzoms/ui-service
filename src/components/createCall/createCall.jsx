// components/CreateCall.jsx
import "./createCall.css";
import React, { useState } from "react";
import { createMeeting, authToken } from "../VideoCall/API";
import SettingsMeeting from "../SettingsMeeting/SettingsMeeting";

const CreateCall = () => {
  const [meetingId, setMeetingId] = useState(null);
  const [isMeetingCreated, setIsMeetingCreated] = useState(false);

  const handleCreateMeeting = async () => {
    const id = await createMeeting({ token: authToken });
    console.log("id: ", id);
    setMeetingId(id);
    setIsMeetingCreated(true);
  };

  return (
    <>
      {!isMeetingCreated ? (
        <div className="create-call">
          <span>Создать звонок</span>
          <button onClick={handleCreateMeeting}>Создать</button>
        </div>
      ) : (
        <SettingsMeeting meetingId={meetingId} />
      )}
    </>
  );
};

export default CreateCall;