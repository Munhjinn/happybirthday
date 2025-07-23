import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CountdownTimer from "./CountdownTimer";
// import GiftBox from './GiftBox';
import SuccessPage from './SuccessPage';
import CakePage from './CakePage';
import { AnimatePresence } from "framer-motion";

function App() {
  const birthday = "2025-07-26T00:00:00";

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <AnimatePresence mode="wait">
              <div className="center-screen">
                <CountdownTimer targetDate={birthday} />
              </div>
            </AnimatePresence>
          }
        />
        <Route
          path="/cake"
          element={
            <AnimatePresence mode="wait">
              <CakePage />
            </AnimatePresence>
          }
        />
        <Route
          path="/success"
          element={
            <AnimatePresence mode="wait">
              <SuccessPage />
            </AnimatePresence>
          }
        />
      </Routes>
    </Router>
  );
}

export default App