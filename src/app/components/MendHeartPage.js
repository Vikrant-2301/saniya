"use client";
import React, { useState, useEffect } from "react";

// Elegant golden spark replacing the emoji bursts
function BurstParticle({ x, y, delay }) {
  return (
    <div style={{
      position: "absolute",
      left: `${x}%`,
      top: `${y}%`,
      width: "clamp(4px, 1vmin, 8px)",
      height: "clamp(4px, 1vmin, 8px)",
      borderRadius: "50%",
      background: "#fcf6ba",
      boxShadow: "0 0 15px 3px rgba(228, 184, 114, 0.8)",
      animation: `goldenSparkle 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}s both`,
      pointerEvents: "none",
      zIndex: 10,
      transform: "translate(-50%, -50%)",
    }} />
  );
}

// Elegant rising starlight replacing sky emojis
function SkyParticle({ startX, delay, dur, size }) {
  return (
    <div style={{
      position: "absolute",
      left: `${startX}%`,
      bottom: "-10%",
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: "50%",
      background: "linear-gradient(135deg, #fff, #fcf6ba)",
      boxShadow: `0 0 ${size * 3}px rgba(228, 184, 114, 0.6)`,
      animation: `skyRise ${dur}s ease-in ${delay}s both`,
      pointerEvents: "none",
      zIndex: 3,
    }} />
  );
}

export default function ElegantMendHeart({ onNext = () => console.log("Next!") }) {
  const [phase, setPhase] = useState("broken"); // broken | mending | whole | done
  const [show, setShow] = useState(false);
  const [burst, setBurst] = useState([]);
  const [skyParticles, setSkyParticles] = useState([]);
  const [tapEffect, setTapEffect] = useState(null);

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  const handleMend = (e) => {
    if (phase !== "broken") return;

    // Create tap ripple coordinates
    const rect = e.currentTarget.getBoundingClientRect();
    setTapEffect({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setTimeout(() => setTapEffect(null), 800);

    setPhase("mending");

    // Generate Kintsugi golden sparks
    const newBurst = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: 35 + Math.random() * 30,
      y: 25 + Math.random() * 50,
      delay: Math.random() * 0.4,
    }));
    setBurst(newBurst);

    // Generate rising ethereal lights
    const newSky = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      startX: 10 + Math.random() * 80,
      delay: 0.5 + Math.random() * 0.5,
      dur: 3 + Math.random() * 2,
      size: Math.random() * 4 + 2,
    }));
    setSkyParticles(newSky);

    // Cinematic timing for the mending process
    setTimeout(() => setPhase("whole"), 1600);
    setTimeout(() => setPhase("done"), 3200);
  };

  // Shared mask style to turn any SVG into a gold gradient
  const goldMaskStyle = {
    WebkitMaskImage: 'url(/assets/as/heart.svg)',
    WebkitMaskSize: 'contain',
    WebkitMaskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center',
    maskImage: 'url(/assets/as/heart.svg)',
    maskSize: 'contain',
    maskRepeat: 'no-repeat',
    maskPosition: 'center',
    background: "linear-gradient(135deg, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c)",
    backgroundSize: "200% 200%",
  };

  return (
    <>
      <style>{`
        @keyframes auroraShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes goldenSparkle {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
          50% { transform: translate(-50%, -50%) scale(1.5); opacity: 1; }
          100% { transform: translate(calc(-50% + ${Math.random() * 100 - 50}px), calc(-50% - ${Math.random() * 100}px)) scale(0); opacity: 0; }
        }
        @keyframes skyRise {
          0% { transform: translateY(0) scale(0.5); opacity: 0; }
          20% { opacity: 0.8; }
          100% { transform: translateY(-120vh) scale(1.2); opacity: 0; }
        }
        @keyframes cinematicFadeDown {
          from { opacity: 0; transform: translateY(-30px); filter: blur(10px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes cinematicFadeUp {
          from { opacity: 0; transform: translateY(30px); filter: blur(10px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes elegantPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(228, 184, 114, 0.2); }
          50% { box-shadow: 0 0 40px rgba(228, 184, 114, 0.6); }
        }
        @keyframes goldShimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes rippleRing {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }
        }
        @keyframes heartbeatSlow {
          0%, 100% { transform: translateX(-50%) scale(1.15); filter: drop-shadow(0 0 30px rgba(228, 184, 114, 0.4)); }
          50% { transform: translateX(-50%) scale(1.2); filter: drop-shadow(0 0 50px rgba(228, 184, 114, 0.8)); }
        }
      `}</style>

      <div
        onClick={phase === "broken" ? handleMend : undefined}
        style={{
          height: "100dvh",
          width: "100vw",
          overflow: "hidden",
          margin: 0,
          padding: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background: "linear-gradient(-45deg, #07080a, #1a1625, #0f131a)",
          backgroundSize: "300% 300%",
          animation: show ? "auroraShift 15s ease infinite" : "none",
          cursor: phase === "broken" ? "pointer" : "default",
          opacity: show ? 1 : 0,
          transition: "opacity 1.2s ease",
          userSelect: "none",
          fontFamily: "'Outfit', sans-serif",
          gap: "4vh",
        }}
      >
        {/* Ambient Dark Background Glows */}
        <div style={{ position: "absolute", top: "-10%", left: "-10%", width: "50vmin", height: "50vmin", background: "rgba(228, 184, 114, 0.08)", filter: "blur(60px)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-10%", right: "-10%", width: "60vmin", height: "60vmin", background: "rgba(107, 76, 154, 0.15)", filter: "blur(70px)", borderRadius: "50%", pointerEvents: "none" }} />

        {/* Ambient Floating Stardust */}
        {[...Array(6)].map((_, i) => (
          <div key={`star-${i}`} style={{
            position: "absolute",
            left: `${[10, 85, 15, 90, 50, 20][i]}%`,
            top: `${[20, 25, 75, 65, 10, 85][i]}%`,
            width: "3px", height: "3px",
            borderRadius: "50%",
            background: "#e4b872",
            boxShadow: "0 0 10px #e4b872",
            opacity: 0.3,
            animation: `skyRise ${8 + i}s ease-in-out ${i}s infinite alternate`,
            pointerEvents: "none",
            zIndex: 1,
          }} />
        ))}

        {/* Tap Ripple Effect */}
        {tapEffect && (
          <div style={{
            position: "absolute",
            left: tapEffect.x,
            top: tapEffect.y,
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            border: "2px solid rgba(228, 184, 114, 0.8)",
            animation: "rippleRing 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards",
            pointerEvents: "none",
            zIndex: 20,
          }} />
        )}

        {/* Burst particles */}
        {burst.map((p) => <BurstParticle key={p.id} x={p.x} y={p.y} delay={p.delay} />)}

        {/* Sky-rise particles */}
        {skyParticles.map((p) => <SkyParticle key={p.id} startX={p.startX} delay={p.delay} dur={p.dur} size={p.size} />)}

        {/* ── TITLE AREA ── */}
        <div style={{
          textAlign: "center",
          position: "relative",
          zIndex: 10,
          animation: "cinematicFadeDown 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) both",
          height: "15vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end"
        }}>
          {(phase === "whole" || phase === "done") ? (
            <div style={{ animation: "cinematicFadeDown 1s ease-out both" }}>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 6vmin, 4rem)",
                fontWeight: 600,
                background: "linear-gradient(to right, #bf953f, #fcf6ba, #b38728)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "1vh",
                letterSpacing: "0.05em",
                filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.5))"
              }}>
                Beautifully Restored
              </h2>
              <p style={{
                color: "rgba(255, 255, 255, 0.7)",
                fontSize: "clamp(1rem, 2.5vmin, 1.2rem)",
                letterSpacing: "0.1em",
                fontWeight: 300,
              }}>
                Close your eyes and make a wish...
              </p>
            </div>
          ) : (
            <div style={{ animation: phase === "mending" ? "cinematicFadeUp 0.8s reverse forwards" : "none" }}>
              <span style={{
                display: "block",
                color: "#e4b872",
                textTransform: "uppercase",
                letterSpacing: "0.3em",
                fontSize: "clamp(0.7rem, 2vmin, 0.9rem)",
                marginBottom: "1vh",
                fontWeight: 400,
              }}>
                The Connection
              </span>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 6vmin, 4rem)",
                fontWeight: 600,
                color: "#ffffff",
                letterSpacing: "0.02em",
                textShadow: "0 4px 20px rgba(0,0,0,0.5)"
              }}>
                Mend the Heart
              </h2>
            </div>
          )}
        </div>

        {/* ── HEART ASSEMBLY ── */}
        <div style={{
          position: "relative",
          zIndex: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "clamp(200px, 35vmin, 400px)",
        }}>
          {/* Left half */}
          <div style={{
            position: "absolute",
            width: "clamp(150px, 28vmin, 300px)",
            height: "clamp(150px, 28vmin, 300px)",
            transition: "all 1.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
            left: "50%",
            transform: phase === "broken"
              ? "translateX(calc(-100% - clamp(20px, 4vw, 40px))) rotate(-8deg)"
              : phase === "mending"
                ? "translateX(calc(-100% - 2px)) rotate(-2deg) scale(1.02)"
                : "translateX(-200%) rotate(-20deg) scale(0.5)",
            opacity: (phase === "whole" || phase === "done") ? 0 : 1,
            clipPath: "inset(0 50% 0 0)",
            ...goldMaskStyle,
            animation: "goldShimmer 4s linear infinite",
          }}>
            {/* Kintsugi glowing crack line */}
            {phase === "broken" && (
              <div style={{
                position: "absolute",
                right: "-2px", top: "10%",
                width: "4px", height: "80%",
                background: "#fcf6ba",
                transform: "rotate(5deg)",
                boxShadow: "0 0 15px 3px rgba(228, 184, 114, 0.9)",
                filter: "blur(1px)",
              }} />
            )}
          </div>

          {/* Center whole heart */}
          <div style={{
            position: "absolute",
            left: "50%",
            width: "clamp(160px, 30vmin, 320px)",
            height: "clamp(160px, 30vmin, 320px)",
            transform: (phase === "whole" || phase === "done")
              ? "translateX(-50%) scale(1.15)"
              : "translateX(-50%) scale(1)",
            transition: "all 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
            opacity: (phase === "whole" || phase === "done") ? 1 : 0,
            zIndex: 10,
            ...goldMaskStyle,
            animation: (phase === "whole" || phase === "done")
              ? "heartbeatSlow 3s ease-in-out infinite, goldShimmer 3s linear infinite"
              : "none",
          }} />

          {/* Right half */}
          <div style={{
            position: "absolute",
            width: "clamp(150px, 28vmin, 300px)",
            height: "clamp(150px, 28vmin, 300px)",
            transition: "all 1.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
            right: "50%",
            transform: phase === "broken"
              ? "translateX(calc(100% + clamp(20px, 4vw, 40px))) rotate(8deg)"
              : phase === "mending"
                ? "translateX(calc(100% + 2px)) rotate(2deg) scale(1.02)"
                : "translateX(200%) rotate(20deg) scale(0.5)",
            opacity: (phase === "whole" || phase === "done") ? 0 : 1,
            clipPath: "inset(0 0 0 50%)",
            ...goldMaskStyle,
            animation: "goldShimmer 4s linear infinite reverse",
          }}>
            {/* Kintsugi glowing crack line */}
            {phase === "broken" && (
              <div style={{
                position: "absolute",
                left: "-2px", top: "10%",
                width: "4px", height: "80%",
                background: "#fcf6ba",
                transform: "rotate(-5deg)",
                boxShadow: "0 0 15px 3px rgba(228, 184, 114, 0.9)",
                filter: "blur(1px)",
              }} />
            )}
          </div>
        </div>

        {/* ── LOWER UI AREA ── */}
        <div style={{ height: "15vh", display: "flex", alignItems: "flex-start" }}>
          {/* Glassmorphism Instruction Pill */}
          {phase === "broken" && (
            <div style={{
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(228, 184, 114, 0.3)",
              borderRadius: "100px",
              padding: "clamp(0.6rem, 2vmin, 1rem) clamp(1.5rem, 4vw, 2.5rem)",
              color: "#e4b872",
              fontSize: "clamp(0.9rem, 2vmin, 1.1rem)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              animation: "elegantPulse 3s infinite",
              fontWeight: 300,
            }}>
              Tap to unite
            </div>
          )}

          {/* Premium CTA Button */}
          {phase === "done" && (
            <button
              onClick={onNext}
              style={{
                background: "rgba(228, 184, 114, 0.1)",
                border: "1px solid rgba(228, 184, 114, 0.6)",
                color: "#e4b872",
                padding: "clamp(1rem, 2.5vmin, 1.2rem) clamp(2.5rem, 6vw, 3.5rem)",
                borderRadius: "100px",
                fontSize: "clamp(0.9rem, 2vmin, 1.1rem)",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.4s ease",
                animation: "cinematicFadeUp 0.8s ease-out both, elegantPulse 4s infinite",
                backdropFilter: "blur(10px)",
                outline: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(228, 184, 114, 0.25)";
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(228, 184, 114, 0.1)";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              Make a Wish
            </button>
          )}
        </div>
      </div>
    </>
  );
}