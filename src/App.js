import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CountdownTimer from "./CountdownTimer";
// import GiftBox from './GiftBox';
import SuccessPage from './SuccessPage';

function App() {
  const birthday = "2025-07-26T00:00:00";

  return (
    <Router>
      <Routes>
        <Route path="/" element={<div className="center-screen"><CountdownTimer targetDate={birthday} /></div>} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </Router>
  );
}

export default App;
