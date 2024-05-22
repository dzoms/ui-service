import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  MeetingProvider,
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";
import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import "./CallPage.css";
import { authToken, createMeeting } from "../../components/VideoCall/API";
import Chat from "../../components/Chat/Chat"

// Компонент для отображения участника
const ParticipantView = ({ participantId }) => {
  const micRef = useRef(null);
  const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
    useParticipant(participantId);

  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);

  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);

        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch((error) =>
            console.error("micRef.current.play() failed", error)
          );
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  return (
    <div>
      <p>
        Participant: {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} | Mic:{" "}
        {micOn ? "ON" : "OFF"}
      </p>
      <audio ref={micRef} autoPlay playsInline muted={isLocal} />
      {webcamOn && (
        <ReactPlayer
          playsinline
          pip={false}
          light={false}
          controls={false}
          muted={true}
          playing={true}
          url={videoStream}
          height={"300px"}
          width={"300px"}
          onError={(err) => {
            console.log(err, "participant video error");
          }}
        />
      )}
    </div>
  );
};

// Компонент для управления конференцией
const Controls = () => {
  const { leave, toggleMic, toggleWebcam } = useMeeting();
  return (
    <div>
      <button onClick={() => leave()}>Leave</button>
      <button onClick={() => toggleMic()}>Toggle Mic</button>
      <button onClick={() => toggleWebcam()}>Toggle Webcam</button>
    </div>
  );
};

const MeetingView = ({ meetingId, onMeetingLeave }) => {
  const [joined, setJoined] = useState(null);
  const { join } = useMeeting();
  const { participants } = useMeeting({
    onMeetingJoined: () => {
      setJoined("JOINED");
    },
    onMeetingLeft: () => {
      onMeetingLeave();
    },
  });

  const joinMeeting = () => {
    setJoined("JOINING");
    join();
  };

  return (
    <div className="container">
      <h3>Meeting Id: {meetingId}</h3>
      {joined && joined === "JOINED" ? (
        <div>
          <Controls />
          <div className="participants-and-chat">
            <div className="participants">
              {[...participants.keys()].map((participantId) => (
                <ParticipantView participantId={participantId} key={participantId} />
              ))}
            </div>
            <Chat />
          </div>
        </div>
      ) : joined && joined === "JOINING" ? (
        <p>Joining the meeting...</p>
      ) : (
        <button onClick={joinMeeting}>Join</button>
      )}
    </div>
  );
};

// Главный компонент страницы конференции
const CallPage = () => {
  const location = useLocation();
  const { name, isMicOn, isCameraOn, meetingId: providedMeetingId } = location.state || {};
  const [meetingId, setMeetingId] = useState(providedMeetingId || null);

  const getOrCreateMeeting = async () => {
    const id = meetingId || await createMeeting({ token: authToken });
    setMeetingId(id);
  };

  const onMeetingLeave = () => {
    setMeetingId(null);
  };

  useEffect(() => {
    getOrCreateMeeting();
  }, []);

  return authToken && meetingId ? (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: isMicOn,
        webcamEnabled: isCameraOn,
        name: name || "No Name",
      }}
      token={authToken}
    >
      <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
    </MeetingProvider>
  ) : (
    <p>Loading...</p>
  );
};

export default CallPage;