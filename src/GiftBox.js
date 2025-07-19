import React from "react";
import "./GiftBox.css";

function GiftBox({ closedImg, openImg, surpriseImg, open, onOpen, index, onClose }) {
  return (
    <div className="gift-box" onClick={!open ? onOpen : undefined}>
      {!open ? (
        <img src={closedImg} alt="Closed Gift" className="gift-img" />
      ) : (
        index === 2 ? (
          // 3 дахь бэлэг дээр popup
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
            onClick={onClose} // гадна талд дарахад хаах
          >
            <div
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
                boxSizing: "border-box",
                justifyContent: "center"
              }}
              onClick={e => e.stopPropagation()} // popup дээр дарахад хаагдахгүй
            >
              <div
                style={{
           
                  fontFamily: "'Lobster', sans-serif",
                  fontSize: "25px",
                  color: "#0D0907",
                  marginBottom: "12px",
                  textAlign: "center"
                }}
              >
                Анх хараад   <br />
                Аргагүй эрхэнд дурлажээ<br />
                Төрсөн өдрийн мэнд хүргэе!  <br />
                Төрсөн өдрийн мэнд хүргэе!  <br />
                <br />
                Төрсөн өдрийн мэнд хүргэе!  <br />
                Төрсөн өдрийн мэнд хүргэе!  <br />
                Төрсөн өдрийн мэнд хүргэе!  <br />
                Төрсөн өдрийн мэнд хүргэе!  <br />
              </div>
            </div>
          </div>
        ) : (
          // 1, 2 дахь бэлэг дээр openImg болон surpriseImg хоёуланг нь харуулна
          <div
            style={{
              position: "relative",
              width: 240,
              height: 240,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <img
              src={openImg}
              alt="Open Gift"
              className="gift-img"
              style={{
                width: 290,
                height: 290,
                objectFit: "contain",
                borderRadius: 16
              }}
            />
            {surpriseImg && (
              <img
                src={surpriseImg}
                alt="Surprise"
                className="gift-surprise-img"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 220,
                  height: 220,
                  objectFit: "contain",
                  borderRadius: 12,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
                }}
              />
            )}
          </div>
        )
      )}
    </div>
  );
}

export default GiftBox;
