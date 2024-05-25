export const authToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJjM2IwMmIyZC0zNzYyLTQ2Y2MtYmE3MS00ZTA2YjlkNTAxNWIiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcxNjU2NzM5OSwiZXhwIjoxNzE2NjUzNzk5fQ.GuePlCZDDwgFoLv9lbAA1nt1g0OyFfgixDZTQPKas2w'

// API call to create meeting
export const createMeeting = async ({ token }) => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: 'POST',
    headers: {
      authorization: `${authToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  })

  const { roomId } = await res.json()
  return roomId
}

export const validateMeeting = async ({ meetingId, token }) => {
  const response = await fetch(`https://api.videosdk.live/v2/rooms/${meetingId}`, {
    method: 'GET',
    headers: {
      Authorization: token,
    },
  })

  return response.status === 200
}
