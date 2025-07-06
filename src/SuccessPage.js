import React, { useState } from "react";
import GiftBox from "./GiftBox";
import LetterBox from "./LetterBox";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./App.css";

const gifts = [
  { id: 1, closed: "/img/gift-closed.png", opened: "/img/gift-opened.png", surprise: "/img/surprise1.jpg", type: "gift" },
  { id: 2, closed: "/img/gift-closed.png", opened: "/img/gift-opened.png", surprise: "/img/surprise2.jpg", type: "gift" },
  { id: 3, closed: "/img/gift-closed.png", opened: "/img/gift-opened.png", surprise: "/img/surprise3.jpeg", type: "gift" },
  { id: 4, letter: "/img/letter.jpg", type: "letter" }
];

function SuccessPage() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [opened, setOpened] = useState(Array(gifts.length).fill(false));
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState("");

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

  return (
    <div className="App">
      <h1>Төрсөн өдрийн мэнд хүргэе!</h1>
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
                  onOpen={() => handleOpen(prev)}
                />
              ) : (
                <LetterBox letterImg={gifts[prev].letter} />
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
              <LetterBox letterImg={gifts[current].letter} />
            )}
          </div>
        </div>
        <button className="arrow right" onClick={() => handleArrow("right")} disabled={isAnimating}>
          <FaArrowRight size={32} />
        </button>
      </div>
    </div>
  );
}

export default SuccessPage;
