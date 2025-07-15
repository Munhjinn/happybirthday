import React, { useState, useCallback } from "react";
import GiftBox from "./GiftBox";
import LetterBox from "./LetterBox";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./App.css";
import Rain from './Rain';
import { motion } from "framer-motion";

const gifts = [
  { id: 1, closed: "/img/gift-closed.png", opened: "/img/gift-opened.png", surprise: "/img/surprise1.jpg", type: "gift", bg: "#fC8EAC" },
  { id: 2, closed: "/img/gift-closed.png", opened: "/img/gift-opened.png", surprise: "/img/surprise2.jpg", type: "gift", bg: "#FCBACB" },
  { id: 3, closed: "/img/gift-closed.png", opened: "/img/gift-opened.png", surprise: "/img/surprise3.jpeg", type: "gift", bg: "#ECBDC4" },
  // { id: 4, letter: "/img/letter.png", type: "letter", bg: "#ff9999", message: "Төрсөн өдрийн баярын мэнд хүргэе! ..." } 
];
  
function SuccessPage() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [opened, setOpened] = useState(Array(gifts.length).fill(false));
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState("");
  const [hasKey, setHasKey] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  const handleOpen = (index) => {
    setOpened((prev) => {
      const newOpened = [...prev];
      newOpened[index] = true;
      return newOpened;
    });
  };

  const handleArrow = (dir) => {
    if (isAnimating) return;
    setDirection(dir);
    setPrev(current);

    setCurrent((prevIdx) =>
      dir === "right"
        ? (prevIdx + 1) % gifts.length
        : (prevIdx - 1 + gifts.length) % gifts.length
    );

    setIsAnimating(true);

    setTimeout(() => {
      setIsAnimating(false);
      setPrev(null);
    }, 1000);
  };

  // Тухайн бэлэгний background өнгө
  const bgColor = gifts[current].bg || "#fff";

  const onKeyFound = useCallback(() => setHasKey(true), []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6 }}
      className="App"
      style={{
        background: bgColor,
        transition: "background 0.6s"
      }}
    >
      <Rain onKeyFound={onKeyFound} />
      <h1 className="birthday-title">Happy Birthday</h1>
      <h1 className="birthday-subtitle">My Dear Princess</h1>
      {/* Хуучин floating letter icon-ыг click-д холбох */}
      <div
        className="letter-floating-wrapper"
        style={{ cursor: hasKey ? "pointer" : "not-allowed" }}
        onClick={() => {
          if (hasKey) {
            setShowLetter(true);
          } else {
            alert("Эхлээд түлхүүрээ ол!");
          }
        }}
      >
        <div className="letter-rope-wrapper">
          <div className="letter-rope"></div>
          <img
            src="/img/letter.png"
            alt="Letter"
            className="letter-img"
          />
        </div>
      </div>
      <div className="carousel">
        <button className="arrow left" onClick={() => handleArrow("left")} disabled={isAnimating}>
          <FaArrowLeft size={32} />
        </button>
        <div className="carousel-gift-wrapper">
          {prev !== null && (
            <div className={`carousel-gift ${direction === "right" ? "slide-out-right" : "slide-out-left"}`}>
              {gifts[prev].type === "gift" ? (
                <GiftBox
                  closedImg={gifts[prev].closed}
                  openImg={gifts[prev].opened}
                  surpriseImg={gifts[prev].surprise}
                  open={opened[prev]}
                  onOpen={() => handleOpen(prev)}x
                />
              ) : (
                <LetterBox
                  hasKey={hasKey}
                  letterImg={gifts[prev].letter}
                  message={gifts[prev].message}
                />
              )}
            </div>
          )}
          <div className={`carousel-gift ${isAnimating ? (direction === "right" ? "slide-in-right" : "slide-in-left") : ""}`}>
            {gifts[current].type === "gift" ? (
              <GiftBox
                closedImg={gifts[current].closed}
                openImg={gifts[current].opened}
                surpriseImg={gifts[current].surprise}
                open={opened[current]}
                onOpen={() => handleOpen(current)}
              />
            ) : (
              <LetterBox
                hasKey={hasKey}
                letterImg={gifts[current].letter}
                message={gifts[current].message}
              />
            )}
          </div>
        </div>
        <button className="arrow right" onClick={() => handleArrow("right")} disabled={isAnimating}>
          <FaArrowRight size={32} />
        </button>
      </div>

      {/* Popup/modal захидал */}
      {showLetter && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100
          }}
          onClick={() => setShowLetter(false)}
        >
          <div
            style={{
              background: `url('/img/letterback.jpg') center center / contain no-repeat`,
              padding: 40,
              borderRadius: 24,
              boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
              minWidth: 220,
              maxWidth: 340,
              minHeight: 380,
              maxHeight: "90vh",
              width: "90vw",
              height: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* <img src="/img/letter.png" alt="Letter" style={{ width: 90, marginBottom: 18 }} /> */}
            <div style={{
              marginTop: 18,
              fontSize: 24,
              color: '#222',
              textShadow: "0 1px 8px #fff, 0 1px 1px #ffb6c1"
            }}>
              Төрсөн өдрийн баярын мэнд хүргэе!
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default SuccessPage;

