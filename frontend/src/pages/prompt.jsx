import React, { useState } from 'react';
import '../styles/prompt.css'; // Import the CSS file for styling
import Feedback from '../components/feedback.jsx';

const PromptPage = () => {
  const [inputText, setInputText] = useState('');
  const [progress, setProgress] = useState(0);

  // Function to handle input changes
  const handleInputChange = (e) => {
    const text = e.target.value;
    setInputText(text);

    // Calculate progress based on the input length (could be word count or character count)
    const maxLength = 100;  // Define a maximum length
    const newProgress = Math.min((text.length / maxLength) * 100, 100);  // Calculate percentage progress
    setProgress(newProgress);
  };

  // Adjust height dynamically for the textarea
  const adjustHeight = (e) => {
    const textarea = e.target;
    textarea.style.height = 'auto'; // Reset height before measuring
    textarea.style.height = `${textarea.scrollHeight}px`; // Adjust height based on content
  };

  // Function to evaluate the quality of the prompt
  const evaluatePrompt = (input) => {
    if (input.length < 10) {
      return 'not-good'; // Not enough content in the prompt
    } else if (input.length >= 10 && input.length < 20) {
      return 'good'; // Basic, decent prompt
    } else {
      return 'very-good'; // Complex and well-thought-out prompt
    }
  };

  // Handle form submission (when the button is clicked or Enter key is pressed)
  const handleSubmit = () => {
    const quality = evaluatePrompt(inputText);
    setFeedbackQuality(quality);
  };

  // Calculate stroke offset for the progress circle
  const strokeOffset = (1 - progress / 100) * 188.36;  // 188.36 is the circumference of the circle

  return (
    <div className="page-container">
      <div className="info-container">
        <h2>Prompt Evaluator</h2>
      </div>

      <div className="additional-info">
        {/* Cards displaying information */}
        <div className="card">
          <h3>Provide Clear Context</h3>
          <ul>
            <li>Include background information, subject matter, and constraints</li>
            <li>Define the scope of the scenario or question</li>
          </ul>
        </div>
        <div className="card">
          <h3>Specify Format + Length</h3>
          <ul>
            <li>State the desired format</li>
            <li>Mention structural preferences</li>
            <li>Specify output length</li>
          </ul>
        </div>
        <div className="card">
          <h3>Provide Clear Context</h3>
          <ul>
            <li>Indicate the level of detail</li>
            <li>Choose the tone and style </li>
            <li>Include examples for reference </li>
          </ul>
        </div>
      </div>

      <div className="input-container">
        {/* SVG Progress Circle */}
        <div className="progress-svg">
          <svg width="80" height="80" viewBox="-10 -10 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(-90deg)' }}>
            <circle r="30" cx="40" cy="40" fill="transparent" stroke="#e0e0e0" strokeWidth="4"></circle>
            <circle 
              r="30" 
              cx="40" 
              cy="40" 
              stroke="#76e5b1" 
              strokeWidth="7" 
              strokeLinecap="round" 
              strokeDashoffset={strokeOffset} 
              fill="transparent" 
              strokeDasharray="188.36" 
            />
            <text  x={progress < 10 ? "32px" : "24px"} y="47px" fill="#6bdba7" fontSize="28px" fontWeight="bold" style={{ transform: 'rotate(90deg) translate(0px, -76px)' }}>
              {Math.floor(progress)} {/* Display the progress value */}
            </text>
          </svg>
        </div>

        {/* Textarea for user input */}
        <textarea
          className="input-box"
          value={inputText}
          onChange={handleInputChange}
          onKeyUp={adjustHeight}
          placeholder="Type your prompt here..."
        />

        {/* Submit button */}
        <button className="submit-button" onClick={handleSubmit}>
          <svg
            fill="#ffffff"
            height="20px"
            width="20px"
            viewBox="0 0 330 330"
            transform="rotate(270)"
            stroke="#ffffff"
          >
            <g id="SVGRepo_iconCarrier">
              <path
                id="XMLID_27_"
                d="M15,180h263.787l-49.394,49.394c-5.858,5.857-5.858,15.355,0,21.213C232.322,253.535,236.161,255,240,255 s7.678-1.465,10.606-4.394l75-75c5.858-5.857,5.858-15.355,0-21.213l-75-75c-5.857-5.857-15.355-5.857-21.213,0 c-5.858,5.857-5.858,15.355,0,21.213L278.787,150H15c-8.284,0-15,6.716-15,15S6.716,180,15,180z"
              />
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PromptPage;
