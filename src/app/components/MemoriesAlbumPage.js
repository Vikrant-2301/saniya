"use client";
import { useState, useEffect, useRef } from "react";

const CAPTIONS = [
  "Every moment with you is magic ✨",
  "This one makes me smile every time 💕",
  "Best memories are the ones we share 🌸",
  "Here's to us and all our crazy adventures 💖",
  "You make everything more fun 🎉",
  "A friendship like ours is rare 🦋",
  "So many laughs, so much love 💗",
  "This day will always live in my heart 🌺",
  "Couldn't ask for a better person by my side 💫",
  "We're unstoppable together 🔥💕",
  "Look at us go! 🥳",
  "My favourite chaos partner 🎀",
  "Pure joy, right here 🌟",
  "Memories that will last forever 💝",
  "We did that! 🎊",
  "No one else I'd rather share this with 🌸",
  "Another memory added to our story 📖💕",
  "The vibe? Absolutely immaculate ✨",
  "This picture holds a thousand feelings 💖",
  "Forever grateful for you 🌷",
];

function getCaption(index) {
  return CAPTIONS[index % CAPTIONS.length];
}

export default function MemoriesAlbumPage({ images = [], onNext }) {
  const [current, setCurrent] = useState(0);
  const [outgoing, setOutgoing] = useState(null); // { index, direction }
  const [direction, setDirection] = useState("next");
  const [show, setShow] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const touchStartX = useRef(null);
  const animating = outgoing !== null;

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  const goTo = (idx, dir) => {
    if (animating || idx === current) return;
    setDirection(dir);
    // Immediately switch to new photo — outgoing card shows the old one
    setOutgoing({ index: current, direction: dir });
    setCurrent(idx);
    if (idx === images.length - 1) setRevealed(true);
    setTimeout(() => {
      setOutgoing(null);
    }, 420);
  };

  const next = () => {
    if (current < images.length - 1) goTo(current + 1, "next");
  };
  const prev = () => {
    if (current > 0) goTo(current - 1, "prev");
  };

  // Touch swipe
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    touchStartX.current = null;
  };

  // Mouse drag
  const onMouseDown = (e) => setDragStart(e.clientX);
  const onMouseUp = (e) => {
    if (dragStart === null) return;
    const diff = dragStart - e.clientX;
    if (Math.abs(diff) > 60) diff > 0 ? next() : prev();
    setDragStart(null);
  };

  // Keyboard nav
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current, animating]);

  if (!images.length) return null;

  // Stack peek cards (behind main card)
  const stackBehind = [2, 1].map((offset) => {
    const idx = current + offset;
    if (idx >= images.length) return null;
    return { idx, offset };
  }).filter(Boolean);

  return (
    <>
      <style>{`
        @keyframes albumBg {
          0%,100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes cardEnterNext {
          from { transform: translateX(110%) rotate(6deg) scale(0.88); opacity: 0; }
          to   { transform: translateX(0) rotate(0deg) scale(1); opacity: 1; }
        }
        @keyframes cardEnterPrev {
          from { transform: translateX(-110%) rotate(-6deg) scale(0.88); opacity: 0; }
          to   { transform: translateX(0) rotate(0deg) scale(1); opacity: 1; }
        }
        @keyframes cardExitNext {
          from { transform: translateX(0) rotate(0deg) scale(1); opacity: 1; }
          to   { transform: translateX(-110%) rotate(-8deg) scale(0.85); opacity: 0; }
        }
        @keyframes cardExitPrev {
          from { transform: translateX(0) rotate(0deg) scale(1); opacity: 1; }
          to   { transform: translateX(110%) rotate(8deg) scale(0.85); opacity: 0; }
        }
        @keyframes captionFade {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heartPop {
          0%   { transform: scale(0) rotate(-20deg); opacity: 0; }
          60%  { transform: scale(1.3) rotate(5deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes petalFloat {
          0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-80px) rotate(30deg); opacity: 0; }
        }
        @keyframes stampReveal {
          0%   { transform: translate(-50%,-50%) scale(2) rotate(-15deg); opacity: 0; }
          50%  { transform: translate(-50%,-50%) scale(0.9) rotate(3deg); opacity: 1; }
          100% { transform: translate(-50%,-50%) scale(1) rotate(-3deg); opacity: 1; }
        }
        @keyframes floatDeco {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(-12px); }
        }
        @keyframes pulseBtn {
          0%,100% { box-shadow: 0 0 0 0 rgba(224,82,120,0.4); }
          50%      { box-shadow: 0 0 0 10px rgba(224,82,120,0); }
        }
      `}</style>

      <div
        style={{
          height: "100dvh",
          width: "100vw",
          overflow: "hidden",
          position: "relative",
          background: "linear-gradient(-45deg, #071220, #0d2040, #060e1a, #102038, #081830)",
          backgroundSize: "400% 400%",
          animation: show ? "albumBg 14s ease infinite" : "none",
          opacity: show ? 1 : 0,
          transition: "opacity 0.9s ease",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Outfit', sans-serif",
          userSelect: "none",
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      >
        {/* Deep pink glow orbs */}
        <div style={{ position:"absolute", top:"-10%", left:"-8%", width:"50vmin", height:"50vmin", borderRadius:"50%", background:"radial-gradient(circle, rgba(40,153,204,0.25) 0%, transparent 70%)", filter:"blur(50px)", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", bottom:"-10%", right:"-8%", width:"55vmin", height:"55vmin", borderRadius:"50%", background:"radial-gradient(circle, rgba(21,107,153,0.2) 0%, transparent 70%)", filter:"blur(55px)", pointerEvents:"none" }}/>

        {/* Deco corner bows */}
        <div style={{ position:"absolute", top:"1rem", left:"1rem", fontSize:"clamp(1.2rem,3vw,2rem)", animation:"floatDeco 4s ease-in-out infinite", pointerEvents:"none", opacity:0.7 }}>🎀</div>
        <div style={{ position:"absolute", top:"1rem", right:"1rem", fontSize:"clamp(1.2rem,3vw,2rem)", animation:"floatDeco 4.5s ease-in-out 0.5s infinite", pointerEvents:"none", opacity:0.7 }}>🎀</div>

        {/* Header */}
        <div style={{
          textAlign: "center",
          zIndex: 10,
          position: "absolute",
          top: "clamp(0.8rem, 3vh, 2rem)",
          left: 0, right: 0,
          padding: "0 1rem",
        }}>
          <div style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: "clamp(1.1rem, 3.5vw, 1.9rem)",
            fontWeight: 700,
            background: "linear-gradient(135deg, #b3ddf0, #6cbfe0, #dff0f8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "fadeUp 0.8s ease-out both",
          }}>
            💕 Our Memories Together 💕
          </div>
        </div>

        {/* ── STACK AREA ── */}
        <div style={{
          position: "relative",
          zIndex: 5,
          width: "min(88vw, 440px)",
          height: "min(68vh, 560px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "clamp(3rem, 7vh, 5rem)",
          marginBottom: "clamp(4rem, 10vh, 7rem)",
        }}>

          {/* Stack shadow cards (behind) */}
          {stackBehind.map(({ offset }) => (
            <div
              key={offset}
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "clamp(14px, 2.5vw, 22px)",
                background: `rgba(40,${80 + offset * 15},${120 + offset * 10},${0.15 - offset * 0.04})`,
                border: "2px solid rgba(74,179,216,0.2)",
                transform: `translateY(${offset * 10}px) scale(${1 - offset * 0.05}) rotate(${offset % 2 === 0 ? offset * 2 : -offset * 1.5}deg)`,
                zIndex: 5 - offset,
                boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
                overflow: "hidden",
                backdropFilter: "blur(4px)",
              }}
            />
          ))}

          {/* OUTGOING card — old photo exits */}
          {outgoing !== null && (
            <div
              key={`out-${outgoing.index}`}
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "clamp(14px, 2.5vw, 22px)",
                overflow: "hidden",
                zIndex: 11, // on top so it slides away over the incoming
                boxShadow: "0 30px 80px rgba(0,0,0,0.55), 0 0 0 2px rgba(74,179,216,0.35)",
                animation: `${outgoing.direction === "next" ? "cardExitNext" : "cardExitPrev"} 0.42s cubic-bezier(0.4,0,0.2,1) forwards`,
                background: "#0a1628",
                pointerEvents: "none",
              }}
            >
              <img
                src={`/assets/${images[outgoing.index]}`}
                alt={`Memory ${outgoing.index + 1}`}
                style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
                draggable={false}
              />
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(7,18,32,0.95) 0%, rgba(7,18,32,0.4) 35%, transparent 60%)" }}/>
            </div>
          )}

          {/* INCOMING card — new photo enters */}
          <div
            key={`in-${current}`}
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "clamp(14px, 2.5vw, 22px)",
              overflow: "hidden",
              zIndex: 10,
              boxShadow: "0 30px 80px rgba(0,0,0,0.55), 0 0 0 2px rgba(74,179,216,0.35)",
              animation: animating
                ? `${direction === "next" ? "cardEnterNext" : "cardEnterPrev"} 0.42s cubic-bezier(0.2,0.8,0.2,1) both`
                : "none",
              background: "#0a1628",
              cursor: current < images.length - 1 ? "pointer" : "default",
            }}
            onClick={() => { if (!animating && current < images.length - 1) next(); }}
          >
            <img
              src={`/assets/${images[current]}`}
              alt={`Memory ${current + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                pointerEvents: "none",
              }}
              draggable={false}
            />

            {/* Gradient overlay */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(7,18,32,0.95) 0%, rgba(7,18,32,0.4) 35%, transparent 60%)",
            }}/>

            {/* Photo number stamp top-right */}
            <div style={{
              position: "absolute",
              top: "0.8rem",
              right: "0.8rem",
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(74,179,216,0.4)",
              borderRadius: "999px",
              padding: "0.25rem 0.75rem",
              color: "#b3ddf0",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
            }}>
              {current + 1} / {images.length}
            </div>

            {/* Caption at bottom */}
            <div style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "1.5rem 1.2rem 1rem",
            }}>
              <p style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: "clamp(0.95rem, 2.5vw, 1.3rem)",
                color: "#b3ddf0",
                fontWeight: 600,
                margin: 0,
                lineHeight: 1.4,
                textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                animation: "captionFade 0.5s ease-out 0.3s both",
                key: current,
              }}>
                {getCaption(current)}
              </p>
              {/* Heart row */}
              <div style={{ display:"flex", gap:"0.3rem", marginTop:"0.4rem" }}>
                {["💙","❄️","✨"].map((e,i)=>(
                  <span key={i} style={{ fontSize:"0.85rem", animation:`heartPop 0.5s ease-out ${0.5+i*0.1}s both`, display:"inline-block" }}>{e}</span>
                ))}
              </div>
            </div>

            {/* Tap hint (first photo only) */}
            {current === 0 && (
              <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
                pointerEvents: "none",
                animation: "pulseBtn 2s ease-in-out infinite",
              }}>
                <div style={{
                  background: "rgba(255,255,255,0.18)",
                  backdropFilter: "blur(12px)",
                  border: "1.5px solid rgba(74,179,216,0.5)",
                  borderRadius: "999px",
                  padding: "0.5rem 1.3rem",
                  color: "#fff",
                  fontSize: "clamp(0.75rem,1.8vw,0.9rem)",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                }}>
                  👆 Tap to flip through
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── BOTTOM CONTROLS ── */}
        <div style={{
          position: "absolute",
          bottom: "clamp(3.5rem, 8vh, 5.5rem)",
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "clamp(0.6rem,1.5vh,1rem)",
          zIndex: 10,
        }}>
          {/* Prev / counter / next */}
          <div style={{ display:"flex", alignItems:"center", gap:"clamp(0.8rem,2vw,1.5rem)" }}>
            {/* Prev */}
            <button
              onClick={prev}
              disabled={current === 0 || animating}
              style={{
                width: "clamp(40px,8vw,52px)",
                height: "clamp(40px,8vw,52px)",
                borderRadius: "50%",
                background: current > 0 ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.05)",
                border: "1.5px solid rgba(74,179,216,0.35)",
                color: current > 0 ? "#b3ddf0" : "rgba(179,221,240,0.3)",
                fontSize: "1.5rem",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: current > 0 ? "pointer" : "not-allowed",
                backdropFilter: "blur(8px)",
                transition: "all 0.25s",
                outline: "none",
              }}
            >‹</button>

            {/* Film strip progress */}
            <div style={{
              display: "flex",
              gap: "4px",
              alignItems: "center",
              maxWidth: "min(50vw, 240px)",
              flexWrap: "nowrap",
              overflow: "hidden",
            }}>
              {Array.from({ length: Math.min(images.length, 12) }).map((_, i) => {
                const segW = Math.min(images.length, 12);
                const segIdx = Math.floor((current / images.length) * segW);
                return (
                  <div key={i} style={{
                    flex: 1,
                    height: i === segIdx ? "10px" : "6px",
                    borderRadius: "999px",
                    background: i <= segIdx
                      ? "linear-gradient(90deg, #2899cc, #6cbfe0)"
                      : "rgba(40,153,204,0.2)",
                    transition: "all 0.3s ease",
                    boxShadow: i === segIdx ? "0 0 8px rgba(40,153,204,0.8)" : "none",
                  }}/>
                );
              })}
            </div>

            {/* Next */}
            <button
              onClick={next}
              disabled={current === images.length - 1 || animating}
              style={{
                width: "clamp(40px,8vw,52px)",
                height: "clamp(40px,8vw,52px)",
                borderRadius: "50%",
                background: current < images.length - 1 ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.05)",
                border: "1.5px solid rgba(74,179,216,0.35)",
                color: current < images.length - 1 ? "#b3ddf0" : "rgba(179,221,240,0.3)",
                fontSize: "1.5rem",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: current < images.length - 1 ? "pointer" : "not-allowed",
                backdropFilter: "blur(8px)",
                transition: "all 0.25s",
                outline: "none",
              }}
            >›</button>
          </div>

          {/* Final CTA — appears when last photo reached */}
          {revealed && onNext && (
            <button
              onClick={onNext}
              style={{
                background: "linear-gradient(135deg, #2899cc, #6cbfe0, #b3ddf0)",
                backgroundSize: "200% auto",
                border: "none",
                color: "#fff",
                padding: "clamp(0.7rem,1.8vw,0.95rem) clamp(1.8rem,5vw,3rem)",
                borderRadius: "999px",
                fontSize: "clamp(0.85rem,2vw,1rem)",
                fontWeight: 700,
                letterSpacing: "0.08em",
                cursor: "pointer",
                fontFamily: "'Outfit', sans-serif",
                boxShadow: "0 10px 36px rgba(40,153,204,0.55)",
                animation: "heartPop 0.6s ease-out both, pulseBtn 3s ease-in-out 0.6s infinite",
                outline: "none",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px) scale(1.06)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = ""; }}
            >
              🎉 Continue to Celebration 🎉
            </button>
          )}
        </div>
      </div>
    </>
  );
}
