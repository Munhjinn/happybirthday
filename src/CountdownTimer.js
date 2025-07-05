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
    <div className="countdown-bg">
      <h1>
        {timeLeft.days} Day {timeLeft.hours} hours {timeLeft.minutes} minutes {timeLeft.seconds} seconds
      </h1>
    </div>
  );
}

export default CountdownTimer;
