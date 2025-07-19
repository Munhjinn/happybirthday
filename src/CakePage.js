import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import confetti from 'canvas-confetti';

const CAKE_ANIMATION = {
  initial: { opacity: 0, y: -40, scaleY: 0.7 },
  animate: (i) => ({
    opacity: 1,
    y: 0,
    scaleY: 1,
    transition: {
      delay: 0.3 + i * 0.4,
      type: 'spring',
      stiffness: 80,
      damping: 14
    }
  })
};
const ICING_ANIMATION = {
  initial: { scaleY: 0, opacity: 0, transformOrigin: 'top' },
  animate: (i) => ({
    scaleY: 1,
    opacity: 1,
    transition: {
      delay: 0.45 + i * 0.4,
      type: 'spring',
      stiffness: 80,
      damping: 12
    }
  })
};
const DECOR_ANIMATION = {
  initial: { opacity: 0, scale: 0.7 },
  animate: (delay) => ({ opacity: 1, scale: 1, transition: { delay, type: 'spring', stiffness: 120 } })
};
const CANDLE_DELAY = 0.3 + 3 * 0.4 + 0.3; // after all layers/icings

const firework = () => {
  // Зүүн доод булангаас
  confetti({
    particleCount: 60,
    angle: 60, // зүүн доод булангаас баруун дээд рүү
    spread: 55,
    origin: { x: 0, y: 1 },
    startVelocity: 80 // илүү өндөр буудна
  });
  // Баруун доод булангаас
  confetti({
    particleCount: 60,
    angle: 120, // баруун доод булангаас зүүн дээд рүү
    spread: 55,
    origin: { x: 1, y: 1 },
    startVelocity: 80 // илүү өндөр буудна
  });
};

const CakePage = () => {
  const navigate = useNavigate();
  const [isCandleLit, setIsCandleLit] = useState(true);
  const [showCongrats, setShowCongrats] = useState(false);
  const [showWind, setShowWind] = useState(false);
  const [showCloud, setShowCloud] = useState(true); // ← ШИНЭ STATE
  const { width, height } = useWindowSize();

  const handleBlowCandle = () => {
    setShowWind(true);
    setShowCloud(false);
    setTimeout(() => {
      setIsCandleLit(false); // салхи дууссаны дараа лаа унтарна
      setShowWind(false);
      firework();
      setShowCongrats(true);
      setTimeout(() => {
        navigate('/success');
      }, 10000);
    }, 1200); // салхи хэдэн секунд гарахыг энд тохируулна
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(180deg, #fff6f6 0%, #ffe0e9 100%)',
      padding: '20px',
      boxSizing: 'border-box',
    }}>
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ 
          color: '#e63950', 
          fontFamily: 'Great Vibes, cursive', 
          fontSize: 'clamp(2rem, 8vw, 2.7rem)', 
          marginBottom: 'clamp(20px, 5vw, 40px)',
          textAlign: 'center',
          lineHeight: 1.2,
        }}
      >
        
  
      </motion.h1>
      
      {/* Responsive cake container */}
      <div style={{
        width: '100%',
        maxWidth: '300px',
        marginBottom: 'clamp(20px, 5vw, 40px)',
        position: 'relative',
      }}>
        {/* Cloud зөвхөн showCloud үед */}
        {showCloud && (
          <>
            <img 
              src="/img/cloud.png" 
              alt="Cloud" 
              style={{
                position: 'absolute',
                top: '-100px',
                left: '50%',
                transform: 'translateX(-100%)',
                width: '200px',
                zIndex: 2,
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '-40px',
                left: '50%',
                transform: 'translateX(-100%)',
                width: '200px',
                textAlign: 'center',
                color: '#ffffffff',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                zIndex: 3,
                pointerEvents: 'none',
                fontFamily: 'Great Vibes, cursive',
                userSelect: 'none'
              }}
            >
              Хүслээ  бодоод <br/>
               лаагаа vлээгээрэй<br/>
                хайрт минь
            </div>
          </>
        )}

        {/* WIND.PNG зөвхөн showWind үед лааны баруун талд */}
        {showWind && (
          <motion.img
            src="/img/wind.png"
            alt="Wind"
            initial={{ opacity: 0, x: 40 }} // баруунаас fade-in
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 1, type: "spring" }}
            style={{
              position: 'absolute',
              top: '36px',
              left: '185px',
              width: '55px',
              zIndex: 5,
              pointerEvents: 'none'
            }}
          />
        )}

        <svg 
          width="100%" 
          height="auto" 
          viewBox="0 0 260 340" 
          style={{ display: 'block', position: 'relative', zIndex: 1 }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* White base/plate under the cake */}
          <rect x="10" y="250" width="240" height="18" rx="9" fill="#fff" />
          {/* Bottom tier group */}
          <motion.g
  initial="initial"
  animate="animate"
  custom={2}
  variants={CAKE_ANIMATION}
>
  <rect x="30" y="180" width="200" height="70" rx="30" fill="#fae3d9" />
  <motion.path
    d="M30,210 Q60,250 90,210 Q120,170 150,210 Q180,250 230,210 L230,250 Q130,270 30,250 Z"
    fill="#f9a1bc"
    initial="initial"
    animate="animate"
    custom={2}
    variants={ICING_ANIMATION}
    style={{ transformOrigin: '130px 170px' }} // top хэсэгт origin-оо тохируулна
  />
  {/* Bottom dots */}
  {[50, 80, 110, 140, 170, 200].map((cx, i) => (
    <motion.circle key={cx} cx={cx} cy={240 + (i % 2) * 5} r="5" fill="#fff"
      initial="initial" animate="animate" variants={DECOR_ANIMATION} custom={2.2 + i * 0.05} />
  ))}
</motion.g>
          {/* Middle tier group */}
          <motion.g
  initial="initial"
  animate="animate"
  custom={1}
  variants={CAKE_ANIMATION}
>
  <rect x="50" y="130" width="160" height="60" rx="25" fill="#fff6e0" />
  <motion.path
    d="M50,160 Q80,200 110,160 Q140,120 170,160 Q200,200 210,160 L210,190 Q130,200 50,190 Z"
    fill="#f9a1bc"
    initial="initial"
    animate="animate"
    custom={1}
    variants={ICING_ANIMATION}
    style={{ transformOrigin: '130px 120px' }}
  />
  {/* Red balls */}
  {[75, 105, 135, 165, 195].map((cx, i) => (
    <motion.circle key={cx} cx={cx} cy={185 + (i % 2) * 10} r="7" fill="#ff4d6d"
      initial="initial" animate="animate" variants={DECOR_ANIMATION} custom={1.2 + i * 0.05} />
  ))}
</motion.g>
          {/* Top tier group */}
          <motion.g
  initial="initial"
  animate="animate"
  custom={0}
  variants={CAKE_ANIMATION}
>
  <rect x="80" y="90" width="100" height="40" rx="20" fill="#fff6e0" />
  <motion.path
    d="M80,110 Q95,130 110,110 Q125,90 140,110 Q155,130 170,110 Q185,90 180,120 L180,130 Q130,135 80,130 Z"
    fill="#f9a1bc"
    initial="initial"
    animate="animate"
    custom={0}
    variants={ICING_ANIMATION}
    style={{ transformOrigin: '130px 90px' }}
  />
  {/* Yellow balls */}
  {[100, 130, 160].map((cx, i) => (
    <motion.circle key={cx} cx={cx} cy={125 + (i % 2) * 7} r="6" fill="#ffe066"
      initial="initial" animate="animate" variants={DECOR_ANIMATION} custom={0.8 + i * 0.07} />
  ))}
</motion.g>
          {/* Candle group - appears last */}
          <motion.g initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: CANDLE_DELAY, type: 'spring', stiffness: 80 }}>
            {/* Candle shadow */}
            <ellipse cx="131" cy="92" rx="10" ry="4" fill="#e0bfae" opacity="0.25" />
            {/* Candle body with stripes */}
            <g>
              <rect x="128" y="50" width="6" height="40" rx="3" fill="#fff" stroke="#ffb347" strokeWidth="2" />
              {/* Red stripes */}
              {[0, 1, 2, 3, 4].map(i => (
                <rect key={i} x="128" y={50 + i * 8} width="6" height="4" rx="2" fill="#ff4d6d" opacity="0.7" />
              ))}
              {/* Melted wax drip */}
              <path d="M131,50 Q133,55 130,58 Q132,56 131,60 Q132,56 133,54 Q134,52 131,50" fill="#fff6e0" opacity="0.85" />
            </g>
            {/* Candle highlights */}
            <rect x="130" y="55" width="2" height="20" rx="1" fill="#ffe066" opacity="0.25" />
            
            {/* Candle flame with gradient - only show when lit */}
            {isCandleLit && (
              <>
                <defs>
                  <radialGradient id="flameGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#fffbe6" stopOpacity="1" />
                    <stop offset="80%" stopColor="#ffe066" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#ffb347" stopOpacity="0.2" />
                  </radialGradient>
                  <linearGradient id="flameMain" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fffbe6" />
                    <stop offset="60%" stopColor="#ffe066" />
                    <stop offset="100%" stopColor="#ffb347" />
                  </linearGradient>
                </defs>
                {/* Flame glow - дээд тал шовх, доод тал бөөрөнхий */}
                <motion.path
                  d="M131,30 Q137,40 131,60 Q125,40 131,30 Q131,30 131,30 Z"
                  fill="url(#flameGlow)"
                  opacity="0.5"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                    scale: [1, 1.08, 1],
                    transition: { repeat: Infinity, duration: 1.6, ease: "easeInOut" }
                  }}
                  transition={{ delay: CANDLE_DELAY + 0.1, type: 'spring' }}
                />
                {/* Main flame (шар) */}
                <motion.path
                  d="M131,57 Q135,45 131,38 Q127,45 131,57 Z"
                  fill="url(#flameMain)"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{
                    opacity: [1, 0.8, 1],
                    scaleY: [1, 1.12, 1],
                    y: [0, -2, 0],
                    transition: { repeat: Infinity, duration: 1.3, ease: "easeInOut" }
                  }}
                  transition={{ delay: CANDLE_DELAY + 0.2, type: 'spring' }}
                />
                {/* Flame inner highlight (цагаан) */}
                <motion.ellipse
                  cx="131" cy="46" rx="2" ry="4" fill="#fffbe6" opacity="0.7"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{
                    opacity: [0.7, 1, 0.7],
                    scaleY: [1, 1.18, 1],
                    y: [0, -1, 0],
                    transition: { repeat: Infinity, duration: 1.1, ease: "easeInOut" }
                  }}
                  transition={{ delay: CANDLE_DELAY + 0.3, type: 'spring' }}
                />
              </>
            )}
            
            {/* Smoke effect when candle is blown out */}
            {!isCandleLit && (
              <motion.g
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: -20 }}
                transition={{ duration: 2, ease: "easeOut" }}
              >
                {/* Smoke particles */}
                {[0, 1, 2, 3].map(i => (
                  <motion.circle
                    key={i}
                    cx={137 + (i - 2) * 3}
                    cy={68 - i * 4} // 57 бол лааны дээд үзүүр
                    r={2 + i * 0.5}
                    fill="#d3d3d3"
                    opacity={0.6 - i * 0.1}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 0.6 - i * 0.1, scale: 1 }}
                    transition={{ delay: i * 0.1, duration: 1.5 }}
                  />
                ))}
              </motion.g>
            )}
          </motion.g>
        </svg>
      </div>
        {/* Additional button below the first one */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        style={{
          background: 'linear-gradient(90deg, #ff6b9d 0%, #ffd1dc 100%)',
          color: '#fff',
          border: 'none',
          borderRadius: 'clamp(16px, 4vw, 24px)',
          padding: 'clamp(12px, 3vw, 16px) clamp(32px, 8vw, 44px)',
          fontSize: 'clamp(1rem, 4vw, 1.25rem)',
          fontFamily: 'inherit',
          cursor: 'pointer',
          boxShadow: '0 2px 12px rgba(255,107,157,0.12)',
          marginTop: 'clamp(8px, 2vw, 12px)',
          width: 'fit-content',
          minWidth: '200px',
          maxWidth: '90vw',
        }}
        onClick={handleBlowCandle}
      >
        Үлээх
      </motion.button>
   
      {/* Лаа унтарсны дараа Happy Birthday бичиг */}
      {!isCandleLit && showCongrats && (
        <>
          <motion.h2
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            style={{
              position: 'absolute',
              top: '20%',
              left: 0,
              right: 0,
              textAlign: 'center',
              color: '#e63950',
              fontFamily: 'Great Vibes, cursive',
              fontSize: '2.5rem',
              zIndex: 10,
            }}
          >
            Happy Birthday!
          </motion.h2>
          <Confetti width={width} height={height} />
        </>
      )}
    </div>
  );
};

export default CakePage;