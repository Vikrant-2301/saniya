"use client";
import React, { useState, useEffect } from "react";

function SparkleParticle({ x, y, delay, color }) {
  return (
    <div style={{
      position:"absolute", left:`${x}%`, top:`${y}%`,
      width:"clamp(5px,1.2vmin,10px)", height:"clamp(5px,1.2vmin,10px)",
      borderRadius:"50%", background:color,
      boxShadow:`0 0 14px 4px ${color}`,
      animation:`blueSparkle 1.3s cubic-bezier(0.2,0.8,0.2,1) ${delay}s both`,
      pointerEvents:"none", zIndex:10,
      transform:"translate(-50%,-50%)",
    }}/>
  );
}

function FloatPetal({ startX, delay, dur, size, emoji }) {
  return (
    <div style={{
      position:"absolute", left:`${startX}%`, bottom:"-10%",
      fontSize:`${size}px`,
      animation:`petalRise ${dur}s ease-in ${delay}s both`,
      pointerEvents:"none", zIndex:3,
    }}>{emoji}</div>
  );
}

const PETAL_EMOJIS = ["❄️","💙","✨","🌀","💫","🦋","🌟","⭐"];
const SPARK_COLORS = ["#6cbfe0","#2899cc","#b3ddf0","#9ed5ec","#4ab3d8","#dff0f8"];

export default function ElegantMendHeart({ onNext = () => console.log("Next!") }) {
  const [phase, setPhase] = useState("broken");
  const [show, setShow] = useState(false);
  const [burst, setBurst] = useState([]);
  const [petals, setPetals] = useState([]);
  const [tapEffect, setTapEffect] = useState(null);

  useEffect(() => { setTimeout(() => setShow(true), 100); }, []);

  const handleMend = (e) => {
    if (phase !== "broken") return;
    const rect = e.currentTarget.getBoundingClientRect();
    setTapEffect({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setTimeout(() => setTapEffect(null), 900);
    setPhase("mending");

    const newBurst = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: 30 + Math.random() * 40,
      y: 20 + Math.random() * 60,
      delay: Math.random() * 0.5,
      color: SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)],
    }));
    setBurst(newBurst);

    const newPetals = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      startX: 5 + Math.random() * 90,
      delay: 0.4 + Math.random() * 0.6,
      dur: 2.5 + Math.random() * 2,
      size: Math.floor(16 + Math.random() * 18),
      emoji: PETAL_EMOJIS[Math.floor(Math.random() * PETAL_EMOJIS.length)],
    }));
    setPetals(newPetals);

    setTimeout(() => setPhase("whole"), 1600);
    setTimeout(() => setPhase("done"), 3200);
  };

  const heartStyle = {
    WebkitMaskImage:"url(/assets/as/heart.svg)",
    WebkitMaskSize:"contain", WebkitMaskRepeat:"no-repeat", WebkitMaskPosition:"center",
    maskImage:"url(/assets/as/heart.svg)",
    maskSize:"contain", maskRepeat:"no-repeat", maskPosition:"center",
    background:"linear-gradient(135deg, #4ab3d8 0%, #6cbfe0 35%, #b3ddf0 55%, #2899cc 80%, #156b99 100%)",
    backgroundSize:"250% 250%",
  };

  return (
    <>
      <style>{`
        @keyframes blueShift {
          0%,100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes blueSparkle {
          0% { transform:translate(-50%,-50%) scale(0); opacity:1; }
          50% { transform:translate(-50%,-50%) scale(2); opacity:1; }
          100% { transform:translate(-50%,-50%) scale(0.5) translateY(-60px); opacity:0; }
        }
        @keyframes petalRise {
          0% { transform:translateY(0) scale(0.4) rotate(0deg); opacity:0; }
          15% { opacity:1; }
          100% { transform:translateY(-115vh) scale(1.3) rotate(360deg); opacity:0; }
        }
        @keyframes blueFadeDown {
          from { opacity:0; transform:translateY(-35px); filter:blur(10px); }
          to { opacity:1; transform:translateY(0); filter:blur(0); }
        }
        @keyframes blueFadeUp {
          from { opacity:0; transform:translateY(35px); filter:blur(10px); }
          to { opacity:1; transform:translateY(0); filter:blur(0); }
        }
        @keyframes bluePulse {
          0%,100% { box-shadow:0 0 20px rgba(40,153,204,0.35); }
          50% { box-shadow:0 0 50px rgba(40,153,204,0.75), 0 0 80px rgba(74,179,216,0.4); }
        }
        @keyframes heartShimmer {
          0% { background-position:0% 50%; }
          100% { background-position:250% 50%; }
        }
        @keyframes rippleBlue {
          0% { transform:translate(-50%,-50%) scale(0); opacity:1; }
          100% { transform:translate(-50%,-50%) scale(4.5); opacity:0; }
        }
        @keyframes heartbeatBlue {
          0%,100% { transform:translateX(-50%) scale(1.15); filter:drop-shadow(0 0 30px rgba(40,153,204,0.6)); }
          50% { transform:translateX(-50%) scale(1.22); filter:drop-shadow(0 0 55px rgba(74,179,216,1)); }
        }
        @keyframes floatDeco {
          0%,100% { transform:translateY(0) rotate(-5deg); }
          50% { transform:translateY(-14px) rotate(5deg); }
        }
        @keyframes twinkleStar {
          0%,100% { opacity:0.4; transform:scale(1) rotate(0deg); }
          50% { opacity:1; transform:scale(1.5) rotate(20deg); }
        }
      `}</style>

      <div
        onClick={phase === "broken" ? handleMend : undefined}
        style={{
          height:"100dvh", width:"100vw", overflow:"hidden",
          margin:0, padding:0,
          display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
          position:"relative",
          background:"linear-gradient(-45deg, #dff0f8, #b3ddf0, #a8d8ea, #e8f5fb, #c8e8f5, #9ed5ec)",
          backgroundSize:"400% 400%",
          animation: show ? "blueShift 10s ease infinite" : "none",
          cursor: phase === "broken" ? "pointer" : "default",
          opacity: show ? 1 : 0, transition:"opacity 1.2s ease",
          userSelect:"none", fontFamily:"'Outfit', sans-serif",
          gap:"4vh",
        }}
      >
        {/* Glow orbs */}
        <div style={{ position:"absolute", top:"-12%", left:"-10%", width:"55vmin", height:"55vmin", background:"radial-gradient(circle, rgba(40,153,204,0.35) 0%, transparent 70%)", filter:"blur(55px)", borderRadius:"50%", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", bottom:"-12%", right:"-8%", width:"60vmin", height:"60vmin", background:"radial-gradient(circle, rgba(21,107,153,0.28) 0%, transparent 70%)", filter:"blur(60px)", borderRadius:"50%", pointerEvents:"none" }}/>

        {/* Corner deco */}
        <div style={{ position:"absolute", top:"1.2rem", left:"1.2rem", fontSize:"clamp(1.3rem,3.5vw,2.5rem)", animation:"floatDeco 3.5s ease-in-out infinite", pointerEvents:"none" }}>🦋</div>
        <div style={{ position:"absolute", top:"1.2rem", right:"1.2rem", fontSize:"clamp(1.3rem,3.5vw,2.5rem)", animation:"floatDeco 4s ease-in-out 0.5s infinite", pointerEvents:"none" }}>🦋</div>

        {/* Twinkling stars */}
        {[...Array(8)].map((_,i)=>(
          <div key={`tw-${i}`} style={{ position:"absolute", left:`${[8,80,18,88,45,25,65,92][i]}%`, top:`${[15,20,70,60,8,88,30,75][i]}%`, fontSize:`${14+(i%3)*6}px`, animation:`twinkleStar ${2.5+i*0.4}s ease-in-out ${i*0.3}s infinite`, pointerEvents:"none", zIndex:1 }}>
            {["✨","❄️","💫","⭐","🌟","💙","✨","❄️"][i]}
          </div>
        ))}

        {/* Tap ripple */}
        {tapEffect && (
          <div style={{ position:"absolute", left:tapEffect.x, top:tapEffect.y, width:"100px", height:"100px", borderRadius:"50%", border:"3px solid rgba(40,153,204,0.9)", animation:"rippleBlue 0.9s cubic-bezier(0.2,0.8,0.2,1) forwards", pointerEvents:"none", zIndex:20 }}/>
        )}

        {burst.map((p)=><SparkleParticle key={p.id} x={p.x} y={p.y} delay={p.delay} color={p.color}/>)}
        {petals.map((p)=><FloatPetal key={p.id} startX={p.startX} delay={p.delay} dur={p.dur} size={p.size} emoji={p.emoji}/>)}

        {/* TITLE */}
        <div style={{ textAlign:"center", position:"relative", zIndex:10, animation:"blueFadeDown 1.2s cubic-bezier(0.2,0.8,0.2,1) both", height:"15vh", display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
          {(phase==="whole"||phase==="done") ? (
            <div style={{ animation:"blueFadeDown 1s ease-out both" }}>
              <h2 style={{ fontFamily:"'Dancing Script', cursive", fontSize:"clamp(2rem,6.5vmin,4.2rem)", fontWeight:700, background:"linear-gradient(135deg, #156b99, #2899cc, #6cbfe0)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", marginBottom:"0.8vh", filter:"drop-shadow(0 3px 8px rgba(40,153,204,0.25))" }}>
                💙 Beautifully Restored! 💙
              </h2>
              <p style={{ color:"#2178a6", fontSize:"clamp(0.9rem,2.5vmin,1.2rem)", letterSpacing:"0.05em", fontStyle:"italic" }}>
                Close your eyes and make a wish... ✨
              </p>
            </div>
          ) : (
            <div>
              <span style={{ display:"inline-block", color:"#2899cc", textTransform:"uppercase", letterSpacing:"0.25em", fontSize:"clamp(0.65rem,1.8vmin,0.85rem)", marginBottom:"0.8vh", fontWeight:700, background:"rgba(40,153,204,0.15)", padding:"0.25rem 1rem", borderRadius:"999px", border:"1px solid rgba(40,153,204,0.4)" }}>
                ❄️ Our Connection ❄️
              </span>
              <h2 style={{ fontFamily:"'Dancing Script', cursive", fontSize:"clamp(2.2rem,7vmin,4.5rem)", fontWeight:700, background:"linear-gradient(135deg, #156b99 0%, #2899cc 40%, #6cbfe0 70%, #b3ddf0 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", display:"block" }}>
                Mend the Heart 💙
              </h2>
            </div>
          )}
        </div>

        {/* HEART ASSEMBLY */}
        <div style={{ position:"relative", zIndex:5, display:"flex", alignItems:"center", justifyContent:"center", width:"100%", height:"clamp(200px,38vmin,420px)" }}>
          {/* Left half */}
          <div style={{ position:"absolute", width:"clamp(150px,30vmin,320px)", height:"clamp(150px,30vmin,320px)", transition:"all 1.7s cubic-bezier(0.34,1.56,0.64,1)", left:"50%",
            transform: phase==="broken" ? "translateX(calc(-100% - clamp(22px,5vw,45px))) rotate(-9deg)" : phase==="mending" ? "translateX(calc(-100% - 2px)) rotate(-2deg) scale(1.03)" : "translateX(-220%) rotate(-22deg) scale(0.4)",
            opacity:(phase==="whole"||phase==="done")?0:1, clipPath:"inset(0 50% 0 0)",
            ...heartStyle, animation:"heartShimmer 4s linear infinite",
          }}>
            {phase==="broken"&&<div style={{ position:"absolute", right:"-2px", top:"8%", width:"4px", height:"84%", background:"linear-gradient(to bottom, #6cbfe0, #b3ddf0, #2899cc)", transform:"rotate(4deg)", boxShadow:"0 0 12px 4px rgba(40,153,204,0.9)", filter:"blur(0.8px)" }}/>}
          </div>

          {/* Center whole heart */}
          <div style={{ position:"absolute", left:"50%", width:"clamp(165px,32vmin,340px)", height:"clamp(165px,32vmin,340px)",
            transform:(phase==="whole"||phase==="done")?"translateX(-50%) scale(1.18)":"translateX(-50%) scale(1)",
            transition:"all 1.6s cubic-bezier(0.34,1.56,0.64,1)",
            opacity:(phase==="whole"||phase==="done")?1:0, zIndex:10,
            ...heartStyle,
            animation:(phase==="whole"||phase==="done")?"heartbeatBlue 2.5s ease-in-out infinite, heartShimmer 3s linear infinite":"none",
          }}/>

          {/* Right half */}
          <div style={{ position:"absolute", width:"clamp(150px,30vmin,320px)", height:"clamp(150px,30vmin,320px)", transition:"all 1.7s cubic-bezier(0.34,1.56,0.64,1)", right:"50%",
            transform: phase==="broken" ? "translateX(calc(100% + clamp(22px,5vw,45px))) rotate(9deg)" : phase==="mending" ? "translateX(calc(100% + 2px)) rotate(2deg) scale(1.03)" : "translateX(220%) rotate(22deg) scale(0.4)",
            opacity:(phase==="whole"||phase==="done")?0:1, clipPath:"inset(0 0 0 50%)",
            ...heartStyle, animation:"heartShimmer 4s linear infinite reverse",
          }}>
            {phase==="broken"&&<div style={{ position:"absolute", left:"-2px", top:"8%", width:"4px", height:"84%", background:"linear-gradient(to bottom, #6cbfe0, #b3ddf0, #2899cc)", transform:"rotate(-4deg)", boxShadow:"0 0 12px 4px rgba(40,153,204,0.9)", filter:"blur(0.8px)" }}/>}
          </div>
        </div>

        {/* LOWER UI */}
        <div style={{ height:"15vh", display:"flex", alignItems:"flex-start" }}>
          {phase==="broken" && (
            <div style={{ background:"rgba(255,255,255,0.55)", backdropFilter:"blur(16px)", WebkitBackdropFilter:"blur(16px)", border:"2px solid rgba(40,153,204,0.5)", borderRadius:"999px", padding:"clamp(0.7rem,2vmin,1.1rem) clamp(1.8rem,5vw,3rem)", color:"#2899cc", fontSize:"clamp(0.85rem,2vmin,1.05rem)", letterSpacing:"0.1em", textTransform:"uppercase", animation:"bluePulse 2.5s infinite", fontWeight:700, boxShadow:"0 8px 30px rgba(40,153,204,0.2)" }}>
              💙 Tap to Unite 💙
            </div>
          )}
          {phase==="done" && (
            <button onClick={onNext} style={{ background:"linear-gradient(135deg, #2899cc, #6cbfe0, #b3ddf0)", backgroundSize:"200% auto", border:"none", color:"#fff", padding:"clamp(0.9rem,2.5vmin,1.2rem) clamp(2.5rem,7vw,4rem)", borderRadius:"999px", fontSize:"clamp(0.9rem,2.2vmin,1.1rem)", letterSpacing:"0.12em", textTransform:"uppercase", cursor:"pointer", fontFamily:"'Outfit', sans-serif", fontWeight:700, transition:"all 0.4s ease", animation:"blueFadeUp 0.8s ease-out both, bluePulse 3s infinite", outline:"none", boxShadow:"0 8px 30px rgba(40,153,204,0.45)" }}
              onMouseEnter={(e)=>{e.currentTarget.style.transform="translateY(-6px) scale(1.07)";}}
              onMouseLeave={(e)=>{e.currentTarget.style.transform="";}}
            >
              💙 Make a Wish 💙
            </button>
          )}
        </div>
      </div>
    </>
  );
}