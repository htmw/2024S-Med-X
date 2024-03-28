import React from 'react';

const StatusButton = ({ status }) => {
  // Define styles for different statuses
  const buttonStyles = {
    reviewing: {
      padding: "10px",
      height: 'auto',
      width: 'auto',
      backgroundColor: '#CBAB00', // yellow
      color: '#fff', // white
      borderRadius: '10px', // rounded corners
      pointerEvents: 'none'
    },
    reviewed: {
      padding: "10px",
      height: 'auto',
      width: 'auto',
      backgroundColor: '#0EB500', // green
      color: '#fff', // white
      borderRadius: '10px', // rounded corners
      pointerEvents: 'none'
    },
  };
  
  

  // Determine the appropriate style based on the status prop
  let currentStyle = {};
  switch (status) {
    case '0':
      currentStyle = buttonStyles.reviewing;
      break;
    case '1':
      currentStyle = buttonStyles.reviewed;
      break;
    default:
      currentStyle = {};
  }

  return (
    <button style={currentStyle}>
      {status === '0' ? 'Reviewing' : 'Reviewed'}
    </button>
  );
};

export default StatusButton;
