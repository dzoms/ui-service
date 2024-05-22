// components/SettingsMeeting.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./SettingsMeeting.css";

const SettingsMeeting = ({ meetingId }) => {
  const [name, setName] = useState("");
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const videoRef = useRef(null);
  const [cameraStream, setCameraStream] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getMediaStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setCameraStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Ошибка доступа к камере и микрофону:", err);
      }
    };

    if (!cameraStream) {
      getMediaStream();
    }

    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraStream]);

  const toggleMic = () => {
    setIsMicOn(!isMicOn);
    if (cameraStream) {
      const audioTracks = cameraStream.getAudioTracks();
      if (audioTracks.length > 0) {
        audioTracks[0].enabled = !isMicOn;
      }
    }
  };

  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn);
    if (cameraStream) {
      const videoTracks = cameraStream.getVideoTracks();
      if (videoTracks.length > 0) {
        videoTracks[0].enabled = !isCameraOn;
      }
    }
  };

  const handleJoin = () => {
    if (name.trim()) {
      if (meetingId) {
        console.log("name ", name);
        console.log("isMicOn ", isMicOn);
        console.log("isCameraOn ", isCameraOn);

        navigate(`/call`, { state: { name, isMicOn, isCameraOn, meetingId } });
      } else {
        alert("Ошибка при присоединении к конференции. Попробуйте снова.");
      }
    } else {
      alert("Пожалуйста, введите ваше имя");
    }
  };

  return (
    <div className="pre-meeting-setup">
      <h2>Настройка собрания</h2>
      <div className="preview-container">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
        />
        <div className="camera-controls">
          <button onClick={toggleCamera}>
            {isCameraOn ? "Выключить камеру" : "Включить камеру"}
          </button>
          <button onClick={toggleMic}>
            {isMicOn ? "Выключить микрофон" : "Включить микрофон"}
          </button>
        </div>
      </div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Введите ваше имя"
      />
      <button onClick={handleJoin}>Присоединиться</button>
    </div>
  );
};

export default SettingsMeeting;