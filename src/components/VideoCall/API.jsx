export const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJjM2IwMmIyZC0zNzYyLTQ2Y2MtYmE3MS00ZTA2YjlkNTAxNWIiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcxNjM4MTUyNSwiZXhwIjoxNzE2NDY3OTI1fQ.4R3jkiQcJsd9snDny3-T4sjY62EtVSRcWAHnFS6UJHA";

// API call to create meeting
export const createMeeting = async ({ token }) => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: "POST",
    headers: {
      authorization: `${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });

  const { roomId } = await res.json();
  return roomId;
};
