import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Добавляем useNavigate
import { createMeeting, authToken } from "../VideoCall/API";
import "./createCall.css";

const CreateCall = () => {
  const [meetingId, setMeetingId] = useState(null);
  const navigate = useNavigate(); // Инициализируем useNavigate

  const handleCreateMeeting = async () => {
    const id = await createMeeting({ token: authToken });
    console.log("id: ", id);
    setMeetingId(id);
    // После создания встречи, переадресовываем пользователя
    navigate(`/call/${id}`);
  };

  return (
    <div className="create-call-container">
      <div className="create-call">
        <span>Создать звонок</span>
        <button onClick={handleCreateMeeting}>Создать</button>
      </div>
    </div>
  );
};

export default CreateCall;