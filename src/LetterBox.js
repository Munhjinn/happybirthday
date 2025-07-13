import React, { useState } from "react";
import "./LetterBox.css";

const LetterBox = ({ hasKey, letterImg, message }) => {
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    if (hasKey) {
      setOpened(true);
    }
  };

  return (
    <div className="letter-box">
      {!opened ? (
        <div>
          <img
            src={letterImg}
            alt="Letter"
            className="letter-img"
            onClick={handleOpen}
            style={{ cursor: hasKey ? "pointer" : "not-allowed", opacity: hasKey ? 1 : 0.5 }}
          />
          {!hasKey && (
            <div style={{ color: "#ff4d6d", marginTop: 12, fontWeight: "bold" }}>
              Түлхүүрээ эхлээд ол!
            </div>
          )}
        </div>
      ) : (
        <div className="letter-message">
          <img src={letterImg} alt="Letter" className="letter-img opened" />
          <div className="message">{message}</div>
        </div>
      )}
    </div>
  );
};

export default LetterBox;
