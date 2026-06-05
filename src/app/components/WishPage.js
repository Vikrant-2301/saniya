"use client";
import { useState, useEffect, useRef } from "react";

const WISHES = [
  { emoji: "💙", text: "Endless happiness" },
  { emoji: "❄️", text: "Beautiful adventures" },
  { emoji: "🎓", text: "Brilliant success" },
  { emoji: "🌊", text: "Blooming dreams" },
  { emoji: "💪", text: "Radiant health" },
  { emoji: "🥳", text: "Infinite laughter" },
  { emoji: "✨", text: "Magic every day" },
  { emoji: "🦋", text: "Joyful moments" },
];

function CandleFlame() {
  return (
    <div style={{ position:"absolute", top:"-36px", left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center" }}>
      <div style={{ width:20, height:34, background:"linear-gradient(to top, #4ab3d8, #2899cc, #6cbfe0)", borderRadius:"50% 50% 20% 20% / 60% 60% 40% 40%", animation:"candle-flicker 0.55s ease-in-out infinite", boxShadow:"0 0 22px rgba(74,179,216,0.9), 0 0 45px rgba(40,153,204,0.6)", filter:"blur(0.3px)" }}/>
      <div style={{ position:"absolute", top:7, width:10, height:20, background:"linear-gradient(to top, #dff0f8, #fff)", borderRadius:"50% 50% 20% 20% / 60% 60% 40% 40%", animation:"candle-flicker 0.45s ease-in-out 0.1s infinite" }}/>
    </div>
  );
}

function StarStreak({ x, delay, size, dur }) {
  return (
    <div style={{ position:"absolute", left:`${x}%`, bottom:"0%", fontSize:`${size}rem`, animation:`wishSkyRise ${dur}s ease-out ${delay}s both`, pointerEvents:"none", zIndex:4 }}>
      ❄️
    </div>
  );
}

function BoomPetal({ x, y, emoji, delay, size }) {
  return (
    <div style={{ position:"absolute", left:`${x}%`, top:`${y}%`, fontSize:`${size}rem`, animation:`grantedBoom 1.8s ease-out ${delay}s both`, pointerEvents:"none", zIndex:5, transform:"translate(-50%,-50%)" }}>
      {emoji}
    </div>
  );
}

export default function WishPage({ onNext }) {
  const [phase, setPhase] = useState("idle");
  const [show, setShow] = useState(false);
  const [skyStars, setSkyStars] = useState([]);
  const [boomParticles, setBoomParticles] = useState([]);
  const [countdown, setCountdown] = useState(3);
  const [floatingStars, setFloatingStars] = useState([]);

  useEffect(() => { setTimeout(() => setShow(true), 80); }, []);

  useEffect(() => {
    const stars = Array.from({ length: 18 }, (_, i) => ({
      id: i, x: Math.random() * 100,
      size: 0.7 + Math.random() * 1.0,
      delay: i * 0.8 + Math.random() * 3,
      dur: 6 + Math.random() * 5,
      emoji: ["💙","❄️","💫","⭐","✨","🌀","🌟"][Math.floor(Math.random()*7)],
    }));
    setFloatingStars(stars);
  }, []);

  const handleWish = () => {
    if (phase !== "idle") return;
    setPhase("wishing");

    const newStars = Array.from({ length: 45 }, (_, i) => ({
      id: i, x: 2 + Math.random() * 96,
      delay: Math.random() * 1.8,
      size: 0.9 + Math.random() * 1.3,
      dur: 1.2 + Math.random() * 1.2,
    }));
    setSkyStars(newStars);

    let c = 3;
    const t = setInterval(() => { c--; setCountdown(c); if (c <= 0) clearInterval(t); }, 850);

    setTimeout(() => {
      setPhase("wished");
      const emojis = ["💙","❄️","✨","🎊","🎉","💫","🌟","⭐","🦋","🌊","🥳","🌀","🎆","💝","🌸"];
      const newBoom = Array.from({ length: 40 }, (_, i) => ({
        id: i, x: 5 + Math.random() * 90, y: 5 + Math.random() * 90,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        delay: Math.random() * 1.5, size: 1.2 + Math.random() * 2.2,
      }));
      setBoomParticles(newBoom);
    }, 2900);
  };

  const bgIdle = "linear-gradient(-45deg, #dff0f8, #b3ddf0, #c8e8f5, #e8f5fb, #a8d8ea, #9ed5ec)";
  const bgWished = "linear-gradient(-45deg, #9ed5ec, #6cbfe0, #b3ddf0, #dff0f8, #4ab3d8, #a8d8ea)";

  return (
    <div className="page-noscroll" style={{
      background: phase === "wished" ? bgWished : bgIdle,
      backgroundSize:"400% 400%",
      animation: show ? "blueWishShift 8s ease-in-out infinite" : "none",
      opacity: show ? 1 : 0,
      transition:"opacity 0.7s ease, background 1.5s ease",
      overflow:"hidden", gap:0,
    }}>
      <style>{`
        @keyframes blueWishShift {
          0%,100% { background-position:0% 50%; }
          50% { background-position:100% 50%; }
        }
        @keyframes ambientFloat {
          0% { transform:translateY(110vh) scale(0.3) rotate(0deg); opacity:0; }
          10% { opacity:0.85; }
          90% { opacity:0.65; }
          100% { transform:translateY(-12vh) scale(1.1) rotate(25deg); opacity:0; }
        }
      `}</style>

      {/* Glow orbs */}
      <div style={{ position:"absolute", top:"-10%", left:"-8%", width:"clamp(220px,40vw,520px)", height:"clamp(220px,40vw,520px)", borderRadius:"50%", background:"radial-gradient(circle, rgba(40,153,204,0.32) 0%, transparent 70%)", filter:"blur(50px)", animation:"float 11s ease-in-out infinite", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", bottom:"-10%", right:"-8%", width:"clamp(200px,36vw,480px)", height:"clamp(200px,36vw,480px)", borderRadius:"50%", background:"radial-gradient(circle, rgba(21,107,153,0.22) 0%, transparent 70%)", filter:"blur(45px)", animation:"floatR 13s ease-in-out 2.5s infinite", pointerEvents:"none" }}/>

      {/* Deco */}
      <div style={{ position:"absolute", top:"1rem", left:"1rem", fontSize:"clamp(1.5rem,4vw,2.8rem)", animation:"float 4s ease-in-out infinite", pointerEvents:"none", zIndex:1 }}>🦋</div>
      <div style={{ position:"absolute", top:"1rem", right:"1rem", fontSize:"clamp(1.5rem,4vw,2.8rem)", animation:"floatR 4.5s ease-in-out 0.5s infinite", pointerEvents:"none", zIndex:1 }}>🦋</div>
      <div style={{ position:"absolute", bottom:"4.5rem", left:"1.5rem", fontSize:"clamp(1rem,3vw,2rem)", animation:"heartbeat 2s ease-in-out infinite", pointerEvents:"none", zIndex:1 }}>💙</div>
      <div style={{ position:"absolute", bottom:"4.5rem", right:"1.5rem", fontSize:"clamp(1rem,3vw,2rem)", animation:"heartbeat 2.2s ease-in-out 0.5s infinite", pointerEvents:"none", zIndex:1 }}>❄️</div>

      {/* Ambient floating stars (idle) */}
      {phase === "idle" && floatingStars.map((h)=>(
        <div key={h.id} style={{ position:"absolute", left:`${h.x}%`, bottom:"-5%", fontSize:`${h.size}rem`, animation:`ambientFloat ${h.dur}s ease-in-out ${h.delay}s infinite`, pointerEvents:"none", zIndex:0 }}>{h.emoji}</div>
      ))}

      {skyStars.map((s)=><StarStreak key={s.id} x={s.x} delay={s.delay} size={s.size} dur={s.dur}/>)}
      {boomParticles.map((p)=><BoomPetal key={p.id} x={p.x} y={p.y} emoji={p.emoji} delay={p.delay} size={p.size}/>)}

      <div style={{ position:"relative", zIndex:2, width:"100%", display:"flex", flexDirection:"column", alignItems:"center", gap:"clamp(0.8rem,2vh,1.5rem)", padding:"0 1rem" }}>

        {/* IDLE */}
        {phase === "idle" && (
          <>
            <div style={{ animation:"fadeDown 0.7s ease-out both", textAlign:"center" }}>
              <h2 style={{ fontFamily:"'Dancing Script', cursive", fontSize:"clamp(1.8rem,5.5vw,3.2rem)", fontWeight:700, background:"linear-gradient(135deg, #156b99, #2899cc, #6cbfe0, #b3ddf0)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", marginBottom:"0.3rem", animation:"glowText 3s ease-in-out infinite" }}>
                ❄️ Make a Birthday Wish! ❄️
              </h2>
              <p style={{ color:"#2178a6", fontFamily:"'Dancing Script', cursive", fontSize:"clamp(0.95rem,2.5vw,1.25rem)", fontStyle:"italic" }}>
                Close your eyes, think of something magical...
              </p>
            </div>

            <div onClick={handleWish} style={{ cursor:"pointer", animation:"rotateFloat 6s ease-in-out infinite", display:"inline-block", position:"relative" }}>
              <div style={{ fontSize:"clamp(5.5rem,20vw,9rem)", lineHeight:1, filter:"drop-shadow(0 20px 50px rgba(40,153,204,0.6)) drop-shadow(0 0 30px rgba(74,179,216,0.4))", display:"inline-block", position:"relative" }}>
                🎂
                <CandleFlame/>
              </div>
              <div style={{ marginTop:"0.5rem", fontFamily:"'Dancing Script', cursive", fontSize:"clamp(1rem,2.5vw,1.2rem)", color:"#2899cc", animation:"pulse 2s ease-in-out infinite", textAlign:"center", fontWeight:700, background:"rgba(255,255,255,0.6)", padding:"0.3rem 1rem", borderRadius:"999px", border:"1.5px solid rgba(40,153,204,0.4)", backdropFilter:"blur(8px)" }}>
                💙 Tap to blow the candle! 💙
              </div>
            </div>

            <div style={{ display:"flex", flexWrap:"wrap", gap:"clamp(0.4rem,1vw,0.65rem)", justifyContent:"center", maxWidth:"520px", animation:"fadeUp 0.7s ease-out 0.4s both" }}>
              {WISHES.map((w,i)=>(
                <div key={w.text} style={{ background:"rgba(255,255,255,0.55)", backdropFilter:"blur(12px)", border:"1.5px solid rgba(40,153,204,0.4)", borderRadius:"999px", padding:"clamp(0.35rem,1vw,0.5rem) clamp(0.8rem,2vw,1.2rem)", fontSize:"clamp(0.78rem,1.8vw,0.88rem)", color:"#2178a6", fontWeight:700, animation:`fadeUp 0.6s ease-out ${0.5+i*0.07}s both`, boxShadow:"0 4px 16px rgba(40,153,204,0.18)", transition:"all 0.25s ease" }}>
                  {w.emoji} {w.text}
                </div>
              ))}
            </div>
          </>
        )}

        {/* WISHING */}
        {phase === "wishing" && (
          <div style={{ textAlign:"center", animation:"scaleInBounce 0.5s ease-out both" }}>
            <div style={{ fontSize:"clamp(4.5rem,18vw,8.5rem)", marginBottom:"clamp(0.8rem,2vh,1.2rem)", display:"inline-block", animation:"wishSpinPulse 0.7s ease-in-out infinite", filter:"drop-shadow(0 0 30px rgba(40,153,204,0.9)) drop-shadow(0 0 60px rgba(74,179,216,0.6))" }}>💙</div>
            <h2 style={{ fontFamily:"'Dancing Script', cursive", fontSize:"clamp(1.6rem,5vw,3rem)", fontWeight:700, background:"linear-gradient(135deg, #156b99, #2899cc, #6cbfe0)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", marginBottom:"0.4rem", animation:"glowText 0.8s ease-in-out infinite" }}>
              Your wish is rising up...
            </h2>
            <p style={{ color:"#2178a6", fontFamily:"'Dancing Script', cursive", fontSize:"clamp(1rem,2.5vw,1.2rem)", marginBottom:"1rem", fontStyle:"italic" }}>
              ❄️ The universe is listening... ❄️
            </p>
            <div style={{ fontSize:"clamp(3rem,10vw,5rem)", letterSpacing:"0.3em", animation:"pulse 0.55s ease-in-out infinite", filter:"drop-shadow(0 0 20px rgba(40,153,204,0.9))", color:"#2899cc", fontFamily:"'Outfit', sans-serif", fontWeight:700 }}>
              {countdown > 0 ? countdown : "💙"}
            </div>
          </div>
        )}

        {/* WISHED */}
        {phase === "wished" && (
          <div style={{ textAlign:"center", animation:"wishGranted 0.8s ease-out both" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"0.5rem", marginBottom:"clamp(0.5rem,1.5vh,1rem)", animation:"scaleInBounce 0.6s ease-out both" }}>
              {["❄️","💥","✨","💥","❄️"].map((e,i)=>(
                <span key={i} style={{ fontSize:`clamp(${1.5+i*0.3}rem,${5+i}vw,${3+i*0.4}rem)`, animation:`waveText 1.2s ease-in-out ${i*0.15}s infinite`, filter:"drop-shadow(0 0 12px rgba(40,153,204,0.9))", display:"inline-block" }}>{e}</span>
              ))}
            </div>
            <div style={{ fontSize:"clamp(4.5rem,15vw,7.5rem)", marginBottom:"clamp(0.5rem,1.5vh,0.8rem)", animation:"heartbeatBig 1.2s ease-in-out infinite", display:"inline-block", filter:"drop-shadow(0 0 30px rgba(40,153,204,0.9))" }}>💙</div>
            <h2 style={{ fontFamily:"'Dancing Script', cursive", fontSize:"clamp(2rem,6vw,4rem)", fontWeight:700, background:"linear-gradient(135deg, #156b99, #2899cc, #6cbfe0, #b3ddf0)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", marginBottom:"0.4rem", animation:"glowText 1.5s ease-in-out infinite" }}>
              🎊 Wish Granted! 🎊
            </h2>
            <p style={{ color:"#2178a6", fontFamily:"'Dancing Script', cursive", fontSize:"clamp(1rem,2.5vw,1.35rem)", maxWidth:"400px", margin:"0 auto", marginBottom:"clamp(1.2rem,3vh,2rem)", lineHeight:1.7, fontStyle:"italic" }}>
              May all your beautiful wishes come true, Saniya! 💙❄️
            </p>
            <button onClick={onNext} className="btn btn-primary" style={{ fontSize:"clamp(1rem,2.2vw,1.15rem)", padding:"clamp(0.9rem,2vw,1.2rem) clamp(2.2rem,5vw,3.2rem)", boxShadow:"0 12px 44px rgba(40,153,204,0.55)", animation:"fadeUp 0.5s ease-out 0.4s both, glow 2s ease-in-out 1s infinite", letterSpacing:"0.06em" }}>
              Read Your Letter 💌
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
