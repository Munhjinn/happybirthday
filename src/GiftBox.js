import React from "react";
import "./GiftBox.css";

function GiftBox({ closedImg, openImg, surpriseImg, open, onOpen }) {
  return (
    <div className="gift-box" onClick={onOpen}>
      {!open ? (
        <img src={closedImg} alt="Closed Gift" className="gift-img" />
      ) : (
        <div className="open-gift">
          <img src={openImg} alt="Open Gift" className="gift-img" />
          <img src={surpriseImg} alt="Surprise" className="surprise-img" />
        </div>
      )}
    </div>
  );
}

export default GiftBox;
