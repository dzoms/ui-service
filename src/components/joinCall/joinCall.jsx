import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Добавляем useNavigate
import "./joinCall.css";

const JoinCall = () => {
  const [meetingId, setMeetingId] = useState("");
  const navigate = useNavigate(); // Инициализируем useNavigate

  const handleJoinMeeting = () => {
    if (meetingId.trim()) {
      // После ввода кода доступа, переадресовываем пользователя
      navigate(`/call/${meetingId}`);
    } else {
      alert("Пожалуйста, введите код доступа к звонку");
    }
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
        <button onClick={handleJoinMeeting}>Присоединиться</button>
      </div>
    </div>
  );
};

export default JoinCall;
