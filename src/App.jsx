import { useState } from 'react'
import './App.css'

function App() {
  const [currentPrompt, setcurrentPrompt] = useState(0)
  const [dailyTotal, setdailyTotal] = useState(0)
  const [weeklyAverage, setweeklyAverage] = useState(0)

  return (
    <div className="extension-container">
      <header className="extension-header">
        <h1>PowerPrompt</h1>
      </header>
      <main className="extension-content">
        <div className="energy-display">
          <div className="energy-stat">
            <span>Current Prompt Energy Usage: </span>
            <span className="energy-value">{currentPrompt} kWh</span>
          </div>
          <div className="energy-stat">
            <span>Daily Total: </span>
            <span className="energy-value">{dailyTotal} kWh</span>
          </div>
          <div className="energy-stat">
            <span>Weekly Average: </span>
            <span className="energy-value">{weeklyAverage} kWh</span>
          </div>
        </div>
        <p>Monitor your AI conversation energy consumption in real-time!</p>
      </main>
    </div>
  )
}

export default App
