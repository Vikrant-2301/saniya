"use client";
import { useState, useEffect, useRef } from "react";

const LETTER = `To my dearest Saniya,

Happy Birthday! 💖 On this very special day, I wanted to do something completely unique and heartfelt — just for you.

You are the kind of person who makes every room brighter the moment you walk in. Your laughter is contagious, your kindness is real, and your spirit is absolutely unmatched.

I am endlessly grateful for every memory we've made together. Our crazy adventures, our inside jokes, the way you always know how to make everything better — you're not just a friend, you're family.

This year is going to be YOUR year. Everything you've been working for, dreaming about, hoping for — it's all coming to you. You deserve every bit of happiness this world has to offer.

Keep being your incredible, unapologetic, beautiful self. The world is so much better with you in it.

With all my love, always,
Your best friend 🌸`;

const LINE_HEIGHT_PX = 32;

export default function LetterPageNew({ onNext }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const [show, setShow] = useState(false);
  const intervalRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => { setTimeout(() => setShow(true), 80); }, []);

  useEffect(() => {
    let i = 0;
    intervalRef.current = setInterval(() => {
      i += 2;
      setDisplayed(LETTER.slice(0, i));
      if (i >= LETTER.length) {
        clearInterval(intervalRef.current);
        setDisplayed(LETTER);
        setDone(true);
      }
    }, 16);
    return () => clearInterval(intervalRef.current);
  }, []);

  // Auto-scroll as text types
  useEffect(() => {
    if (textRef.current) {
      textRef.current.scrollTop = textRef.current.scrollHeight;
    }
  }, [displayed]);

  const handleSkip = () => {
    clearInterval(intervalRef.current);
    setDisplayed(LETTER);
    setDone(true);
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        background: "linear-gradient(160deg, #dff0f8 0%, #b3ddf0 30%, #9ed5ec 65%, #c8e8f5 100%)",
        backgroundSize: "300% 300%",
        animation: show ? "rainbowShift 12s ease-in-out infinite" : "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(0.5rem, 2vw, 1.5rem)",
        opacity: show ? 1 : 0,
        transition: "opacity 0.7s ease",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background floating elements */}
      {["💙","❄️","💫","✨","⭐","🌟"].map((e, i) => (
        <div key={i} style={{
          position:"absolute",
          left: `${[4,88,6,84,50,12][i]}%`,
          top: `${[14,18,72,62,4,82][i]}%`,
          fontSize: "clamp(1rem, 2.5vw, 1.7rem)",
          opacity: 0.35,
          animation: `float ${4+i}s ease-in-out ${i*0.65}s infinite`,
          pointerEvents: "none",
          zIndex: 0,
        }}>{e}</div>
      ))}

      {/* Glowing orbs */}
      <div style={{
        position:"absolute", top:"-10%", left:"-8%",
        width:"clamp(200px, 38vw, 450px)", height:"clamp(200px, 38vw, 450px)",
        borderRadius:"50%",
        background:"radial-gradient(circle, rgba(40,153,204,0.38) 0%, transparent 70%)",
        filter:"blur(40px)", pointerEvents:"none",
      }}/>
      <div style={{
        position:"absolute", bottom:"-8%", right:"-5%",
        width:"clamp(180px, 30vw, 380px)", height:"clamp(180px, 30vw, 380px)",
        borderRadius:"50%",
        background:"radial-gradient(circle, rgba(21,107,153,0.3) 0%, transparent 70%)",
        filter:"blur(35px)", pointerEvents:"none",
      }}/>

      {/* Notebook wrapper */}
      <div style={{
        width: "100%",
        maxWidth: "min(700px, 96vw)",
        position: "relative",
        zIndex: 2,
        animation: "letterReveal 0.9s ease-out both",
      }}>
        {/* Skip button */}
        {!done && (
          <button
            onClick={handleSkip}
            style={{
              position: "absolute",
              top: "-2.4rem",
              right: "0",
              background: "rgba(255,255,255,0.88)",
              border: "1.5px solid rgba(74,179,216,0.5)",
              borderRadius: "999px",
              padding: "0.32rem 1.1rem",
              fontSize: "0.8rem",
              color: "#156b99",
              cursor: "pointer",
              backdropFilter: "blur(12px)",
              fontFamily: "Outfit, sans-serif",
              fontWeight: 700,
              zIndex: 10,
              boxShadow: "0 2px 16px rgba(40,153,204,0.3)",
              transition: "all 0.2s",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            Skip ⏩
          </button>
        )}

        {/* Notebook outer */}
        <div style={{
          background: "#fff",
          borderRadius: "6px 16px 16px 6px",
          boxShadow: "10px 10px 50px rgba(0,0,0,0.22), -4px -4px 20px rgba(0,0,0,0.06), 0 0 0 1px rgba(74,179,216,0.3)",
          overflow: "hidden",
          display: "flex",
          height: "min(80vh, 600px)",
          position: "relative",
        }}>
          {/* Ring binder */}
          <div style={{
            width: "clamp(40px, 7vw, 56px)",
            minWidth: "clamp(40px, 7vw, 56px)",
            background: "linear-gradient(to bottom, #f0f0f0, #e4e4e4)",
            borderRight: "2px solid #ddd",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            padding: "1.2rem 0",
            alignItems: "center",
            flexShrink: 0,
          }}>
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} style={{
                width: "clamp(16px, 3vw, 22px)",
                height: "clamp(16px, 3vw, 22px)",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #e8e8e8, #c8c8c8)",
                boxShadow: "inset 0 2px 5px rgba(0,0,0,0.22), 0 1px 3px rgba(255,255,255,0.95)",
                border: "1px solid #bbb",
              }}/>
            ))}
          </div>

          {/* Paper area */}
          <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>

            {/* Red margin line */}
            <div style={{
              position: "absolute",
              top: 0, bottom: 0,
              left: "clamp(50px, 10vw, 70px)",
              width: "2px",
              background: "rgba(40,153,204,0.35)",
              zIndex: 3,
              pointerEvents: "none",
            }}/>

            {/* Ruled blue lines — precisely aligned */}
            <div style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `repeating-linear-gradient(
                to bottom,
                transparent 0px,
                transparent ${LINE_HEIGHT_PX - 1}px,
                rgba(100,185,220,0.3) ${LINE_HEIGHT_PX - 1}px,
                rgba(100,185,220,0.3) ${LINE_HEIGHT_PX}px
              )`,
              backgroundSize: `100% ${LINE_HEIGHT_PX}px`,
              backgroundPosition: "0 0",
              pointerEvents: "none",
              zIndex: 2,
            }}/>

            {/* Letter content */}
            <div style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              zIndex: 4,
            }}>
              {/* Header */}
              <div style={{
                textAlign: "center",
                padding: "clamp(0.6rem, 1.5vh, 1rem) clamp(1rem, 2.5vw, 1.5rem) clamp(0.4rem, 1vh, 0.6rem)",
                borderBottom: "1.5px dashed rgba(74,179,216,0.45)",
                flexShrink: 0,
                background: "rgba(255,255,255,0.6)",
              }}>
                <div style={{ fontSize: "clamp(1.1rem, 3vw, 1.6rem)", marginBottom: "0.2rem" }}>💌</div>
                <div style={{
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: "clamp(0.88rem, 2.2vw, 1.1rem)",
                  color: "#2899cc",
                  fontWeight: 700,
                  letterSpacing: "0.02em",
                }}>
                  A Letter for My Dearest Friend
                </div>
              </div>

              {/* Scrollable text area */}
              <div
                ref={textRef}
                style={{
                  flex: 1,
                  overflowY: done ? "auto" : "hidden",
                  paddingLeft: "clamp(60px, 12vw, 82px)",
                  paddingRight: "clamp(1rem, 2.5vw, 1.8rem)",
                  paddingTop: `${LINE_HEIGHT_PX * 0.5}px`,
                  paddingBottom: "clamp(0.5rem, 1.5vh, 1rem)",
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(40,153,204,0.3) transparent",
                }}
              >
                <p style={{
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: "clamp(0.82rem, 1.9vw, 1.05rem)",
                  lineHeight: `${LINE_HEIGHT_PX}px`,
                  color: "#2a1018",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  margin: 0,
                  padding: 0,
                }}>
                  {displayed}
                  {!done && (
                    <span style={{
                      display: "inline-block",
                      width: "2px",
                      height: "1em",
                      background: "#2899cc",
                      verticalAlign: "text-bottom",
                      marginLeft: "1px",
                      animation: "blinkCursor 0.7s ease infinite",
                    }}/>
                  )}
                </p>
              </div>

              {/* Footer when done */}
              {done && (
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "clamp(0.5rem, 1.2vh, 0.75rem) clamp(1rem, 2.5vw, 1.5rem)",
                  borderTop: "1.5px dashed rgba(74,179,216,0.4)",
                  flexShrink: 0,
                  flexWrap: "wrap",
                  gap: "0.6rem",
                  animation: "fadeUp 0.6s ease-out both",
                  background: "rgba(255,255,255,0.5)",
                }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
                    <img
                      src="/assets/as/1.svg"
                      alt="seal"
                      style={{
                        width: "clamp(34px, 6vw, 48px)",
                        filter: "drop-shadow(0 3px 12px rgba(40,153,204,0.5))",
                        animation: "heartbeat 1.5s ease-in-out infinite",
                      }}
                    />
                    <span style={{
                      fontFamily:"'Dancing Script', cursive",
                      fontSize:"clamp(0.8rem, 1.8vw, 1rem)",
                          color:"#156b99",
                      fontWeight: 600,
                    }}>With love 💙</span>
                  </div>

                  <button
                    onClick={onNext}
                    className="btn btn-primary"
                    style={{
                      fontSize: "clamp(0.82rem, 1.8vw, 0.98rem)",
                      padding: "clamp(0.55rem, 1.5vw, 0.75rem) clamp(1.3rem, 3vw, 1.9rem)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    Continue 💙
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
