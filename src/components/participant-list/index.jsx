import React, { useState } from 'react';
import micIcon from '../../../public/icons/microphone.png';
import videocamIcon from '../../../public/icons/videocam.png';
import { ListContainer } from '../container/participantlist';
import { startParticipantRecording, stopParticipantRecording } from '../../API';

export const ParticipantList = ({
  participants,
  isParticipantListOpened,
  meetingId,
}) => {
  const [showMenu, setShowMenu] = useState(null);
  const [isRec, setIsRec] = useState(false);

  const handleMenuClick = (id) => {
    setShowMenu((prev) => (prev === id ? null : id)); // Toggle menu
  };

  const handleParticipantRec = async (id) => {
    if (!isRec) {
      await startParticipantRecording(meetingId, id);
    } else {
      await stopParticipantRecording(meetingId, id);
    }

    setIsRec((prev) => !prev);
  };

  return (
    <ListContainer isOpen={isParticipantListOpened}>
      {Array.from(participants.values()).map((participant) => {
        const { id, displayName, local, webcamOn, micOn } = participant;
        return (
          <div
            key={id}
            className="relative bg-white flex items-center justify-between py-4 px-4 rounded-lg border-b border-gray-300 mx-4 my-2"
          >
            {/* Display name or 'You' if the participant is local */}
            <span className="flex-1 text-lg font-medium">
              {local ? 'You' : displayName}
            </span>
            {/* Webcam Icon */}
            <img
              src={videocamIcon}
              alt="Webcam"
              className={`w-7 h-7 ml-2 ${!webcamOn ? 'filter grayscale opacity-50' : ''}`}
            />
            {/* Microphone Icon */}
            <img
              src={micIcon}
              alt="Microphone"
              className={`w-7 h-7 ml-2 ${!micOn ? 'filter grayscale opacity-50' : ''}`}
            />
            {/* Three dots menu */}
            <button
              onClick={() => handleMenuClick(id)}
              className={`ml-2 text-gray-600 hover:text-gray-800 text-2xl w-[40px] ${showMenu === id ? 'bg-[whitesmoke]' : 'bg-none'}`}
            >
              {showMenu === id ? 'x' : '...'}
            </button>

            {/* Dropdown UI for individual recording */}
            {showMenu === id && (
              <div className="absolute z-10 flex bg-white border border-gray-300 shadow-md p-2 rounded mt-2 w-40 top-8 right-16">
                <button
                  className="block w-full text-left text-sm text-gray-700 py-1 px-2 hover:bg-gray-200"
                  onClick={() => handleParticipantRec(id)}
                >
                  {isRec ? 'stop: recording... ' : 'start Recording'}
                </button>
              </div>
            )}
          </div>
        );
      })}
    </ListContainer>
  );
};
