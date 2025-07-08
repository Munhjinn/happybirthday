import React, { useState, useEffect } from "react";
import "./LetterBox.css";

function LetterBox({ letterImg, message }) {
  const [opened, setOpened] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (opened) {
      // дараагийн render дээр анимэйшн класс нэмнэ
      const timer = setTimeout(() => setAnimate(true), 10);
      return () => clearTimeout(timer);
    } else {
      setAnimate(false);
    }
  }, [opened]);

  return (
    <div className="letter-box" onClick={() => setOpened(true)}>
      {!opened ? (
        <img
          src={letterImg}
          alt="Letter"
          className="letter-img"
        />
      ) : (
        <div className={`letter-message${animate ? " letter-message-animate" : ""}`}>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}

export default LetterBox;
