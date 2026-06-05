"use client";
import { useState, useEffect, useRef } from "react";

function GalleryCard({ src, index, onClick, visible }) {
  const [hovered, setHovered] = useState(false);
  const delay = (index % 12) * 0.06;
  const tilt = index % 3 === 0 ? -1.8 : index % 3 === 1 ? 1.8 : 0;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: "clamp(10px, 2vw, 18px)",
        overflow: "hidden",
        aspectRatio: index % 5 === 0 ? "4/5" : index % 7 === 0 ? "3/4" : "2/3",
        cursor: "pointer",
        transition: "all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)",
        transform: hovered
          ? "translateY(-10px) scale(1.05) rotate(0deg)"
          : visible
          ? `scale(1) rotate(${tilt}deg)`
          : "scale(0.85) translateY(40px)",
        opacity: visible ? 1 : 0,
        boxShadow: hovered
          ? "0 24px 60px rgba(224,82,120,0.45), 0 0 0 3px rgba(255,143,171,0.7)"
          : "0 6px 24px rgba(224,82,120,0.2)",
        border: "2.5px solid rgba(255,194,212,0.7)",
        background: "#fff5f8",
        transitionDelay: visible ? `${delay}s` : "0s",
        willChange: "transform, opacity",
      }}
    >
      <img
        src={`/assets/${src}`}
        alt={`Saniya ${index + 1}`}
        loading="lazy"
        style={{
          width: "100%", height: "100%",
          objectFit: "cover",
          transition: "transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94)",
          transform: hovered ? "scale(1.12)" : "scale(1)",
          display: "block",
        }}
        draggable={false}
      />
      {/* Gradient overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(192,57,94,0.72) 0%, rgba(253,232,240,0.12) 45%, transparent 65%)",
        opacity: hovered ? 1 : 0.22,
        transition: "opacity 0.35s ease",
      }}/>
      {/* Label */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "0.7rem 0.75rem 0.5rem",
        transform: hovered ? "translateY(0)" : "translateY(8px)",
        opacity: hovered ? 1 : 0,
        transition: "all 0.3s ease",
      }}>
        <div style={{
          fontFamily: "'Dancing Script', cursive",
          color: "#fff", fontSize: "clamp(0.7rem, 1.5vw, 0.85rem)", fontWeight: 700,
          textShadow: "0 1px 4px rgba(0,0,0,0.4)",
        }}>✨ Saniya</div>
      </div>
      {/* Heart badge */}
      <div style={{
        position: "absolute", top: "0.5rem", right: "0.5rem",
        background: "rgba(255,255,255,0.9)", borderRadius: "999px",
        padding: "0.2rem 0.45rem", fontSize: "0.68rem", color: "#e05278", fontWeight: 700,
        transform: hovered ? "scale(1) rotate(0deg)" : "scale(0) rotate(-20deg)",
        transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        border: "1px solid rgba(255,143,171,0.5)",
        boxShadow: "0 2px 8px rgba(224,82,120,0.3)",
      }}>💗</div>
    </div>
  );
}

export default function SaniyaGalleryPage({ images = [], onNext }) {
  const [lightbox, setLightbox] = useState(null);
  const [show, setShow] = useState(false);
  const [visibleCards, setVisibleCards] = useState(new Set());
  const observerRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => { setTimeout(() => setShow(true), 80); }, []);

  useEffect(() => {
    const handler = (e) => {
      if (lightbox === null) return;
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((l) => (l + 1) % images.length);
      if (e.key === "ArrowLeft") setLightbox((l) => (l - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, images.length]);

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisibleCards((prev) => new Set([...prev, parseInt(e.target.dataset.idx)]));
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -20px 0px" }
    );
    cardRefs.current.forEach((el) => { if (el) observerRef.current.observe(el); });
    return () => observerRef.current?.disconnect();
  }, [images.length]);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(-45deg, #ffe4f0, #ffc2d4, #ffd6e7, #ffeef6, #ffafd2, #ffc8dc)",
      backgroundSize: "400% 400%",
      backgroundAttachment: "fixed",
      animation: show ? "pinkGallery 12s ease-in-out infinite" : "none",
      paddingTop: "clamp(1.5rem, 5vh, 3.5rem)",
      paddingBottom: "clamp(5rem, 10vh, 7rem)",
      paddingLeft: "clamp(0.75rem, 2vw, 1.5rem)",
      paddingRight: "clamp(0.75rem, 2vw, 1.5rem)",
      opacity: show ? 1 : 0,
      transition: "opacity 0.7s ease",
      position: "relative",
      fontFamily: "'Outfit', sans-serif",
    }}>
      <style>{`
        @keyframes pinkGallery {
          0%,100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>

      {/* Fixed bg orbs */}
      <div style={{ position:"fixed", top:"-5%", right:"-5%", width:"clamp(180px,28vw,360px)", height:"clamp(180px,28vw,360px)", borderRadius:"50%", background:"radial-gradient(circle, rgba(255,105,180,0.3) 0%, transparent 70%)", filter:"blur(35px)", pointerEvents:"none", zIndex:0 }}/>
      <div style={{ position:"fixed", bottom:"5%", left:"-3%", width:"clamp(150px,20vw,280px)", height:"clamp(150px,20vw,280px)", borderRadius:"50%", background:"radial-gradient(circle, rgba(255,20,147,0.2) 0%, transparent 70%)", filter:"blur(28px)", pointerEvents:"none", zIndex:0 }}/>

      {/* Hero header */}
      <div style={{ textAlign:"center", marginBottom:"clamp(1.5rem,4vh,2.5rem)", position:"relative", zIndex:1 }}>
        {/* Big profile-style name */}
        <div style={{
          fontSize: "clamp(3rem, 10vw, 6rem)",
          animation: "float 5s ease-in-out infinite, fadeDown 0.8s ease-out both",
          marginBottom: "0.5rem",
          lineHeight: 1,
        }}>🌸</div>

        <h1 style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: "clamp(2rem, 7vw, 4.5rem)",
          fontWeight: 700,
          background: "linear-gradient(135deg, #c0395e, #e05278, #ff6b9d, #ffb3c8)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          margin: "0 0 0.3rem",
          animation: "fadeUp 0.7s ease-out 0.15s both",
          lineHeight: 1.1,
        }}>
          Saniya ✨
        </h1>

        <p style={{
          color: "#a0405a",
          fontFamily: "'Dancing Script', cursive",
          fontSize: "clamp(0.95rem, 2.5vw, 1.3rem)",
          animation: "fadeUp 0.7s ease-out 0.25s both",
          marginBottom: "0.8rem",
          fontStyle: "italic",
        }}>
          The birthday girl herself — gorgeous as always 💖
        </p>

        <div style={{
          display: "inline-flex", alignItems: "center", gap: "0.4rem",
          background: "rgba(255,255,255,0.6)", backdropFilter: "blur(12px)",
          border: "1.5px solid rgba(255,143,171,0.55)",
          borderRadius: "999px", padding: "0.4rem 1.4rem",
          fontSize: "clamp(0.74rem,1.7vw,0.86rem)", fontWeight: 700, color: "#e05278",
          boxShadow: "0 4px 16px rgba(255,143,171,0.25)",
          animation: "fadeUp 0.7s ease-out 0.35s both",
        }}>
          📸 {images.length} beautiful photos
        </div>
      </div>

      {/* Masonry Grid */}
      <div style={{
        columns: "clamp(120px, 28vw, 230px) auto",
        columnGap: "clamp(0.5rem, 1.5vw, 1rem)",
        maxWidth: "1280px",
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
      }}>
        {images.map((img, i) => (
          <div
            key={i}
            ref={(el) => { cardRefs.current[i] = el; }}
            data-idx={i}
            style={{ breakInside: "avoid", marginBottom: "clamp(0.5rem, 1.5vw, 1rem)" }}
          >
            <GalleryCard
              src={img}
              index={i}
              onClick={() => setLightbox(i)}
              visible={visibleCards.has(i)}
            />
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div style={{ textAlign:"center", marginTop:"clamp(2rem,5vh,4rem)", position:"relative", zIndex:1 }}>
        <div style={{ fontSize:"clamp(2rem,6vw,3.5rem)", animation:"heartbeatBig 1.5s ease-in-out infinite", marginBottom:"0.8rem", display:"inline-block" }}>💖</div>
        <h3 style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: "clamp(1.2rem,3.5vw,2rem)",
          fontWeight: 700,
          background: "linear-gradient(135deg, #c0395e, #e05278, #ff6b9d)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          marginBottom: "0.4rem",
        }}>
          Now let's see our memories together! 💕
        </h3>
        <p style={{
          color: "#a0405a", fontFamily: "'Dancing Script', cursive",
          fontSize: "clamp(0.9rem,2vw,1.1rem)",
          marginBottom: "clamp(1.2rem,3vh,2rem)", fontStyle: "italic",
        }}>
          Tap below to relive our favourite moments 🌸
        </p>
        {onNext && (
          <button
            onClick={onNext}
            className="btn btn-primary"
            style={{
              fontSize: "clamp(0.9rem,2.2vw,1.05rem)",
              padding: "clamp(0.85rem,2vw,1.1rem) clamp(2rem,5vw,3rem)",
              boxShadow: "0 10px 36px rgba(224,82,120,0.45)",
              background: "linear-gradient(135deg, #e05278, #ff6b9d, #ffb3c8)",
              backgroundSize: "200% auto",
              letterSpacing: "0.05em",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-5px) scale(1.06)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = ""; }}
          >
            Our Memories 💕→
          </button>
        )}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "rgba(60,10,30,0.9)",
            backdropFilter: "blur(22px)", WebkitBackdropFilter: "blur(22px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "1rem", animation: "fadeIn 0.3s ease",
          }}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
            style={{
              position: "absolute", top: "1rem", right: "1rem",
              width: "clamp(36px,6vw,48px)", height: "clamp(36px,6vw,48px)",
              borderRadius: "50%", background: "rgba(255,255,255,0.15)",
              border: "1.5px solid rgba(255,143,171,0.5)", color: "#fff",
              fontSize: "1.2rem", display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", transition: "all 0.25s", backdropFilter: "blur(8px)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(224,82,120,0.6)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; }}
          >✕</button>

          <div style={{ position:"absolute", top:"1rem", left:"1rem", background:"rgba(255,255,255,0.12)", backdropFilter:"blur(8px)", border:"1px solid rgba(255,143,171,0.4)", borderRadius:"999px", padding:"0.35rem 1rem", color:"#ffd6e7", fontSize:"0.8rem", fontFamily:"'Dancing Script', cursive", fontWeight:600 }}>
            ✨ {lightbox + 1} / {images.length}
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); setLightbox((l) => (l - 1 + images.length) % images.length); }}
            style={{ position:"absolute", left:"1rem", top:"50%", transform:"translateY(-50%)", width:"clamp(40px,7vw,54px)", height:"clamp(40px,7vw,54px)", borderRadius:"50%", background:"rgba(255,255,255,0.14)", border:"1.5px solid rgba(255,143,171,0.5)", color:"#fff", fontSize:"1.8rem", fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", transition:"all 0.25s", backdropFilter:"blur(8px)" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(224,82,120,0.55)"; e.currentTarget.style.transform = "translateY(-50%) scale(1.1)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.14)"; e.currentTarget.style.transform = "translateY(-50%)"; }}
          >‹</button>

          <button
            onClick={(e) => { e.stopPropagation(); setLightbox((l) => (l + 1) % images.length); }}
            style={{ position:"absolute", right:"1rem", top:"50%", transform:"translateY(-50%)", width:"clamp(40px,7vw,54px)", height:"clamp(40px,7vw,54px)", borderRadius:"50%", background:"rgba(255,255,255,0.14)", border:"1.5px solid rgba(255,143,171,0.5)", color:"#fff", fontSize:"1.8rem", fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", transition:"all 0.25s", backdropFilter:"blur(8px)" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(224,82,120,0.55)"; e.currentTarget.style.transform = "translateY(-50%) scale(1.1)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.14)"; e.currentTarget.style.transform = "translateY(-50%)"; }}
          >›</button>

          <div
            onClick={(e) => e.stopPropagation()}
            style={{ borderRadius:"clamp(12px,2vw,24px)", overflow:"hidden", boxShadow:"0 40px 100px rgba(0,0,0,0.5), 0 0 0 2.5px rgba(255,143,171,0.5)", animation:"scaleInBounce 0.4s ease-out both", maxWidth:"min(90vw, 820px)", maxHeight:"85vh" }}
          >
            <img
              src={`/assets/${images[lightbox]}`}
              alt={`Saniya ${lightbox + 1}`}
              style={{ display:"block", maxWidth:"min(88vw, 820px)", maxHeight:"80vh", objectFit:"contain" }}
            />
            <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"1rem 1.5rem 0.8rem", background:"linear-gradient(to top, rgba(60,10,30,0.88), transparent)", fontFamily:"'Dancing Script', cursive", fontSize:"clamp(0.85rem,2vw,1.1rem)", color:"#ffd6e7", fontWeight:600 }}>
              ✨ Saniya — Photo {lightbox + 1}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
