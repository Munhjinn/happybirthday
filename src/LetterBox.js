import React, { useState } from "react";
import "./LetterBox.css";

function LetterBox({ letterImg, message }) {
  const [opened, setOpened] = useState(false);

  return (
    <div className="letter-box" onClick={() => setOpened(true)}>
      {!opened ? (
        <div className="letter-floating-wrapper">
          <div className="letter-rope-wrapper">
            <div className="letter-rope"></div>
            <img src={letterImg} alt="Letter" className="letter-img" />
          </div>
        </div>
      ) : (
        <div className="letter-message letter-message-animate">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}

export default LetterBox;
