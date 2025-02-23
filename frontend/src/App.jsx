import { useState } from 'react'
import './App.css'
import AIImpactArticle from "./pages/article"


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className = "app-container">
      <AIImpactArticle />
    </div>
  )
}

export default App
