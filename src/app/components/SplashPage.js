"use client";
import React, { useEffect, useState } from "react";

export default function ElegantSplash({ onNext = () => console.log("Next clicked!") }) {
  const [isMounted, setIsMounted] = useState(false);
  const [stars, setStars] = useState([]);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Generate elegant floating light particles (stars/fireflies)
    const generatedStars = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 4,
      duration: Math.random() * 6 + 4,
      opacity: Math.random() * 0.5 + 0.3,
    }));
    setStars(generatedStars);
  }, []);

  const handleReveal = () => {
    setClicked(true);
    setTimeout(() => onNext(), 800); // Wait for fade-out animation before firing onNext
  };

  return (
    <>
      <style>{`
        @keyframes auroraShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes floatUp {
          0% { transform: translateY(100vh) scale(0.5); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(-20vh) scale(1.2); opacity: 0; }
        }
        @keyframes elegantReveal {
          from { opacity: 0; transform: translateY(30px) scale(0.95); filter: blur(10px); }
          to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        @keyframes textShine {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(228, 184, 114, 0.2); }
          50% { box-shadow: 0 0 40px rgba(228, 184, 114, 0.5); }
        }
        @keyframes pageExit {
          to { opacity: 0; transform: scale(1.1); filter: blur(20px); }
        }
      `}</style>

      <div
        style={{
          /* Strict Non-Scrolling Full Viewport constraints */
          height: "100dvh",
          width: "100vw",
          overflow: "hidden",
          margin: 0,
          padding: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          fontFamily: "'Outfit', 'Inter', sans-serif",

          /* Deep, rich animated gradient background */
          background: "linear-gradient(-45deg, #0b0c10, #1f2833, #150e24, #0b1120)",
          backgroundSize: "300% 300%",
          animation: clicked ? "pageExit 0.8s ease-in forwards" : "auroraShift 15s ease infinite",
        }}
      >
        {/* Abstract Ambient Glows */}
        <div style={{ position: "absolute", top: "10%", left: "20%", width: "40vmin", height: "40vmin", background: "rgba(228, 184, 114, 0.15)", filter: "blur(60px)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "10%", width: "50vmin", height: "50vmin", background: "rgba(107, 76, 154, 0.2)", filter: "blur(80px)", borderRadius: "50%", pointerEvents: "none" }} />

        {/* Floating Light Particles */}
        {isMounted && stars.map((star) => (
          <div
            key={star.id}
            style={{
              position: "absolute",
              left: `${star.x}%`,
              bottom: "-5%",
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: "#e4b872",
              borderRadius: "50%",
              boxShadow: `0 0 ${star.size * 3}px #e4b872`,
              opacity: star.opacity,
              animation: `floatUp ${star.duration}s ease-in-out ${star.delay}s infinite`,
              pointerEvents: "none",
            }}
          />
        ))}

        {/* Ethereal Glassmorphism Card */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "clamp(2rem, 5vmin, 4rem)",
            background: "rgba(255, 255, 255, 0.03)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRadius: "30px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            animation: isMounted ? "elegantReveal 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards" : "none",
            opacity: 0,
            width: "85vw",
            maxWidth: "600px",
          }}
        >
          {/* Subtitle / Pre-header */}
          <span style={{
            color: "rgba(255, 255, 255, 0.6)",
            textTransform: "uppercase",
            letterSpacing: "0.3em",
            fontSize: "clamp(0.7rem, 2vmin, 0.9rem)",
            marginBottom: "2vh",
            fontWeight: 300,
          }}>
            Celebrating
          </span>

          {/* Main Name with Gold Shine Effect */}
          <h1 style={{
            fontFamily: "'Playfair Display', serif", // Highly recommend adding this font to your project
            fontSize: "clamp(4rem, 15vmin, 8rem)",
            fontWeight: 600,
            margin: "0 0 1vh 0",
            background: "linear-gradient(to right, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "textShine 6s linear infinite",
            filter: "drop-shadow(0px 4px 10px rgba(0,0,0,0.4))",
            textAlign: "center",
            lineHeight: 1.1,
          }}>
            Saniya
          </h1>

          {/* Date Badge (Updated to June 6th) */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            margin: "3vh 0",
          }}>
            <div style={{ height: "1px", width: "10vw", background: "linear-gradient(90deg, transparent, rgba(228, 184, 114, 0.5))" }} />
            <span style={{
              color: "#e4b872",
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(1rem, 3vmin, 1.3rem)",
              letterSpacing: "0.15em",
              fontWeight: 400,
            }}>
              JUNE 6TH
            </span>
            <div style={{ height: "1px", width: "10vw", background: "linear-gradient(-90deg, transparent, rgba(228, 184, 114, 0.5))" }} />
          </div>

          <p style={{
            color: "rgba(255, 255, 255, 0.8)",
            fontSize: "clamp(1rem, 2.5vmin, 1.2rem)",
            textAlign: "center",
            fontWeight: 300,
            marginBottom: "5vh",
            maxWidth: "80%",
            lineHeight: 1.6,
          }}>
            An extraordinary day for an extraordinary person. Your surprise awaits.
          </p>

          {/* Premium CTA Button */}
          <button
            onClick={handleReveal}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              position: "relative",
              overflow: "hidden",
              background: hovered ? "rgba(228, 184, 114, 0.15)" : "transparent",
              border: "1px solid rgba(228, 184, 114, 0.6)",
              color: "#e4b872",
              padding: "clamp(1rem, 3vmin, 1.2rem) clamp(2.5rem, 8vw, 3.5rem)",
              borderRadius: "100px",
              fontSize: "clamp(0.9rem, 2.5vmin, 1.1rem)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              animation: "pulseGlow 4s infinite",
              transform: hovered ? "scale(1.05)" : "scale(1)",
              backdropFilter: "blur(5px)",
            }}
          >
            Enter Experience
          </button>
        </div>
      </div>
    </>
  );
}