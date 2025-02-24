import React from "react";

// Feedback Icon Component
const FeedbackIcon = ({ quality }) => {
  let icon;
  
  switch (quality) {
    case 'not-good':
      icon = (
        <svg height="20" width="100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20">
          <circle cx="25" cy="10" r="8" stroke="black" strokeWidth="2" fill="#e74c3c" />
        </svg>
      );
      break;
    case 'good':
      icon = (
        <svg height="20" width="100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20">
          <circle cx="50" cy="10" r="8" stroke="black" strokeWidth="2" fill="#f39c12" />
        </svg>
      );
      break;
    case 'very-good':
      icon = (
        <svg height="20" width="100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20">
          <circle cx="75" cy="10" r="8" stroke="black" strokeWidth="2" fill="#2ecc71" />
        </svg>
      );
      break;
    case 'full':
      icon = (
        <svg height="20" width="100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20">
          <circle cx="100" cy="10" r="8" stroke="black" strokeWidth="2" fill="#2ecc71" />
        </svg>
      );
      break;
    default:
      icon = null;
  }
  
  return <div>{icon}</div>;
};

export default FeedbackIcon;
