import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [currentPrompt, setCurrentPrompt] = useState(0)
  const [dailyTotal, setDailyTotal] = useState(0)
  const [weeklyAverage, setWeeklyAverage] = useState(0)
  const [tokenCount, setTokenCount] = useState(0)
  const [newStat, setNewStat] = useState(0)
  const [carbonFootprint, setCarbonFootprint] = useState(0)

  useEffect(() => {
    window.updateEnergy = ({ tokens, currentPrompt, dailyTotal, weeklyAverage, carbonFootprint }) => {
        setTokenCount(tokens);
        setCurrentPrompt(currentPrompt);
        setDailyTotal(dailyTotal);
        setWeeklyAverage(weeklyAverage);
        setCarbonFootprint(carbonFootprint);
    };

    // Initial load of data
    chrome.storage.local.get(['energyStats'], function(data) {
        if (data.energyStats) {
            window.updateEnergy(data.energyStats);
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
            <span className="energy-value">{dailyTotal} kWh</span>
          </div>
          <div className="energy-stat">
            <span>Weekly Average: </span>
            <span className="energy-value">{weeklyAverage} kWh</span>
          </div>
          <div className="energy-stat">
            <span>New Stat: </span>
            <span className="energy-value">{newStat}</span>
          </div>
          <div className="energy-stat">
            <span>Carbon Footprint: </span>
            <span className="energy-value">{carbonFootprint} kg</span>
          </div>
        </div>
        <p>Monitor your AI conversation energy consumption in real-time!</p>
      </main>
    </div>
  )
}

export default App
