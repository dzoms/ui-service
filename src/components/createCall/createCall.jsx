// components/CreateCall.jsx
import React, { useState } from "react";
import { createMeeting, authToken } from "../VideoCall/API";
import SettingsMeeting from "../SettingsMeeting/SettingsMeeting";
import "./createCall.css";

const CreateCall = () => {
  const [meetingId, setMeetingId] = useState(null);
  const [isMeetingCreated, setIsMeetingCreated] = useState(false);

  const handleCreateMeeting = async () => {
    const id = await createMeeting({ token: authToken });
    console.log("id: ", id);
    setMeetingId(id);
    setIsMeetingCreated(true);
  };

  const handleCloseModal = () => {
    setIsMeetingCreated(false);
  };

  return (
    <div className="create-call-container">
      <div className="create-call">
        <span>Создать звонок</span>
        <button onClick={handleCreateMeeting}>Создать</button>
      </div>

      {isMeetingCreated && (
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

export default CreateCall;