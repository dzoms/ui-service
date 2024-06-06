export const authToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJjYmNkZWY1MS1iZTQyLTRhNmEtYjcwYy0yNDRhZjhlNzg0YmYiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcxNzY3MzQ2OCwiZXhwIjoxNzE3NzU5ODY4fQ.V6IJ77llIrCBWjjqmSmTGUOlqggJFgdO367yLgvU1Mk'

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
