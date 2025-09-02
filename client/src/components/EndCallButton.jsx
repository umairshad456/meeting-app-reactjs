import { useCall } from '@stream-io/video-react-sdk';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const EndCallButton = () => {
  const call = useCall();
  const navigate = useNavigate()

  return (
    <button
      onClick={async () => {
        if (call) {
          await call.endCall();
        } else {
          console.error('Call object is undefined');
        }
        navigate('/');
      }}
      className='bg-red-500 rounded-lg cursor-pointer px-2 py-1.5'
    >
      End Call for Everyone
    </button>
  );
};

export default EndCallButton;