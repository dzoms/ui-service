import React from "react";
import "./Controls.css";

const Controls = ({ leave, toggleMic, toggleWebcam, onShowMeetingInfo }) => {
  return (
    <div className="controls">
      <button onClick={() => leave()}>Leave</button>
      <button onClick={() => toggleMic()}>Toggle Mic</button>
      <button onClick={() => toggleWebcam()}>Toggle Webcam</button>
      <button onClick={onShowMeetingInfo}>Meeting Info</button>
    </div>
  );
};

export default Controls;