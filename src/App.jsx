import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [currentPrompt, setCurrentPrompt] = useState(0)
  const [dailyTotal, setDailyTotal] = useState(0)
  const [weeklyAverage, setWeeklyAverage] = useState(0)
  const [tokenCount, setTokenCount] = useState(0)

  useEffect(() => {
    // Get initial token count when popup opens
    chrome.storage.local.get(['tokenCount'], (result) => {
      if (result.tokenCount) {
        setTokenCount(result.tokenCount);
        // Simple conversion example: 1 token = 0.0001 kWh (you can adjust this)
        setCurrentPrompt(result.tokenCount * 0.0001);
        setDailyTotal(result.tokenCount * 0.0001);
      }
    });

    // Listen for updates from content script
    chrome.storage.onChanged.addListener((changes) => {
      if (changes.tokenCount) {
        setTokenCount(changes.tokenCount.newValue);
        setCurrentPrompt(changes.tokenCount.newValue * 0.0001);
        setDailyTotal(changes.tokenCount.newValue * 0.0001);
      }
    });
  }, []);

  return (
    <div className="extension-container">
      <header className="extension-header">
        <h1>PowerPrompt</h1>
      </header>
      <main className="extension-content">
        <div className="energy-display">
          <div className="energy-stat">
            <span>Total Tokens Used: </span>
            <span className="energy-value">{tokenCount}</span>
          </div>
          <div className="energy-stat">
            <span>Current Prompt Energy Usage: </span>
            <span className="energy-value">{currentPrompt.toFixed(4)} kWh</span>
          </div>
          <div className="energy-stat">
            <span>Daily Total: </span>
            <span className="energy-value">{dailyTotal.toFixed(4)} kWh</span>
          </div>
          <div className="energy-stat">
            <span>Weekly Average: </span>
            <span className="energy-value">{weeklyAverage.toFixed(4)} kWh</span>
          </div>
        </div>
        <p>Monitor your AI conversation energy consumption in real-time!</p>
      </main>
    </div>
  )
}

export default App
