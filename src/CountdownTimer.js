import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './App.css';

function CountdownTimer({ targetDate }) {
  const navigate = useNavigate();

  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    if (
      timeLeft.days === 0 &&
      timeLeft.hours === 0 &&
      timeLeft.minutes === 0 &&
      timeLeft.seconds === 0
    ) {
      // Countdown дуусмагц success page рүү шилжинэ
      navigate("/success");
    } else {
      const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line
  }, [timeLeft, navigate]);

  return (
    <div className="countdown-container">
      <h2 className="countdown-title-top">My Princess's</h2>
      <h2 className="countdown-title-bottom">Birthday</h2>
      <div className="countdown-numbers">
        <div className="countdown-item">
          <span className="countdown-value">{timeLeft.days}</span>
          <span className="countdown-label">DAYS</span>
        </div>
        <span className="countdown-separator">:</span>
        <div className="countdown-item">
          <span className="countdown-value">{timeLeft.hours}</span>
          <span className="countdown-label">HOURS</span>
        </div>
        <span className="countdown-separator">:</span>
        <div className="countdown-item">
          <span className="countdown-value">{timeLeft.minutes}</span>
          <span className="countdown-label">MINUTES</span>
        </div>
        <span className="countdown-separator">:</span>
        <div className="countdown-item">
          <span className="countdown-value">{timeLeft.seconds}</span>
          <span className="countdown-label">SECONDS</span>
        </div>
      </div>
    </div>
  );
}

export default CountdownTimer;
