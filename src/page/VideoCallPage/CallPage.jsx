// components/CallPage.jsx
import React, { useEffect, useRef, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./CallPage.css";

const CallPage = () => {
  const { meetingId } = useParams();
  const location = useLocation();
  const { name, isMicOn: initialMicStatus, isCameraOn: initialCameraStatus } = location.state;

  const [isMicOn, setIsMicOn] = useState(initialMicStatus);
  const [isCameraOn, setIsCameraOn] = useState(initialCameraStatus);
  const [cameraStream, setCameraStream] = useState(null);
  const videoRef = useRef(null);

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
        stream.getAudioTracks()[0].enabled = isMicOn;
        stream.getVideoTracks()[0].enabled = isCameraOn;
      } catch (err) {
        console.error("Ошибка доступа к камере и микрофону:", err);
      }
    };
    getMediaStream();

    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isMicOn, isCameraOn]);

  const toggleMic = () => {
    setIsMicOn(!isMicOn);
    if (cameraStream) {
      cameraStream.getAudioTracks()[0].enabled = !isMicOn;
    }
  };

  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn);
    if (cameraStream) {
      cameraStream.getVideoTracks()[0].enabled = !isCameraOn;
    }
  };

  return (
    <div className="call-page">
      <h2>Звонок {meetingId}</h2>
      <p>Привет, {name}!</p>
      <div className="video-container">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
        />
      </div>
      <div className="controls">
        <button onClick={toggleMic}>
          {isMicOn ? "Выключить микрофон" : "Включить микрофон"}
        </button>
        <button onClick={toggleCamera}>
          {isCameraOn ? "Выключить камеру" : "Включить камеру"}
        </button>
      </div>
    </div>
  );
};

export default CallPage;