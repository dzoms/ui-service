import React, { useEffect, useState } from "react";
import { MeetingProvider } from "@videosdk.live/react-sdk";
import { useLocation, useNavigate } from "react-router-dom";
import MeetingView from "../../components/VideoCall/MeetingView/MeetingView";
import SettingsMeeting from "../../components/SettingsMeeting/SettingsMeeting";
import { authToken, createMeeting, validateMeeting } from "../../components/VideoCall/API";
import "./CallPage.css";

const CallPage = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Используем useNavigate внутри компонента
  const { name, isMicOn, isCameraOn, meetingId: providedMeetingId } = location.state || {};
  const [meetingId, setMeetingId] = useState(providedMeetingId || null);

  const getOrCreateMeeting = async () => {
    const id = meetingId || await createMeeting({ token: authToken });
    setMeetingId(id);
  };

  const onMeetingLeave = () => {
    setMeetingId(null);
    navigate('/');
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