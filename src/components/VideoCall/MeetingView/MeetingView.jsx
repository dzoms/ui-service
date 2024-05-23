import React, { useEffect, useMemo, useState } from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
import Chat from "../Chat/Chat";
import ParticipantView from "../ParticipantView/ParticipantView";
import ParticipantsList from "../ParticipantsList/ParticipantsLists"; // Если не используется, можно убрать
import Controls from "../Controls/Controls";
import "./MeetingView.css";

const MeetingView = ({ meetingId, onMeetingLeave }) => {
  const [joined, setJoined] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { join, leave, toggleMic, toggleWebcam, participants } = useMeeting({
    onMeetingJoined: () => setJoined("JOINED"),
    onMeetingLeft: () => {
      onMeetingLeave();
    },
  });

  const toggleModal = () => setShowModal(!showModal);

  const participantsWithCamera = useMemo(
    () => [...participants.keys()].filter((pid) => participants.get(pid).webcamOn),
    [participants]
  );

  const participantsWithoutCamera = useMemo(
    () => [...participants.keys()].filter((pid) => !participants.get(pid).webcamOn),
    [participants]
  );

  const joinMeeting = () => {
    setJoined("JOINING");
    join();
  };

  return (
    <div className="meeting-container">
      <h3>Meeting Id: {meetingId}</h3>
      {joined && joined === "JOINED" ? (
        <>
          <div className="meeting-content">
            <ParticipantsList /> {/* Убедитесь, что этот компонент нужен, иначе уберите его */}
            <div className="participants-and-chat">
              <div className="participants-grid">
                {participantsWithCamera.map((participantId) => (
                  <ParticipantView
                    participantId={participantId}
                    key={participantId}
                  />
                ))}
                {participantsWithoutCamera.map((participantId) => (
                  <ParticipantView
                    participantId={participantId}
                    key={participantId}
                  />
                ))}
              </div>
              <Chat />
            </div>
          </div>
          <Controls
            leave={leave}
            toggleMic={toggleMic}
            toggleWebcam={toggleWebcam}
            onShowMeetingInfo={toggleModal}
          />
          {showModal && (
            <div className="overlay-meeting">
              <div className="modal-overlay">
                <p>Meeting ID: {meetingId}</p>
                <button onClick={() => navigator.clipboard.writeText(meetingId)}>
                  Copy Meeting ID
                </button>
                <button onClick={toggleModal}>Close</button>
              </div>
            </div>
          )}
        </>
      ) : joined && joined === "JOINING" ? (
        <p>Joining the meeting...</p>
      ) : (
        <button onClick={joinMeeting}>Join</button>
      )}
    </div>
  );
};

export default MeetingView;