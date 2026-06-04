"use client";

// Floating decorations used across pages — no SVG 8 or 9
export default function PinkDeco({ variant = "clouds" }) {
  if (variant === "clouds") {
    return (
      <>
        {/* Soft gradient blobs instead of SVG 8/9 */}
        <div style={{
          position:"absolute", top:"-5%", left:"-6%",
          width:"clamp(180px,30vw,360px)", height:"clamp(180px,30vw,360px)",
          borderRadius:"50%",
          background:"radial-gradient(circle, rgba(255,182,193,0.55) 0%, rgba(255,143,171,0.25) 50%, transparent 70%)",
          filter:"blur(24px)",
          animation:"float 8s ease-in-out infinite",
          pointerEvents:"none",
          zIndex:0,
        }}/>
        <div style={{
          position:"absolute", bottom:"3%", right:"-4%",
          width:"clamp(150px,24vw,300px)", height:"clamp(150px,24vw,300px)",
          borderRadius:"50%",
          background:"radial-gradient(circle, rgba(255,143,171,0.45) 0%, transparent 70%)",
          filter:"blur(20px)",
          animation:"floatR 10s ease-in-out 2s infinite",
          pointerEvents:"none",
          zIndex:0,
        }}/>

        {/* Floating emoji hearts */}
        <div style={{ position:"absolute", top:"15%", left:"6%", fontSize:"clamp(1.2rem,3vw,2rem)", opacity:0.55, animation:"float 5s ease-in-out infinite", pointerEvents:"none", zIndex:1 }}>💕</div>
        <div style={{ position:"absolute", top:"25%", right:"7%", fontSize:"clamp(1rem,2.5vw,1.6rem)", opacity:0.5, animation:"float 6s ease-in-out 1s infinite", pointerEvents:"none", zIndex:1 }}>💗</div>
        <div style={{ position:"absolute", bottom:"20%", left:"5%", fontSize:"clamp(1rem,2vw,1.5rem)", opacity:0.45, animation:"floatR 7s ease-in-out 0.5s infinite", pointerEvents:"none", zIndex:1 }}>🌸</div>
        <div style={{ position:"absolute", bottom:"28%", right:"6%", fontSize:"clamp(0.9rem,2vw,1.3rem)", opacity:0.4, animation:"float 4.5s ease-in-out 2s infinite", pointerEvents:"none", zIndex:1 }}>💖</div>
        <div style={{ position:"absolute", top:"65%", left:"9%", fontSize:"clamp(0.8rem,1.5vw,1.1rem)", opacity:0.35, animation:"floatR 8s ease-in-out 1.5s infinite", pointerEvents:"none", zIndex:1 }}>⭐</div>
      </>
    );
  }

  if (variant === "balloons") {
    return (
      <>
        <div style={{ position:"absolute", top:"5%", left:"4%", fontSize:"clamp(2rem,5vw,3.5rem)", opacity:0.55, animation:"float 6s ease-in-out infinite", pointerEvents:"none", zIndex:1 }}>🎈</div>
        <div style={{ position:"absolute", top:"8%", right:"5%", fontSize:"clamp(2rem,5vw,3.5rem)", opacity:0.5, animation:"floatR 7s ease-in-out 1s infinite", pointerEvents:"none", zIndex:1 }}>🎉</div>
        <div style={{ position:"absolute", bottom:"14%", left:"4%", fontSize:"clamp(1.5rem,3.5vw,2.5rem)", opacity:0.4, animation:"float 5s ease-in-out 0.5s infinite", pointerEvents:"none", zIndex:1 }}>🎊</div>
        <div style={{ position:"absolute", bottom:"18%", right:"5%", fontSize:"clamp(1.5rem,3vw,2rem)", opacity:0.45, animation:"floatR 6s ease-in-out 1.5s infinite", pointerEvents:"none", zIndex:1 }}>🎁</div>
      </>
    );
  }

  if (variant === "stars") {
    return (
      <>
        <div style={{ position:"absolute", top:"10%", left:"5%", fontSize:"clamp(1.5rem,3vw,2.2rem)", opacity:0.5, animation:"sparkle 3s ease-in-out infinite", pointerEvents:"none", zIndex:1 }}>✨</div>
        <div style={{ position:"absolute", top:"20%", right:"6%", fontSize:"clamp(1.3rem,2.5vw,1.8rem)", opacity:0.45, animation:"sparkle 4s ease-in-out 1s infinite", pointerEvents:"none", zIndex:1 }}>⭐</div>
        <div style={{ position:"absolute", bottom:"25%", left:"8%", fontSize:"clamp(1.2rem,2.5vw,1.7rem)", opacity:0.4, animation:"sparkle 3.5s ease-in-out 0.5s infinite", pointerEvents:"none", zIndex:1 }}>✨</div>
        <div style={{ position:"absolute", bottom:"15%", right:"7%", fontSize:"clamp(1.4rem,3vw,2rem)", opacity:0.5, animation:"sparkle 5s ease-in-out 2s infinite", pointerEvents:"none", zIndex:1 }}>🌟</div>
        <div style={{ position:"absolute", top:"50%", left:"3%", fontSize:"clamp(1.1rem,2vw,1.4rem)", opacity:0.35, animation:"sparkle 4s ease-in-out 1.5s infinite", pointerEvents:"none", zIndex:1 }}>💫</div>
        <div style={{ position:"absolute", top:"45%", right:"4%", fontSize:"clamp(1.2rem,2.5vw,1.6rem)", opacity:0.4, animation:"sparkle 3s ease-in-out 0.8s infinite", pointerEvents:"none", zIndex:1 }}>✨</div>
      </>
    );
  }

  return null;
}
