import React, { useRef, useEffect } from "react";

const Rain = ({ onKeyFound }) => {
  const canvasRef = useRef(null);
  const drops = useRef([]);
  const dropCount = 150; // Дуслын тоо
  const hasKey = useRef(false); // түлхүүр авсан эсэх
  const keyDropIndex = useRef(null); // түлхүүрийн зүрхний индекс
  const clickedCount = useRef(0); // хэдэн зүрхэн дээр дарсан тоо

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // Canvas-ыг дэлгэцийн хэмжээтэй тэнцүү болгох
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Бороо дусал үүсгэх
    const createDrops = () => {
      drops.current = [];
      const messages = [
        "Love",
        "Happy Birthday!",
        "Smile!",
        "You are loved!"
      ];
      for (let i = 0; i < dropCount; i++) {
        drops.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          length: 10 + Math.random() * 20, //хэмжээ
          speed: 2 + Math.random() * 2,  // хурд
          opacity: 0.2 + Math.random() * 1,  // илүү тод болгосон
          message: messages[Math.floor(Math.random() * messages.length)],
          showMessage: false,
          clicked: false, // нэг зүрхэн дээр нэг удаа л дарагдана
        });
      }
    };
    createDrops();

    // Зүрх зурдаг функц
    function drawHeart(ctx, x, y, size, color, opacity) {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.beginPath();
      ctx.moveTo(x, y + size / 4);
      ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + size / 4);
      ctx.bezierCurveTo(x - size / 2, y + size / 2, x, y + size, x, y + size * 1.2);
      ctx.bezierCurveTo(x, y + size, x + size / 2, y + size / 2, x + size / 2, y + size / 4);
      ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + size / 4);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      ctx.restore();
    }

    // Бороо зурна
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < drops.current.length; i++) {
        const drop = drops.current[i];
        drawHeart(ctx, drop.x, drop.y, drop.length, '#ff4d6d', drop.opacity);
        if (drop.showMessage) {
          ctx.save();
          ctx.font = `${Math.max(16, drop.length)}px Arial`;
          ctx.fillStyle = '#fff';
          ctx.strokeStyle = '#ff4d6d';
          ctx.lineWidth = 2;
          ctx.textAlign = 'center';
          ctx.strokeText(drop.message, drop.x, drop.y - drop.length);
          ctx.fillText(drop.message, drop.x, drop.y - drop.length);
          ctx.restore();
        }
      }
    };

    // Бороо хөдөлгөнө
    const update = () => {
      for (let drop of drops.current) {
        drop.y += drop.speed;
        if (drop.y > canvas.height) {
          drop.y = -drop.length;
          drop.x = Math.random() * canvas.width;
        }
      }
    };

    // Animation loop
    const animate = () => {
      update();
      draw();
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Canvas дээр click хийхэд зүрхэн дээр дарсан эсэхийг шалгана
    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      let clickedHeart = false;
      for (let i = 0; i < drops.current.length; i++) {
        const drop = drops.current[i];
        if (drop.removed) continue;
        const dx = mouseX - drop.x;
        const dy = mouseY - (drop.y + drop.length / 2);
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < drop.length) {
          if (drop.clicked) return;
          drops.current.forEach(d => d.showMessage = false);
          if (!hasKey.current && clickedCount.current === 2) {
            drop.showMessage = true;
            drop.message = 'Түлхүүр';
            hasKey.current = true;
            keyDropIndex.current = i;
            // Түлхүүр гарсны дараа clicked-ийг дахин false болгож, clickedCount-ыг 0 болгоно
            drops.current.forEach(d => d.clicked = false);
            clickedCount.current = 0;
            if (onKeyFound) onKeyFound();
          } else if (!hasKey.current) {
            drop.showMessage = true;
            drop.clicked = true;
            clickedCount.current += 1;
          } else if (hasKey.current) {
            // Түлхүүр гарсны дараа зөвхөн random үг гарч ирнэ, clicked-ийг зөвхөн тухайн зүрхэн дээр true болгоно
            drop.showMessage = true;
            drop.clicked = true;
          }
          draw();
          clickedHeart = true;
          break;
        }
      }
      if (!clickedHeart) {
        // Зүрхэн дээр дараагүй бол event-ийг доош нь дамжуулна
        // Ямар ч үйлдэл хийхгүй, ингэснээр доорх элементүүд дээр click ажиллана
        return;
      }
      // Зүрхэн дээр дарсан бол event-ийг зогсоохгүй, зөвхөн canvas дотор логик ажиллана
    };
    canvas.addEventListener('click', handleClick);

    // Цэвэрлэх
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('click', handleClick);
    };
  }, [onKeyFound]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "auto",
        zIndex: 0, // хамгийн бага
      }}
    />
  );
};

export default Rain;

