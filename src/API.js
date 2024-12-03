import { APP_URL } from './constants/constants';

// unsafe Token
export const authToken = import.meta.env.VITE_VIDEOSDK_TOKEN;

// create a meetingId
export const createMeeting = async () => {
  const res = await fetch(`${APP_URL}/v2/rooms`, {
    method: 'POST',
    headers: {
      authorization: `${authToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  });
  const { roomId } = await res.json();
  return roomId;
};

// start individual recording
export const startParticipantRecording = async (roomId, participantId) => {
  const options = {
    method: 'POST',
    headers: {
      Authorization: authToken,
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      roomId,
      participantId,
      fileFormat: 'webm',
      bucketDirPath: null,
      webhookUrl: null,
    }),
  };

  const url = `${APP_URL}/v2/recordings/participant/start`;
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
};

// stop individual recording
export const stopParticipantRecording = async (roomId, participantId) => {
  const options = {
    method: 'POST',
    headers: {
      Authorization: authToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      roomId,
      participantId,
    }),
  };

  const url = `${APP_URL}/v2/recordings/participant/stop`;
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
};
