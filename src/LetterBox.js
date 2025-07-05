import React from "react";
import "./LetterBox.css";

function LetterBox({ letterImg }) {
  return (
    <div className="letter-box">
      <img src={letterImg} alt="Letter" className="letter-img" />
    </div>
  );
}

export default LetterBox;
