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
            alert("Зүрхэн дээр дараад түлхүүр олоорой"); // түлхүүр олдоогүй бол alert харуулна
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
              Үзэсгэлэнт хайрт минь, Чамдаа төрсөн өдрийн баярын мэнд хүргэе. Чи наддаа ирсэн маш том гэрэл гэгээ юм шүү. Анх чамайг хараад арьс нь ямар гоё цагаан хөөрхөн охин байна даа гэж бодохтой зэрэгцээд бие нэг л сонин болоол чамд татагдаад байгаа ч юм шиг болоол тэр үед дурлана гэдэг энэ байх гэж байлаа.
              Удаан хугацаанд бие биеийнхээ өрөөнд ямар нэг шалтгаанаар орж гарахдаа чамайг ямар их хичээнгүй, өөртөө итгэлтэй, ухаалаг, уран гартай охин гэдгийг мэдсэн. Би тэр үед сургуульд сурдаггүй гэдгээ нуудаг байлаа. Гэхдээ сүүлд нь хэлсэн. Би гэдэг хүн охин ч найрж мэддэггүй, болзоонд урьж мэддэггүй хүн. Нэг өдөр хоёр өрөөгөөрөө И-март яваад буцахдаа хайр нэг шинээр гарсан киноны тухай ярьж байхад нь би хамт үзэх үү гэж хэлсэн гэхдээ энэ үг миний оюун бодлоос биш зүрхнээс минь гарсан шүү. Чамтай багахан хугацаанд ч гэсэн хамт байх анхны боломж байсан. Тэр өдрөөс хойш энэ охин намайг тоох болов уу, яах бол гэж бодогддог болж хайрийн өрөөнийхөн нэг өдөр орж ирэх байх гээд гал тогоог өдөр болгон угааж, арчдаг байлаа. Цаанаа хайрд л таалагдчих гэж хичээгээл. 
              Хайрын өрөөнд орж хөзөр тоглочихоод гарахдаа албаар цамцаа үлдээнэ. Цамцаараа далимдуулж уулзах санаатай л.Яг хэдэн гэдгийг санахгүй ч шөнө хичээлээ хийнэ хэсэгхэн унтчихая сэрээгээрэй гэж надад хэлдэг болсоноос хойш хайрыгаа дахин багахан хугацаанд ч болов харах боломж олдож сэрээх гэж өрөө рүү нь орохдоо догдолж ороод хайрыг сэрээхээр дахиад жаахан унтчихая гэхээр нь хараад л сууна. Яг тэр хэсэгхэн хугацаа хэр хурдан, удаан явж байгаа хамаагүй зөвхөн үзэсгэлэнтэй чамайгаа л харж суудаг байлаа.
              Тэр намрын өдрүүд явсаар би чамтай дотносох гэж хичээсээр гэхдээ би жаахан тэнэг байсан л даа. Намар дуусч өвөл болж их сургуулиудын өвлийн амралт эхлэж хайр гэр лүүгээ явах болов. Тэгээд л за би энэ охинийг алдчихвийдээ гэж айгаал нэг орой хамт байхдаа надтай үеэрхээч гэж гуйж билээ. Үерхэх санал тавихдаа найзуудынх дэргэд ч юм уу, дурсамжтай гоё цэцэг бариад сөгдөж сууж байгаад санал тавина гэж бодож байсан ч чамайгаа алдчихвийдээ гэж айснаасаа болоод нэг орой хамт байхдаа санал тавьсан. Дурсамжтой, гоёоор санал тавиагүйд уучлаарай хайраа. 
              Тэрнээс хойш хол байхад үнэхээр хэцүү, маш их санаад, цаг минут тутамд санаал хэзээ ирэх бол гэж бодоол байдаг байлаа. Хоёр талаас хотод очоод уулзахад санасан сэтгэл минь дэвтэж үнэхээр гоё байсан.
              Хавар нь сургуульдаа буцаад орсон маш том шалтгаан бол чи минь байсан. Хайртай учираад өөртөө итгэлтэй болоод, хайраасаа маш их зүйлүүг сурсан. Энэ хүний төлөө би хичээхгүй бол болохгүй юм байна даа гэх бодолтойгоор бүх чадлаараа хичээж эхэлсэн. Үүнээс хойш бараг 3 жил болллоо. Бүхий л цаг үед хайрийгаа дэмжиж, хамт байж, шантарч сэтгэлээр унасан үед минь дэмжиж, баярлах үед минь хамт баярлаж явдагт баярлалаа хайраа. Би чамтайгаа хамт байхад л аз жаргалийг мэдэрдэг. Хоёулаа ирээдүйд хуримаа мартагдахааргүй хийж, хүссэн газраа хамт сайхан амьдарнаа хайраа. Энэ бүхний төлөө, хайрынхаа төлөө, өөрсдийнхөө гэрэлт ирээдүйн төлөө хайр чадахаараа хичээнээ. Миний хайр хайртайгаа хамт байхад л болно. Чамдаа төрсөн өдрийн баярын мэнд хүргэе. Чамдаа хайртай шүү

              {/* Үзэсгэлэнт хайрт минь, Чамдаа төрсөн өдрийн баярын мэнд хүргэе. Чи наддаа ирсэн маш том гэрэл гэгээ юм шүү. Анх чамайг хараад арьс нь ямар гоё цагаан хөөрхөн охин байна даа гэж бодохтой зэрэгцээд бие нэг л сонин болоол чамд татагдаад байгаа ч юм шиг болоол тэр үед дурлана гэдэг энэ байх гэж байлаа.
              Удаан хугацаанд бие биеийнхээ өрөөнд ямар нэг шалтгаанаар орж гарахдаа чамайг ямар их хичээнгүй, өөртөө итгэлтэй, ухаалаг, уран гартай охин гэдгийг мэдсэн. Би тэр үед сургуульд сурдаггүй гэдгээ нуудаг байлаа. Гэхдээ сүүлд нь хэлсэн. Би гэдэг хүн охин ч найрж мэддэггүй, болзоонд урьж мэддэггүй хүн. Нэг өдөр хоёр өрөөгөөрөө И-март яваад буцахдаа хайр нэг шинээр гарсан киноны тухай ярьж байхад нь би хамт үзэх үү гэж хэлсэн гэхдээ энэ үг миний оюун бодлоос биш зүрхнээс минь гарсан шүү. Чамтай багахан хугацаанд ч гэсэн хамт байх анхны боломж байсан. Тэр өдрөөс хойш энэ охин намайг тоох болов уу, яах бол гэж бодогддог болж хайрийн өрөөнийхөн нэг өдөр орж ирэх байх гээд гал тогоог өдөр болгон угааж, арчдаг байлаа. Цаанаа хайрд л таалагдчих гэж хичээгээл. 
              Хайрын өрөөнд орж хөзөр тоглочихоод гарахдаа албаар цамцаа үлдээнэ. Цамцаараа далимдуулж уулзах санаатай л.Яг хэдэн гэдгийг санахгүй ч шөнө хичээлээ хийнэ хэсэгхэн унтчихая сэрээгээрэй гэж надад хэлдэг болсоноос хойш хайрыгаа дахин багахан хугацаанд ч болов харах боломж олдож сэрээх гэж өрөө рүү нь орохдоо догдолж ороод хайрыг сэрээхээр дахиад жаахан унтчихая гэхээр нь хараад л сууна. Яг тэр хэсэгхэн хугацаа хэр хурдан, удаан явж байгаа хамаагүй зөвхөн үзэсгэлэнтэй чамайгаа л харж суудаг байлаа.
              Тэр намрын өдрүүд явсаар би чамтай дотносох гэж хичээсээр гэхдээ би жаахан тэнэг байсан л даа. Намар дуусч өвөл болж их сургуулиудын өвлийн амралт эхлэж хайр гэр лүүгээ явах болов. Тэгээд л за би энэ охинийг алдчихвийдээ гэж айгаал нэг орой хамт байхдаа надтай үеэрхээч гэж гуйж билээ. Үерхэх санал тавихдаа найзуудынх дэргэд ч юм уу, дурсамжтай гоё цэцэг бариад сөгдөж сууж байгаад санал тавина гэж бодож байсан ч чамайгаа алдчихвийдээ гэж айснаасаа болоод нэг орой хамт байхдаа санал тавьсан. Дурсамжтой, гоёоор санал тавиагүйд уучлаарай хайраа. 
              Тэрнээс хойш хол байхад үнэхээр хэцүү, маш их санаад, цаг минут тутамд санаал хэзээ ирэх бол гэж бодоол байдаг байлаа. Хоёр талаас хотод очоод уулзахад санасан сэтгэл минь дэвтэж үнэхээр гоё байсан.
              Хавар нь сургуульдаа буцаад орсон маш том шалтгаан бол чи минь байсан. Хайртай учираад өөртөө итгэлтэй болоод, хайраасаа маш их зүйлүүг сурсан. Энэ хүний төлөө би хичээхгүй бол болохгүй юм байна даа гэх бодолтойгоор бүх чадлаараа хичээж эхэлсэн. Үүнээс хойш бараг 3 жил болллоо. Бүхий л цаг үед хайрийгаа дэмжиж, хамт байж, шантарч сэтгэлээр унасан үед минь дэмжиж, баярлах үед минь хамт баярлаж явдагт баярлалаа хайраа. Би чамтайгаа хамт байхад л аз жаргалийг мэдэрдэг. Хоёулаа ирээдүйд хуримаа мартагдахааргүй хийж, хүссэн газраа хамт сайхан амьдарнаа хайраа. Энэ бүхний төлөө, хайрынхаа төлөө, өөрсдийнхөө гэрэлт ирээдүйн төлөө хайр чадахаараа хичээнээ. Миний хайр хайртайгаа хамт байхад л болно. Чамдаа төрсөн өдрийн баярын мэнд хүргэе. Чамдаа хайртай шүү.</p> 
                 */}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default SuccessPage;

