import React from 'react';
import '../styles/frontpage.css';
import mountainImg from '../assets/mountain.png';
import desertImg from '../assets/desert.png';
const FrontPage = () => {
  return (
	<div>
    <div className="frontpage" >
      <h1>PowerPrompt</h1>
      <p className="slogan">Prompt Green, Keep It Clean.</p>
    </div>
	<section className="about-section">
      <div className="about-container">
        <div className="images-column">
          <img
            src={mountainImg}
            alt="Mountain peaks landscape"
            className="mountain-image"
          />
          <img
            src={desertImg}
            alt="Desert rock formations at sunset"
            className="desert-image"
          />
        </div>
        
        <div className="content-column">
          <h2 className="about-title">About Us</h2>
          
          <div className="about-text">
            <p>
              At <span className="company-name">PowerPrompt</span>, we make AI usage smarter and greener. 
              Our Chrome extension tracks the energy consumption of AI-generated content 
              and helps users optimize their prompts to reduce environmental impact. 
              Through engaging animations featuring cute animals, we raise awareness 
              about AI's carbon footprint while educating users on prompt engineering 
              best practices.
            </p>
            
            <p>
              With real-time energy tracking and actionable insights, PowerPrompt 
              empowers individuals and businesses to make AI interactions more efficient. 
              Whether you're a casual user or a developer, our goal is simple: reduce 
              waste, save energy, and keep AI sustainable for the future.
            </p>
          </div>
          
          <button className="download-button">
            DOWNLOAD
          </button>
        </div>
      </div>
    </section>
	</div>
  );
}

export default FrontPage;