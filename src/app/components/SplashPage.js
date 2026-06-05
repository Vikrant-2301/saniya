"use client";
import React, { useEffect, useState } from "react";

const STARS = ["💙", "❄️", "✨", "🌀", "💫", "🦋", "🌟", "⭐"];

export default function ElegantSplash({ onNext = () => console.log("Next clicked!") }) {
  const [isMounted, setIsMounted] = useState(false);
  const [particles, setParticles] = useState([]);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const generated = Array.from({ length: 55 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 18 + 8,
      delay: Math.random() * 6,
      duration: Math.random() * 8 + 6,
      opacity: Math.random() * 0.5 + 0.25,
      emoji: STARS[Math.floor(Math.random() * STARS.length)],
      type: Math.random() > 0.5 ? "star" : "bubble",
    }));
    setParticles(generated);
  }, []);

  const handleReveal = () => {
    setClicked(true);
    setTimeout(() => onNext(), 900);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Outfit:wght@300;400;600;700&display=swap');

        @keyframes bluePulse {
          0%,100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes floatStar {
          0% { transform: translateY(110vh) scale(0.3) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          85% { opacity: 0.8; }
          100% { transform: translateY(-15vh) scale(1.1) rotate(20deg); opacity: 0; }
        }
        @keyframes girlReveal {
          from { opacity: 0; transform: translateY(40px) scale(0.92); filter: blur(14px); }
          to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        @keyframes nameShine {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes btnGlow {
          0%,100% { box-shadow: 0 0 20px rgba(40,153,204,0.4), 0 6px 24px rgba(40,153,204,0.3); }
          50% { box-shadow: 0 0 40px rgba(40,153,204,0.8), 0 12px 40px rgba(40,153,204,0.5); }
        }
        @keyframes pageExit {
          to { opacity: 0; transform: scale(1.08) translateY(-10px); filter: blur(16px); }
        }
        @keyframes starTwinkle {
          0%,100% { transform: scale(1) rotate(0deg); opacity: 0.6; }
          50% { transform: scale(1.5) rotate(15deg); opacity: 1; }
        }
        @keyframes orbFloat {
          0%,100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        @keyframes borderDance {
          0% { border-color: rgba(179,221,240,0.6); }
          33% { border-color: rgba(40,153,204,0.8); }
          66% { border-color: rgba(21,107,153,0.5); }
          100% { border-color: rgba(179,221,240,0.6); }
        }
      `}</style>

      <div
        style={{
          height: "100dvh",
          width: "100vw",
          overflow: "hidden",
          margin: 0,
          padding: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          fontFamily: "'Outfit', sans-serif",
          background: "linear-gradient(-45deg, #dff0f8, #b3ddf0, #a8d8ea, #e8f5fb, #c8e8f5, #9ed5ec)",
          backgroundSize: "400% 400%",
          animation: clicked
            ? "pageExit 0.9s ease-in forwards"
            : "bluePulse 10s ease infinite",
        }}
      >
        {/* Glow orbs */}
        <div style={{ position:"absolute", top:"-10%", left:"-8%", width:"55vmin", height:"55vmin", background:"radial-gradient(circle, rgba(40,153,204,0.3) 0%, transparent 70%)", filter:"blur(50px)", borderRadius:"50%", pointerEvents:"none", animation:"orbFloat 8s ease-in-out infinite" }}/>
        <div style={{ position:"absolute", bottom:"-12%", right:"-10%", width:"60vmin", height:"60vmin", background:"radial-gradient(circle, rgba(21,107,153,0.22) 0%, transparent 70%)", filter:"blur(60px)", borderRadius:"50%", pointerEvents:"none", animation:"orbFloat 11s ease-in-out 3s infinite" }}/>
        <div style={{ position:"absolute", top:"40%", right:"5%", width:"35vmin", height:"35vmin", background:"radial-gradient(circle, rgba(179,221,240,0.45) 0%, transparent 70%)", filter:"blur(35px)", borderRadius:"50%", pointerEvents:"none", animation:"orbFloat 7s ease-in-out 1.5s infinite" }}/>

        {/* Deco corners */}
        <div style={{ position:"absolute", top:"1rem", left:"1rem", fontSize:"clamp(1.5rem,4vw,3rem)", animation:"floatR 3s ease-in-out infinite", pointerEvents:"none" }}>🦋</div>
        <div style={{ position:"absolute", top:"1rem", right:"1rem", fontSize:"clamp(1.5rem,4vw,3rem)", animation:"float 3.5s ease-in-out 0.5s infinite", pointerEvents:"none" }}>🦋</div>
        <div style={{ position:"absolute", bottom:"4rem", left:"1.5rem", fontSize:"clamp(1.2rem,3vw,2.2rem)", animation:"starTwinkle 2.5s ease-in-out infinite", pointerEvents:"none" }}>✨</div>
        <div style={{ position:"absolute", bottom:"4rem", right:"1.5rem", fontSize:"clamp(1.2rem,3vw,2.2rem)", animation:"starTwinkle 2s ease-in-out 1s infinite", pointerEvents:"none" }}>❄️</div>

        {/* Floating particles */}
        {isMounted && particles.map((p) => (
          p.type === "star" ? (
            <div key={p.id} style={{ position:"absolute", left:`${p.x}%`, bottom:"-5%", fontSize:`${p.size}px`, opacity:p.opacity, animation:`floatStar ${p.duration}s ease-in-out ${p.delay}s infinite`, pointerEvents:"none", userSelect:"none" }}>
              {p.emoji}
            </div>
          ) : (
            <div key={p.id} style={{ position:"absolute", left:`${p.x}%`, bottom:"-5%", width:`${p.size*0.7}px`, height:`${p.size*0.7}px`, borderRadius:"50%", background:`rgba(74,179,216,0.25)`, border:"1.5px solid rgba(179,221,240,0.5)", backdropFilter:"blur(2px)", opacity:p.opacity, animation:`floatStar ${p.duration}s ease-in-out ${p.delay}s infinite`, pointerEvents:"none" }}/>
          )
        ))}

        {/* Main Card */}
        <div
          style={{
            position:"relative", zIndex:10,
            display:"flex", flexDirection:"column", alignItems:"center",
            padding:"clamp(2rem,6vmin,4.5rem) clamp(2rem,7vmin,5rem)",
            background:"rgba(255,255,255,0.45)",
            backdropFilter:"blur(28px)", WebkitBackdropFilter:"blur(28px)",
            borderRadius:"36px",
            border:"2px solid rgba(179,221,240,0.7)",
            boxShadow:"0 30px 80px rgba(40,153,204,0.22), 0 1px 0 rgba(255,255,255,0.8) inset",
            animation: isMounted ? "girlReveal 1.2s cubic-bezier(0.2,0.8,0.2,1) forwards, borderDance 5s linear 1.2s infinite" : "none",
            opacity:0,
            width:"clamp(310px,88vw,600px)",
            textAlign:"center",
          }}
        >
          {/* Top sparkle row */}
          <div style={{ display:"flex", gap:"0.5rem", marginBottom:"1.2rem", fontSize:"clamp(1rem,2.5vw,1.4rem)" }}>
            {["💙","❄️","✨","❄️","💙"].map((e,i)=>(
              <span key={i} style={{ animation:`starTwinkle ${2+i*0.3}s ease-in-out ${i*0.2}s infinite`, display:"inline-block" }}>{e}</span>
            ))}
          </div>

          {/* Eyebrow */}
          <span style={{
            color:"#2899cc", textTransform:"uppercase", letterSpacing:"0.28em",
            fontSize:"clamp(0.65rem,1.8vmin,0.85rem)", marginBottom:"1.4vh", fontWeight:700,
            background:"rgba(40,153,204,0.12)", padding:"0.3rem 1.2rem",
            borderRadius:"999px", border:"1px solid rgba(40,153,204,0.35)",
          }}>
            ✨ Celebrating ✨
          </span>

          {/* Name */}
          <h1 style={{
            fontFamily:"'Dancing Script', cursive",
            fontSize:"clamp(4rem,16vmin,8.5rem)", fontWeight:700,
            margin:"0.2rem 0 0.5rem",
            background:"linear-gradient(135deg, #156b99 0%, #2899cc 30%, #6cbfe0 55%, #b3ddf0 75%, #2899cc 100%)",
            backgroundSize:"250% auto",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
            animation:"nameShine 5s linear infinite",
            filter:"drop-shadow(0px 4px 12px rgba(40,153,204,0.3))",
            lineHeight:1.05,
          }}>
            Saniya
          </h1>

          {/* Date badge */}
          <div style={{ display:"flex", alignItems:"center", gap:"1rem", margin:"1.5vh 0" }}>
            <div style={{ height:"1.5px", width:"clamp(30px,8vw,60px)", background:"linear-gradient(90deg, transparent, rgba(40,153,204,0.6))" }}/>
            <span style={{ color:"#2899cc", fontFamily:"'Outfit', sans-serif", fontSize:"clamp(0.9rem,2.5vmin,1.2rem)", letterSpacing:"0.18em", fontWeight:600 }}>
              ❄️ JUNE 6TH ❄️
            </span>
            <div style={{ height:"1.5px", width:"clamp(30px,8vw,60px)", background:"linear-gradient(-90deg, transparent, rgba(40,153,204,0.6))" }}/>
          </div>

          {/* Tagline */}
          <p style={{
            color:"#2178a6", fontSize:"clamp(0.88rem,2.2vmin,1.1rem)", fontWeight:400,
            marginBottom:"4vh", maxWidth:"80%", lineHeight:1.7, fontStyle:"italic",
          }}>
            An extraordinary day for an extraordinary girl 💙<br/>
            Your magical surprise awaits...
          </p>

          {/* CTA */}
          <button
            onClick={handleReveal}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              background: hovered
                ? "linear-gradient(135deg, #6cbfe0 0%, #2899cc 100%)"
                : "linear-gradient(135deg, #2899cc 0%, #6cbfe0 60%, #b3ddf0 100%)",
              backgroundSize:"200% auto",
              border:"none", color:"#fff",
              padding:"clamp(0.9rem,2.5vmin,1.2rem) clamp(2.5rem,8vw,4rem)",
              borderRadius:"999px",
              fontSize:"clamp(0.9rem,2.2vmin,1.1rem)",
              letterSpacing:"0.12em", textTransform:"uppercase", fontWeight:700,
              cursor:"pointer", fontFamily:"'Outfit', sans-serif",
              transition:"all 0.4s cubic-bezier(0.4,0,0.2,1)",
              animation:"btnGlow 3s ease-in-out infinite",
              transform: hovered ? "translateY(-5px) scale(1.06)" : "translateY(0) scale(1)",
            }}
          >
            💙 Enter My World 💙
          </button>

          {/* Bottom deco */}
          <div style={{ marginTop:"1.8rem", display:"flex", gap:"0.4rem", fontSize:"clamp(0.9rem,2vw,1.2rem)", opacity:0.7 }}>
            {["🦋","💙","❄️","💙","🦋"].map((e,i)=>(
              <span key={i} style={{ animation:`starTwinkle ${1.8+i*0.2}s ease-in-out ${i*0.25}s infinite`, display:"inline-block" }}>{e}</span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}