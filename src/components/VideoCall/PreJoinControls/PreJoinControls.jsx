import React from "react";
import { useNavigate } from "react-router-dom";
import "./PreJoinControls.css";

const PreJoinControls = ({ isMicOnn, setIsMicOnn, isCameraOnn, setIsCameraOnn, namen, setNamen, joinMeeting }) => {
  const navigate = useNavigate();

  const toggleMic = () => setIsMicOnn(!isMicOnn);
  const toggleCamera = () => setIsCameraOnn(!isCameraOnn);

  return (
    <div className="pre-join-container">
      <div className="video-preview">
        {isCameraOnn ? (
          <video autoPlay muted className="local-video-preview"></video>
        ) : (
          <div className="camera-off-preview">Камера выключена</div>
        )}
      </div>
      <div className="controls">
        <input
          type="text"
          placeholder="Введите ваше имя"
          value={namen}
          onChange={(e) => setNamen(e.target.value)}
          className="name-input"
        />
        <button onClick={toggleMic}>
          {isMicOnn ? "Выключить микрофон" : "Включить микрофон"}
        </button>
        <button onClick={toggleCamera}>
          {isCameraOnn ? "Выключить камеру" : "Включить камеру"}
        </button>
      </div>
      <div className="action-buttons">
        <button onClick={() => navigate("/")}>Выход</button>
        <button onClick={() => joinMeeting(isMicOnn, isCameraOnn, namen)}>Присоединиться</button>
      </div>
    </div>
  );
};

export default PreJoinControls;
