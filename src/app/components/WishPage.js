"use client";
import { useState, useEffect, useRef } from "react";

const WISHES = [
  { emoji: "💖", text: "Endless happiness" },
  { emoji: "🌟", text: "Big dreams come true" },
  { emoji: "🎓", text: "Brilliant success" },
  { emoji: "🌸", text: "Beautiful adventures" },
  { emoji: "💪", text: "Radiant health" },
  { emoji: "🥳", text: "Infinite laughter" },
  { emoji: "✈️", text: "Amazing travels" },
  { emoji: "🎵", text: "Joyful moments" },
];

function CandleFlame() {
  return (
    <div style={{
      position: "absolute",
      top: "-34px",
      left: "50%",
      transform: "translateX(-50%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}>
      <div style={{
        width: 20, height: 34,
        background: "linear-gradient(to top, #f9c74f, #ff8c42, #ff4d00)",
        borderRadius: "50% 50% 20% 20% / 60% 60% 40% 40%",
        animation: "candle-flicker 0.55s ease-in-out infinite",
        boxShadow: "0 0 22px rgba(255,140,0,0.9), 0 0 45px rgba(255,77,0,0.6), 0 0 70px rgba(255,100,0,0.3)",
        filter: "blur(0.3px)",
      }}/>
      <div style={{
        position: "absolute",
        top: 7,
        width: 10, height: 20,
        background: "linear-gradient(to top, #fff8e0, #fff)",
        borderRadius: "50% 50% 20% 20% / 60% 60% 40% 40%",
        animation: "candle-flicker 0.45s ease-in-out 0.1s infinite",
      }}/>
    </div>
  );
}

// Star streak rising up during "wishing" phase
function StarStreak({ x, delay, size, color, dur }) {
  return (
    <div style={{
      position: "absolute",
      left: `${x}%`,
      bottom: "0%",
      fontSize: `${size}rem`,
      animation: `wishSkyRise ${dur}s ease-out ${delay}s both`,
      pointerEvents: "none",
      zIndex: 4,
      color,
    }}>
      ✨
    </div>
  );
}

// Big colorful explosion particle for "wished" phase
function GrantedParticle({ x, y, emoji, delay, size }) {
  return (
    <div style={{
      position: "absolute",
      left: `${x}%`,
      top: `${y}%`,
      fontSize: `${size}rem`,
      animation: `grantedBoom 1.8s ease-out ${delay}s both`,
      pointerEvents: "none",
      zIndex: 5,
      transform: "translate(-50%, -50%)",
    }}>
      {emoji}
    </div>
  );
}

// Orbit shooting star
function ShootingStar({ style }) {
  return <div style={style}>🌠</div>;
}

export default function WishPage({ onNext }) {
  const [phase, setPhase] = useState("idle");
  const [show, setShow] = useState(false);
  const [skyStars, setSkyStars] = useState([]);
  const [grantedParticles, setGrantedParticles] = useState([]);
  const [countdown, setCountdown] = useState(3);
  const [shootingStars, setShootingStars] = useState([]);

  useEffect(() => { setTimeout(() => setShow(true), 80); }, []);

  // Idle shooting stars
  useEffect(() => {
    const stars = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      top: 5 + Math.random() * 30,
      delay: i * 3 + Math.random() * 2,
      dur: 2 + Math.random() * 2,
    }));
    setShootingStars(stars);
  }, []);

  const handleWish = () => {
    if (phase !== "idle") return;
    setPhase("wishing");

    // Crazy sky streams
    const newSky = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: 2 + Math.random() * 96,
      delay: Math.random() * 1.8,
      size: 0.8 + Math.random() * 1.4,
      color: ["#ff4d79", "#f9c74f", "#ff8fab", "#fff", "#ffb3cc", "#ffd6e7"][Math.floor(Math.random() * 6)],
      dur: 1.2 + Math.random() * 1.2,
    }));
    setSkyStars(newSky);

    let c = 3;
    const t = setInterval(() => {
      c--;
      setCountdown(c);
      if (c <= 0) clearInterval(t);
    }, 850);

    setTimeout(() => {
      setPhase("wished");
      // Explosion particles
      const emojis = ["💖","🌟","✨","🎊","🎉","💕","🌸","💫","⭐","🌺","🎀","🥳","💥","🌈","🎆","🏆"];
      const newGranted = Array.from({ length: 35 }, (_, i) => ({
        id: i,
        x: 5 + Math.random() * 90,
        y: 5 + Math.random() * 90,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        delay: Math.random() * 1.5,
        size: 1.2 + Math.random() * 2,
      }));
      setGrantedParticles(newGranted);
    }, 2900);
  };

  return (
    <div
      className="page-noscroll"
      style={{
        background: phase === "wished"
          ? "linear-gradient(160deg, #1a0533 0%, #3d0066 25%, #8b0066 50%, #c0005a 75%, #ff4d79 100%)"
          : "linear-gradient(160deg, #0f0528 0%, #1a0a3d 25%, #2d0959 50%, #4a1070 75%, #7b2d94 100%)",
        backgroundSize: "300% 300%",
        animation: show ? "rainbowShift 8s ease-in-out infinite" : "none",
        opacity: show ? 1 : 0,
        transition: "opacity 0.7s ease, background 1.5s ease",
        overflow: "hidden",
        gap: 0,
      }}
    >
      {/* Static twinkling stars (night sky) */}
      {Array.from({ length: 60 }, (_, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${1 + Math.random() * 2.5}px`,
          height: `${1 + Math.random() * 2.5}px`,
          borderRadius: "50%",
          background: "#fff",
          opacity: 0.2 + Math.random() * 0.6,
          animation: `twinkle ${2 + Math.random() * 3}s ease-in-out ${Math.random() * 3}s infinite`,
          pointerEvents: "none",
          zIndex: 0,
        }}/>
      ))}

      {/* Idle shooting stars */}
      {phase === "idle" && shootingStars.map((s) => (
        <div key={s.id} style={{
          position: "absolute",
          top: `${s.top}%`,
          left: "-5%",
          fontSize: "1.2rem",
          animation: `shootingStar ${s.dur}s linear ${s.delay}s infinite`,
          pointerEvents: "none",
          zIndex: 2,
          opacity: 0.8,
        }}>🌠</div>
      ))}

      {/* Moon decoration */}
      <div style={{
        position: "absolute",
        top: "5%",
        right: "8%",
        fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
        animation: "float 8s ease-in-out infinite",
        pointerEvents: "none",
        zIndex: 1,
        filter: "drop-shadow(0 0 20px rgba(249,199,79,0.6))",
      }}>🌙</div>

      {/* Nebula orbs */}
      <div style={{
        position:"absolute", top:"-15%", left:"-10%",
        width:"clamp(250px, 45vw, 550px)", height:"clamp(250px, 45vw, 550px)",
        borderRadius:"50%",
        background:"radial-gradient(circle, rgba(120,0,200,0.4) 0%, transparent 70%)",
        filter:"blur(50px)",
        animation:"float 12s ease-in-out infinite",
        pointerEvents:"none",
      }}/>
      <div style={{
        position:"absolute", bottom:"-12%", right:"-8%",
        width:"clamp(200px, 38vw, 480px)", height:"clamp(200px, 38vw, 480px)",
        borderRadius:"50%",
        background:"radial-gradient(circle, rgba(200,0,100,0.4) 0%, transparent 70%)",
        filter:"blur(45px)",
        animation:"floatR 14s ease-in-out 3s infinite",
        pointerEvents:"none",
      }}/>

      {/* Sky star streaks (wishing phase) */}
      {skyStars.map((s) => (
        <StarStreak key={s.id} x={s.x} delay={s.delay} size={s.size} color={s.color} dur={s.dur} />
      ))}

      {/* Granted explosion particles */}
      {grantedParticles.map((p) => (
        <GrantedParticle key={p.id} x={p.x} y={p.y} emoji={p.emoji} delay={p.delay} size={p.size} />
      ))}

      <div style={{ position:"relative", zIndex:2, width:"100%", display:"flex", flexDirection:"column", alignItems:"center", gap:"clamp(0.8rem, 2vh, 1.5rem)", padding: "0 1rem" }}>

        {/* IDLE PHASE */}
        {phase === "idle" && (
          <>
            <div style={{ animation:"fadeDown 0.7s ease-out both", textAlign:"center" }}>
              <h2 style={{
                fontFamily:"'Dancing Script', cursive",
                fontSize:"clamp(1.8rem, 5.5vw, 3.2rem)",
                fontWeight:700,
                color:"#fff",
                marginBottom:"0.3rem",
                textShadow: "0 0 30px rgba(249,199,79,0.8), 0 0 60px rgba(249,199,79,0.4)",
                animation:"glowText 3s ease-in-out infinite",
              }}>
                🌟 Make a Birthday Wish! 🌟
              </h2>
              <p style={{
                color:"rgba(255,200,220,0.9)",
                fontFamily:"'Dancing Script', cursive",
                fontSize:"clamp(0.95rem, 2.5vw, 1.25rem)",
              }}>
                Close your eyes, think of something wonderful...
              </p>
            </div>

            {/* Cake */}
            <div
              onClick={handleWish}
              style={{
                cursor:"pointer",
                animation:"rotateFloat 6s ease-in-out infinite",
                display:"inline-block",
                position:"relative",
              }}
            >
              <div style={{
                fontSize:"clamp(5.5rem, 20vw, 9rem)",
                lineHeight:1,
                filter:"drop-shadow(0 20px 50px rgba(249,199,79,0.6)) drop-shadow(0 0 30px rgba(255,77,121,0.4))",
                display:"inline-block",
                position:"relative",
              }}>
                🎂
                <CandleFlame />
              </div>
              <div style={{
                marginTop:"0.5rem",
                fontFamily:"'Dancing Script', cursive",
                fontSize:"clamp(1rem, 2.5vw, 1.2rem)",
                color:"rgba(255,220,240,0.9)",
                animation:"pulse 2s ease-in-out infinite",
                textAlign:"center",
                textShadow: "0 0 20px rgba(255,143,171,0.8)",
              }}>
                ✨ Tap to blow the candle! ✨
              </div>
            </div>

            {/* Wish tags */}
            <div style={{
              display:"flex",
              flexWrap:"wrap",
              gap:"clamp(0.4rem, 1vw, 0.65rem)",
              justifyContent:"center",
              maxWidth:"520px",
              animation:"fadeUp 0.7s ease-out 0.4s both",
            }}>
              {WISHES.map((w, i) => (
                <div key={w.text} style={{
                  background:"rgba(255,255,255,0.12)",
                  border:"1.5px solid rgba(255,143,171,0.4)",
                  borderRadius:"999px",
                  padding:"clamp(0.35rem,1vw,0.5rem) clamp(0.8rem,2vw,1.2rem)",
                  fontSize:"clamp(0.78rem, 1.8vw, 0.88rem)",
                  color:"rgba(255,220,235,0.95)",
                  fontWeight:600,
                  backdropFilter:"blur(10px)",
                  animation:`fadeUp 0.6s ease-out ${0.5 + i * 0.07}s both`,
                  boxShadow:"0 3px 14px rgba(255,77,121,0.2)",
                  transition:"all 0.25s ease",
                }}>
                  {w.emoji} {w.text}
                </div>
              ))}
            </div>
          </>
        )}

        {/* WISHING PHASE */}
        {phase === "wishing" && (
          <div style={{ textAlign:"center", animation:"scaleInBounce 0.5s ease-out both" }}>
            <div style={{
              fontSize:"clamp(4.5rem, 18vw, 8.5rem)",
              marginBottom:"clamp(0.8rem,2vh,1.2rem)",
              display:"inline-block",
              animation:"wishSpinPulse 0.7s ease-in-out infinite",
              filter:"drop-shadow(0 0 30px rgba(249,199,79,0.9)) drop-shadow(0 0 60px rgba(255,140,0,0.6))",
            }}>
              ⭐
            </div>
            <h2 style={{
              fontFamily:"'Dancing Script', cursive",
              fontSize:"clamp(1.6rem, 5vw, 3rem)",
              fontWeight:700,
              color:"#fff",
              marginBottom:"0.4rem",
              textShadow: "0 0 30px rgba(249,199,79,0.9), 0 0 60px rgba(255,140,0,0.5)",
              animation: "glowText 0.8s ease-in-out infinite",
            }}>
              Your wish is rising up...
            </h2>
            <p style={{
              color:"rgba(255,220,235,0.9)",
              fontFamily:"'Dancing Script', cursive",
              fontSize:"clamp(1rem, 2.5vw, 1.2rem)",
              marginBottom:"1rem",
              textShadow:"0 0 20px rgba(255,143,171,0.7)",
            }}>
              ✨ The universe is listening... ✨
            </p>
            <div style={{
              fontSize:"clamp(3rem, 10vw, 5rem)",
              letterSpacing:"0.3em",
              animation:"pulse 0.55s ease-in-out infinite",
              filter:"drop-shadow(0 0 20px rgba(249,199,79,0.9))",
              color: "#f9c74f",
              fontFamily:"'Outfit', sans-serif",
              fontWeight:700,
              textShadow:"0 0 30px rgba(249,199,79,1)",
            }}>
              {countdown > 0 ? countdown : "💫"}
            </div>
          </div>
        )}

        {/* WISHED PHASE */}
        {phase === "wished" && (
          <div style={{ textAlign:"center", animation:"wishGranted 0.8s ease-out both" }}>
            {/* Big multi-star burst */}
            <div style={{
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              gap:"0.5rem",
              marginBottom:"clamp(0.5rem,1.5vh,1rem)",
              animation:"scaleInBounce 0.6s ease-out both",
            }}>
              {["🌟","💥","✨","💥","🌟"].map((e, i) => (
                <span key={i} style={{
                  fontSize:`clamp(${1.5+i*0.3}rem, ${5+i}vw, ${3+i*0.4}rem)`,
                  animation:`waveText 1.2s ease-in-out ${i*0.15}s infinite`,
                  filter:"drop-shadow(0 0 15px rgba(249,199,79,0.9))",
                  display:"inline-block",
                }}>{e}</span>
              ))}
            </div>

            <div style={{
              fontSize:"clamp(4.5rem, 15vw, 7.5rem)",
              marginBottom:"clamp(0.5rem,1.5vh,0.8rem)",
              animation:"heartbeatBig 1.2s ease-in-out infinite",
              display:"inline-block",
              filter:"drop-shadow(0 0 30px rgba(255,77,121,0.9)) drop-shadow(0 0 60px rgba(255,143,171,0.5))",
            }}>
              💖
            </div>

            <h2 style={{
              fontFamily:"'Dancing Script', cursive",
              fontSize:"clamp(2rem, 6vw, 4rem)",
              fontWeight:700,
              color:"#fff",
              marginBottom:"0.4rem",
              textShadow:"0 0 30px rgba(255,77,121,1), 0 0 60px rgba(255,143,171,0.7), 0 0 100px rgba(255,77,121,0.4)",
              animation:"glowText 1.5s ease-in-out infinite",
              letterSpacing:"0.02em",
            }}>
              🎊 Wish Granted! 🎊
            </h2>

            <p style={{
              color:"rgba(255,220,235,0.95)",
              fontFamily:"'Dancing Script', cursive",
              fontSize:"clamp(1rem, 2.5vw, 1.35rem)",
              maxWidth:"400px",
              margin:"0 auto",
              marginBottom:"clamp(1.2rem,3vh,2rem)",
              textShadow:"0 0 20px rgba(255,143,171,0.7)",
              lineHeight:1.6,
            }}>
              May all your beautiful wishes come true, Saniya! 💕
            </p>

            <button
              onClick={onNext}
              className="btn btn-primary"
              style={{
                fontSize:"clamp(1rem,2.2vw,1.15rem)",
                padding:"clamp(0.9rem,2vw,1.2rem) clamp(2.2rem,5vw,3.2rem)",
                boxShadow:"0 12px 44px rgba(224,82,120,0.6), 0 0 60px rgba(255,77,121,0.3)",
                animation:"fadeUp 0.5s ease-out 0.4s both, glow 2s ease-in-out 1s infinite",
                letterSpacing:"0.05em",
              }}
            >
              Read Your Letter 💌
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
