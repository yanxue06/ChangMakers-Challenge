import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar';
import FrontPage from './pages/frontpage';
import AIImpactArticle from "./pages/article";
import PromptEvaluator from "./pages/prompt";

function App() {
  const [count, setCount] = useState(0)

  return (
	<div>
		<Router>
			<Navbar />
			<Routes>
			<Route path="/" element={<FrontPage />} />  
			<Route path="/home" element={<FrontPage />} />    
			<Route path="/impact" element={<AIImpactArticle />} />    
			<Route path="/promptevaluator" element={<PromptEvaluator />} /> \
        	</Routes>
		</Router>
  </div>
  )
}

export default App
