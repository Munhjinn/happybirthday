import React, { useState, useCallback } from "react";
import GiftBox from "./GiftBox";
import LetterBox from "./LetterBox";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./App.css";
import Rain from './Rain';
import { motion } from "framer-motion";

const gifts = [
  { id: 1, closed: "/img/gift-closed.png", opened: "/img/gift-opened.png", surprise: "/img/surprise1.jpg", type: "gift", bg: "#fa94afff" },
  { id: 2, closed: "/img/gift-closed.png", opened: "/img/gift-opened.png", surprise: "/img/surprise2.jpg", type: "gift", bg: "#FCBACB" },
  { id: 3, closed: "/img/gift-closed.png", opened: "/img/gift-opened.png", surprise: "", type: "gift", bg: "#eba5b0ff" },
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
      <h1 className="birthday-title">Үзэсгэлэнт гүнждээ <br/>
                                      төрсөн өдрийн мэнд <br/>хүргэе</h1>
      
      {/* Хуучин floating letter icon-ыг click-д холбох */}
      <div
        className="letter-floating-wrapper"
        style={{ cursor: hasKey ? "pointer" : "not-allowed" }}
        onClick={() => {
          if (hasKey) {
            setShowLetter(true);
          } else {
            alert("Find the key first to open the letter"); // түлхүүр олдоогүй бол alert харуулна
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
                  index={current}
                  onClose={() => {
                  // 3 дахь popup-ийг хаах
                  setOpened(prev => {
                    const arr = [...prev];
                    arr[2] = false;
                    return arr;
                  });
                }}
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
            className="letter-popup"
            style={{
              background: "#F7FCFE",
              padding: "32px 24px",
              borderRadius: 24,
              boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
              minWidth: 220,
              maxWidth: 340,
              minHeight: 220,
              maxHeight: "90vh",
              width: "90vw",
              height: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxSizing: "border-box"
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Title нэмэх хэсэг */}
            <div
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: "2.2rem",
                color: "#e63950",
                marginBottom: "12px",
                textAlign: "center"
              }}
            >
              Захидал
            </div>
            {/* ...текст хэсэг... */}
            <div
              style={{
                marginTop: 0,
                fontSize: 16,
                color: '#222',
                fontFamily: "'Sacramento', cursive",
                textShadow: "0 1px 8px #fff, 0 1px 1px #ffb6c1",
                maxHeight: "60vh",
                overflowY: "auto",
                width: "100%",
                textAlign: "justify",
                padding: "0 8px",
                background: "rgba(255,255,255,0.05)",
                borderRadius: 12,
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                boxSizing: "border-box"
              }}
              className="letter-scroll"
            >
              dolor sit amet, consectetur adipiscing elit. Nullam nec sapien ligula. Morbi gravida auctor dui in pharetra. Sed mollis efficitur auctor. Fusce pellentesque lacinia mi, eu placerat leo. Sed laoreet in massa et lacinia. Morbi vel tempus mauris. Pellentesque hendrerit pellentesque iaculis.
              Aenean placerat tincidunt consequat. Sed feugiat gravida tempus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas vitae lorem justo. Proin malesuada risus eu urna pellentesque, at sodales libero iaculis. Nullam volutpat nisi lectus, convallis fermentum tellus accumsan quis. Ut at felis ullamcorper, ultrices tellus vel, rutrum sapien. Sed eu gravida lacus, ut ultrices purus. Nam fringilla vehicula dui sit amet pellentesque. Praesent vehicula laoreet arcu, ornare sollicitudin est aliquet at. Phasellus lacinia fringilla maximus.

              Sed auctor, nunc a lacinia efficitur, ante velit tempor diam, et sodales metus nisi luctus tortor. Phasellus at augue sit amet lacus tristique gravida eget eget velit. Etiam quis nisl nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam vehicula sollicitudin est non tristique. Nam a mattis dolor. Nunc quis mauris pharetra, pellentesque eros tempor, pellentesque eros.

              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec sapien ligula. Morbi gravida auctor dui in pharetra. Sed mollis efficitur auctor. Fusce pellentesque lacinia mi, eu placerat leo. Sed laoreet in massa et lacinia. Morbi vel tempus mauris. Pellentesque hendrerit pellentesque iaculis.
              Aenean placerat tincidunt consequat. Sed feugiat gravida tempus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas vitae lorem justo. Proin malesuada risus eu urna pellentesque, at sodales libero iaculis. Nullam volutpat nisi lectus, convallis fermentum tellus accumsan quis. Ut at felis ullamcorper, ultrices tellus vel, rutrum sapien. Sed eu gravida lacus, ut ultrices purus. Nam fringilla vehicula dui sit amet pellentesque. Praesent vehicula laoreet arcu, ornare sollicitudin est aliquet at. Phasellus lacinia fringilla maximus.

              Sed auctor, nunc a lacinia efficitur, ante velit tempor diam, et sodales metus nisi luctus tortor. Phasellus at augue sit amet lacus tristique gravida eget eget velit. Etiam quis nisl nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam vehicula sollicitudin est non tristique. Nam a mattis dolor. Nunc quis mauris pharetra, pellentesque eros tempor, pellentesque eros.
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default SuccessPage;

