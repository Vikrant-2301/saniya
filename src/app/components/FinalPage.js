"use client";
import { useState, useEffect, useRef } from "react";

const MESSAGES = [
  "May your day be as wonderful as you are,",
  "filled with love, laughter, and every beautiful thing",
  "you truly deserve. 🌸✨💕",
];

function ConfettiCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = ["#ff8fab", "#e05278", "#f9c74f", "#ffc2d4", "#ff4d79", "#ffb3c8", "#fff", "#ff6b9d", "#c084fc"];
    const shapes = ["rect", "circle", "heart"];

    const pieces = Array.from({ length: 160 }, () => ({
      x: Math.random() * window.innerWidth,
      y: -20 - Math.random() * 200,
      size: 4 + Math.random() * 9,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      speedY: 1.2 + Math.random() * 2.8,
      speedX: (Math.random() - 0.5) * 2,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 5,
      opacity: 0.75 + Math.random() * 0.25,
      sway: Math.random() * Math.PI * 2,
      swaySpeed: 0.02 + Math.random() * 0.04,
    }));

    let animId;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach((p) => {
        p.y += p.speedY;
        p.sway += p.swaySpeed;
        p.x += Math.sin(p.sway) * 0.8 + p.speedX;
        p.rotation += p.rotSpeed;
        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);

        if (p.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === "heart") {
          const s = p.size / 10;
          ctx.beginPath();
          ctx.moveTo(0, -s * 2);
          ctx.bezierCurveTo(s * 3, -s * 5, s * 8, s, 0, s * 6);
          ctx.bezierCurveTo(-s * 8, s, -s * 3, -s * 5, 0, -s * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-p.size / 2, -p.size * 0.3, p.size, p.size * 0.6);
        }
        ctx.restore();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}
    />
  );
}

export default function FinalPage({ onRestart }) {
  const [show, setShow] = useState(false);
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => { setTimeout(() => setShow(true), 80); }, []);

  // Reveal messages one by one
  useEffect(() => {
    if (msgIdx < MESSAGES.length - 1) {
      const t = setTimeout(() => setMsgIdx((i) => i + 1), 1400);
      return () => clearTimeout(t);
    }
  }, [msgIdx]);

  return (
    <div
      className="page-noscroll"
      style={{
        background: "linear-gradient(145deg, #fff0f5 0%, #ffd6e7 35%, #ffb3cc 65%, #ffe0ec 100%)",
        backgroundSize: "300% 300%",
        animation: show ? "rainbowShift 8s ease-in-out infinite" : "none",
        opacity: show ? 1 : 0,
        transition: "opacity 0.8s ease",
        overflow: "hidden",
        gap: 0,
      }}
    >
      <ConfettiCanvas />

      {/* Floating orbs */}
      <div style={{
        position:"absolute", top:"-8%", left:"-6%",
        width:"clamp(200px,32vw,400px)", height:"clamp(200px,32vw,400px)",
        borderRadius:"50%",
        background:"radial-gradient(circle, rgba(255,100,140,0.4) 0%, transparent 70%)",
        filter:"blur(30px)", pointerEvents:"none", zIndex:1,
        animation:"float 9s ease-in-out infinite",
      }}/>
      <div style={{
        position:"absolute", bottom:"-6%", right:"-5%",
        width:"clamp(180px,26vw,340px)", height:"clamp(180px,26vw,340px)",
        borderRadius:"50%",
        background:"radial-gradient(circle, rgba(249,199,79,0.35) 0%, transparent 70%)",
        filter:"blur(24px)", pointerEvents:"none", zIndex:1,
        animation:"floatR 12s ease-in-out 2s infinite",
      }}/>

      <div style={{ position:"relative", zIndex:2, width:"100%", display:"flex", flexDirection:"column", alignItems:"center", gap:0 }}>

        {/* Party icons */}
        <div style={{
          fontSize:"clamp(2rem, 7vw, 4rem)",
          letterSpacing:"0.15em",
          marginBottom:"clamp(0.3rem,1.5vh,0.8rem)",
          animation:"fadeDown 0.7s ease-out both",
          display:"flex",
          gap:"0.2rem",
          alignItems:"center",
        }}>
          {["🎉","🎂","🎊"].map((e, i) => (
            <span key={i} style={{
              display:"inline-block",
              animation:`float ${3+i}s ease-in-out ${i*0.4}s infinite, fadeDown 0.7s ease-out ${i*0.1}s both`,
            }}>{e}</span>
          ))}
        </div>

        {/* HBD SVG */}
        <img
          src="/assets/as/4.svg"
          alt="HBD"
          style={{
            width:"clamp(130px, 26vw, 280px)",
            margin:"0 auto",
            marginBottom:"clamp(0.3rem,1vh,0.6rem)",
            filter:"drop-shadow(0 12px 40px rgba(224,82,120,0.45))",
            animation:"float 5s ease-in-out infinite, scaleInBounce 0.8s ease-out 0.1s both",
          }}
        />

        {/* Happy Birthday text */}
        <h1 style={{
          fontFamily:"'Dancing Script', cursive",
          fontSize:"clamp(1.6rem, 5.5vw, 3.5rem)",
          fontWeight:700,
          color:"#e05278",
          marginBottom:"0.1rem",
          animation:"fadeUp 0.7s ease-out 0.25s both, glowText 3s ease-in-out 1s infinite",
          textAlign:"center",
        }}>
          Happy Birthday,
        </h1>

        {/* Name */}
        <div style={{
          fontFamily:"'Dancing Script', cursive",
          fontSize:"clamp(3rem, 11vw, 7rem)",
          fontWeight:700,
          background:"linear-gradient(135deg, #c0395e 0%, #e05278 25%, #ff8fab 55%, #f9c74f 75%, #e05278 100%)",
          backgroundSize:"300% 300%",
          WebkitBackgroundClip:"text",
          WebkitTextFillColor:"transparent",
          backgroundClip:"text",
          lineHeight:1,
          animation:"fadeUp 0.7s ease-out 0.3s both, rainbowShift 5s ease-in-out infinite",
          marginBottom:"clamp(0.5rem,1.5vh,1rem)",
          textAlign:"center",
          filter:"drop-shadow(0 4px 20px rgba(224,82,120,0.2))",
        }}>
          Saniya! 💖
        </div>

        {/* Message card */}
        <div
          className="glass-card"
          style={{
            padding:"clamp(0.8rem,2vw,1.5rem) clamp(1rem,3vw,2rem)",
            maxWidth:"min(520px, 92vw)",
            margin:"0 auto",
            marginBottom:"clamp(0.8rem,2vh,1.5rem)",
            animation:"scaleInBounce 0.8s ease-out 0.5s both",
            textAlign:"center",
            minHeight:"clamp(80px, 15vh, 120px)",
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            gap:"0.2rem",
          }}
        >
          {MESSAGES.slice(0, msgIdx + 1).map((msg, i) => (
            <p
              key={i}
              style={{
                fontFamily:"'Dancing Script', cursive",
                fontSize:"clamp(0.9rem, 2.5vw, 1.3rem)",
                color:"#7a2040",
                lineHeight:1.65,
                fontWeight:600,
                animation:"fadeUp 0.6s ease-out both",
                animationDelay: `${i * 0.15}s`,
              }}
            >
              {msg}
            </p>
          ))}
        </div>

        {/* Party SVG row */}
        <div style={{
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
          gap:"clamp(0.6rem, 2vw, 1.2rem)",
          marginBottom:"clamp(0.8rem,2vh,1.5rem)",
          flexWrap:"wrap",
          animation:"fadeUp 0.7s ease-out 0.7s both",
        }}>
          {[
            { src:"/assets/as/5.svg", dur:5, h:false },
            { src:"/assets/as/heart.svg", dur:0, h:true },
            { src:"/assets/as/6.svg", dur:6, h:false },
          ].map((item, i) => (
            <img
              key={i}
              src={item.src}
              alt=""
              style={{
                width:"clamp(50px, 9vw, 85px)",
                filter:"drop-shadow(0 5px 16px rgba(255,77,121,0.4))",
                animation: item.h
                  ? "heartbeatBig 1.3s ease-in-out infinite"
                  : `float ${item.dur}s ease-in-out ${i*0.3}s infinite`,
              }}
            />
          ))}
        </div>

        {/* Restart button */}
        <button
          onClick={onRestart}
          className="btn btn-outline"
          style={{
            fontSize:"clamp(0.85rem, 2vw, 1rem)",
            padding:"clamp(0.7rem,1.5vw,0.9rem) clamp(1.5rem,4vw,2.2rem)",
            animation:"fadeUp 0.7s ease-out 0.9s both",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px) scale(1.05)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = ""; }}
        >
          🔁 Experience Again
        </button>
      </div>
    </div>
  );
}
