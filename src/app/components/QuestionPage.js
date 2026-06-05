"use client";
import { useState, useEffect } from "react";
import BlueDeco from "./BlueDeco";

export default function QuestionPage({ onYes }) {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noCount, setNoCount] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => { setTimeout(() => setShow(true), 80); }, []);

  const dodge = () => {
    const x = (Math.random() - 0.5) * 260;
    const y = (Math.random() - 0.5) * 160;
    setNoPos({ x, y });
    setNoCount((c) => c + 1);
  };

  const msgs = ["Nope! 😜","Try again! 😂","Haha no! 🙈","Are you sure? 🤔","I don't think so! 😝","Never! 🤣","You can't! 🏃","Come on! 💙"];

  return (
    <div
      className="page-noscroll"
      style={{
        background: "linear-gradient(-45deg, #dff0f8, #b3ddf0, #c8e8f5, #e8f5fb, #a8d8ea, #9ed5ec)",
        backgroundSize: "400% 400%",
        animation: show ? "blueQShift 10s ease-in-out infinite" : "none",
        textAlign: "center",
        opacity: show ? 1 : 0,
        transition: "opacity 0.7s ease",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes blueQShift {
          0%,100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>

      <BlueDeco variant="balloons" />

      {/* Mascot */}
      <img
        src="/assets/as/5.svg"
        alt=""
        style={{
          width: "clamp(130px, 22vw, 200px)",
          margin: "0 auto 1.5rem",
          filter: "drop-shadow(0 10px 28px rgba(40,153,204,0.35)) hue-rotate(180deg)",
          animation: "float 4s ease-in-out infinite, fadeUp 0.6s ease-out both",
          position: "relative",
          zIndex: 2,
        }}
      />

      {/* Card */}
      <div
        className="glass-card"
        style={{
          padding: "2.5rem 2rem",
          maxWidth: "480px",
          width: "100%",
          textAlign: "center",
          position: "relative",
          zIndex: 2,
          animation: "scaleIn 0.6s ease-out 0.1s both",
          border: "1.5px solid rgba(74,179,216,0.5)",
        }}
      >
        {/* Blue shimmer top bar */}
        <div style={{
          position: "absolute", top: 0, left: "20%", right: "20%",
          height: "3px",
          background: "linear-gradient(90deg, #b3ddf0, #2899cc, #6cbfe0, #b3ddf0)",
          backgroundSize: "200%",
          animation: "shimmer 3s linear infinite",
          borderRadius: "999px",
        }}/>

        <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🎁</div>

        <h2 style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: "clamp(1.7rem, 5vw, 2.6rem)",
          fontWeight: 700,
          background: "linear-gradient(135deg, #156b99, #2899cc, #6cbfe0)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          marginBottom: "0.4rem",
        }}>
          Are you ready for your surprise?
        </h2>
        <p style={{ color: "#2178a6", fontSize: "0.95rem", marginBottom: "2rem" }}>
          Your photo gallery of precious memories is waiting! 📸
        </p>

        {/* Buttons */}
        <div style={{
          position: "relative", display: "flex", gap: "1rem",
          justifyContent: "center", alignItems: "center",
          minHeight: "70px", flexWrap: "wrap",
        }}>
          <button
            onClick={onYes}
            className="btn btn-primary"
            style={{ fontSize: "1.1rem", padding: "0.95rem 2.8rem" }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px) scale(1.06)"; e.currentTarget.style.boxShadow = "0 14px 40px rgba(40,153,204,0.55)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
          >
            Yes! 🎉
          </button>

          <button
            onMouseEnter={dodge}
            onClick={dodge}
            className="btn btn-outline"
            style={{
              transform: `translate(${noPos.x}px, ${noPos.y}px)`,
              transition: "transform 0.15s ease",
              userSelect: "none",
              fontSize: "1rem",
              padding: "0.85rem 2rem",
            }}
          >
            {noCount === 0 ? "No 🙈" : msgs[Math.min(noCount - 1, msgs.length - 1)]}
          </button>
        </div>

        {noCount > 3 && (
          <p style={{ marginTop: "1rem", color: "#2899cc", fontSize: "0.85rem", animation: "fadeUp 0.4s ease-out both" }}>
            You can't say no! The gallery is waiting for you! 😂💙
          </p>
        )}
      </div>
    </div>
  );
}
