"use client";
import { useState, useEffect, useRef } from "react";

const MESSAGES = [
  "May your day be as wonderful as you are,",
  "filled with joy, laughter, and every beautiful thing",
  "you truly deserve. ❄️✨💙",
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

    const colors = ["#6cbfe0", "#2899cc", "#b3ddf0", "#4ab3d8", "#dff0f8", "#9ed5ec", "#fff", "#156b99", "#a8d8ea"];
    const shapes = ["rect", "circle", "heart"];

    const pieces = Array.from({ length: 130 }, () => ({
      x: Math.random() * window.innerWidth,
      y: -20 - Math.random() * 200,
      size: 4 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      speedY: 1.2 + Math.random() * 2.5,
      speedX: (Math.random() - 0.5) * 2,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 5,
      opacity: 0.7 + Math.random() * 0.3,
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

  useEffect(() => {
    if (msgIdx < MESSAGES.length - 1) {
      const t = setTimeout(() => setMsgIdx((i) => i + 1), 1400);
      return () => clearTimeout(t);
    }
  }, [msgIdx]);

  return (
    <div
      style={{
        height: "100dvh",
        width: "100vw",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        background: "linear-gradient(-45deg, #dff0f8, #b3ddf0, #c8e8f5, #e8f5fb, #9ed5ec, #a8d8ea)",
        backgroundSize: "400% 400%",
        animation: show ? "rainbowShift 8s ease-in-out infinite" : "none",
        opacity: show ? 1 : 0,
        transition: "opacity 0.8s ease",
        gap: 0,
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      <ConfettiCanvas />

      {/* Floating orbs */}
      <div style={{
        position: "absolute", top: "-8%", left: "-6%",
        width: "clamp(150px, 28vw, 350px)", height: "clamp(150px, 28vw, 350px)",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(40,153,204,0.38) 0%, transparent 70%)",
        filter: "blur(35px)", pointerEvents: "none", zIndex: 1,
        animation: "float 9s ease-in-out infinite",
      }}/>
      <div style={{
        position: "absolute", bottom: "-6%", right: "-5%",
        width: "clamp(130px, 22vw, 300px)", height: "clamp(130px, 22vw, 300px)",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(21,107,153,0.28) 0%, transparent 70%)",
        filter: "blur(28px)", pointerEvents: "none", zIndex: 1,
        animation: "floatR 12s ease-in-out 2s infinite",
      }}/>

      {/* Content column */}
      <div style={{
        position: "relative",
        zIndex: 2,
        width: "100%",
        maxWidth: "560px",
        padding: "0 1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "clamp(0.3rem, 1.2vh, 0.7rem)",
      }}>

        {/* Party emoji row */}
        <div style={{
          fontSize: "clamp(1.5rem, 4.5vw, 2.5rem)",
          display: "flex",
          gap: "0.3rem",
          alignItems: "center",
          animation: "fadeDown 0.7s ease-out both",
        }}>
          {["🎉", "🎂", "🎊"].map((e, i) => (
            <span key={i} style={{
              display: "inline-block",
              animation: `float ${3 + i}s ease-in-out ${i * 0.4}s infinite`,
            }}>{e}</span>
          ))}
        </div>

        {/* HBD SVG */}
        <img
          src="/assets/as/4.svg"
          alt="HBD"
          style={{
            width: "clamp(90px, 18vw, 200px)",
            filter: "drop-shadow(0 8px 28px rgba(40,153,204,0.5)) hue-rotate(180deg)",
            animation: "float 5s ease-in-out infinite, scaleInBounce 0.8s ease-out 0.1s both",
          }}
        />

        {/* Happy Birthday text */}
        <h1 style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: "clamp(1.3rem, 4vw, 2.5rem)",
          fontWeight: 700,
          background: "linear-gradient(135deg, #156b99, #2899cc, #6cbfe0)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          margin: 0,
          animation: "fadeUp 0.7s ease-out 0.25s both, glowText 3s ease-in-out 1s infinite",
          textAlign: "center",
          lineHeight: 1.1,
        }}>
          Happy Birthday,
        </h1>

        {/* Name */}
        <div style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: "clamp(2.5rem, 9vw, 5.5rem)",
          fontWeight: 700,
          background: "linear-gradient(135deg, #156b99 0%, #2899cc 25%, #6cbfe0 55%, #b3ddf0 75%, #2899cc 100%)",
          backgroundSize: "300% 300%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          lineHeight: 1.05,
          animation: "fadeUp 0.7s ease-out 0.3s both, rainbowShift 5s ease-in-out infinite",
          textAlign: "center",
          filter: "drop-shadow(0 3px 14px rgba(40,153,204,0.25))",
          margin: 0,
        }}>
          Saniya! 💙
        </div>

        {/* Message card */}
        <div
          className="glass-card"
          style={{
            padding: "clamp(0.5rem, 1.5vw, 1rem) clamp(0.8rem, 2.5vw, 1.6rem)",
            width: "100%",
            maxWidth: "min(460px, 92vw)",
            animation: "scaleInBounce 0.8s ease-out 0.5s both",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "0.15rem",
            border: "1.5px solid rgba(74,179,216,0.5)",
          }}
        >
          {MESSAGES.slice(0, msgIdx + 1).map((msg, i) => (
            <p
              key={i}
              style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: "clamp(0.82rem, 2vw, 1.1rem)",
                color: "#0f4c6e",
                lineHeight: 1.55,
                fontWeight: 600,
                margin: 0,
                animation: "fadeUp 0.6s ease-out both",
                animationDelay: `${i * 0.15}s`,
              }}
            >
              {msg}
            </p>
          ))}
        </div>

        {/* Party SVG row */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "clamp(0.5rem, 2vw, 1.2rem)",
          flexWrap: "wrap",
          animation: "fadeUp 0.7s ease-out 0.7s both",
        }}>
          {[
            { src: "/assets/as/5.svg", dur: 5, h: false },
            { src: "/assets/as/heart.svg", dur: 0, h: true },
            { src: "/assets/as/6.svg", dur: 6, h: false },
          ].map((item, i) => (
            <img
              key={i}
              src={item.src}
              alt=""
              style={{
                width: "clamp(40px, 7vw, 72px)",
                filter: "drop-shadow(0 4px 12px rgba(40,153,204,0.45)) hue-rotate(180deg)",
                animation: item.h
                  ? "heartbeatBig 1.3s ease-in-out infinite"
                  : `float ${item.dur}s ease-in-out ${i * 0.3}s infinite`,
              }}
            />
          ))}
        </div>

        {/* Restart button */}
        <button
          onClick={onRestart}
          className="btn btn-outline"
          style={{
            fontSize: "clamp(0.78rem, 1.8vw, 0.95rem)",
            padding: "clamp(0.55rem, 1.2vw, 0.78rem) clamp(1.3rem, 3.5vw, 2rem)",
            animation: "fadeUp 0.7s ease-out 0.9s both",
            borderColor: "rgba(74,179,216,0.5)",
            color: "#2899cc",
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
