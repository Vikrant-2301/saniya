"use client";
import { useState, useEffect, useRef, useCallback } from "react";

// Masonry-style gallery card with scroll-triggered entry animation
function GalleryCard({ img, index, onClick, visible }) {
  const [hovered, setHovered] = useState(false);
  const delay = (index % 12) * 0.06;
  const tilt = index % 3 === 0 ? -1.5 : index % 3 === 1 ? 1.5 : 0;

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
          ? "translateY(-10px) scale(1.04) rotate(0deg)"
          : visible
          ? `scale(1) rotate(${tilt}deg)`
          : "scale(0.85) translateY(40px)",
        opacity: visible ? 1 : 0,
        boxShadow: hovered
          ? "0 24px 60px rgba(224,82,120,0.4), 0 0 0 3px rgba(255,143,171,0.6)"
          : "0 6px 24px rgba(224,82,120,0.18)",
        border: "2.5px solid rgba(255,194,212,0.65)",
        background: "#fff5f8",
        transitionDelay: visible ? `${delay}s` : "0s",
        willChange: "transform, opacity",
      }}
    >
      <img
        src={`/assets/${img}`}
        alt={`Memory ${index + 1}`}
        loading="lazy"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94)",
          transform: hovered ? "scale(1.12)" : "scale(1)",
          display: "block",
        }}
      />

      {/* Gradient overlay always */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to top, rgba(224,82,120,0.65) 0%, rgba(253,232,240,0.15) 45%, transparent 65%)",
        opacity: hovered ? 1 : 0.3,
        transition: "opacity 0.35s ease",
      }} />

      {/* Memory label */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: "0.7rem 0.8rem 0.5rem",
        transform: hovered ? "translateY(0)" : "translateY(8px)",
        opacity: hovered ? 1 : 0,
        transition: "all 0.3s ease",
      }}>
        <div style={{
          fontFamily: "'Dancing Script', cursive",
          color: "#fff",
          fontSize: "clamp(0.72rem, 1.6vw, 0.88rem)",
          fontWeight: 700,
          textShadow: "0 1px 4px rgba(0,0,0,0.3)",
        }}>
          💕 Memory #{index + 1}
        </div>
        <div style={{
          color: "rgba(255,255,255,0.85)",
          fontSize: "0.65rem",
          marginTop: "1px",
        }}>
          Click to view ✨
        </div>
      </div>

      {/* Heart badge */}
      <div style={{
        position: "absolute",
        top: "0.5rem",
        right: "0.5rem",
        background: "rgba(255,255,255,0.88)",
        borderRadius: "999px",
        padding: "0.2rem 0.5rem",
        fontSize: "0.7rem",
        color: "#e05278",
        fontWeight: 700,
        transform: hovered ? "scale(1) rotate(0deg)" : "scale(0) rotate(-20deg)",
        transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        border: "1px solid rgba(255,143,171,0.5)",
        boxShadow: "0 2px 8px rgba(224,82,120,0.3)",
      }}>
        💗
      </div>
    </div>
  );
}

// Shimmer placeholder
function ShimmerCard() {
  return (
    <div style={{
      borderRadius: "clamp(10px, 2vw, 18px)",
      aspectRatio: "2/3",
      background: "linear-gradient(90deg, rgba(255,194,212,0.4) 25%, rgba(255,143,171,0.2) 50%, rgba(255,194,212,0.4) 75%)",
      backgroundSize: "200% 100%",
      animation: "shimmerCard 1.5s ease-in-out infinite",
    }} />
  );
}

export default function GalleryPageNew({ images, onNext }) {
  const [lightbox, setLightbox] = useState(null);
  const [show, setShow] = useState(false);
  const [visibleCards, setVisibleCards] = useState(new Set());
  const observerRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => { setTimeout(() => setShow(true), 80); }, []);

  // Keyboard nav for lightbox
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

  // IntersectionObserver for scroll animation
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = parseInt(e.target.dataset.idx);
            setVisibleCards((prev) => new Set([...prev, idx]));
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );

    cardRefs.current.forEach((el) => {
      if (el) observerRef.current.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [images.length]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(145deg, #fff0f5 0%, #ffd6e7 30%, #ffb3cc 60%, #ffe0ec 100%)",
        backgroundAttachment: "fixed",
        paddingTop: "clamp(1.5rem, 5vh, 3.5rem)",
        paddingBottom: "clamp(4rem, 8vh, 6rem)",
        paddingLeft: "clamp(0.75rem, 2vw, 1.5rem)",
        paddingRight: "clamp(0.75rem, 2vw, 1.5rem)",
        opacity: show ? 1 : 0,
        transition: "opacity 0.7s ease",
        position: "relative",
      }}
    >
      {/* Fixed background orbs */}
      <div style={{
        position:"fixed", top:"-5%", right:"-5%",
        width:"clamp(200px,30vw,380px)", height:"clamp(200px,30vw,380px)",
        borderRadius:"50%",
        background:"radial-gradient(circle, rgba(255,77,121,0.25) 0%, transparent 70%)",
        filter:"blur(30px)", pointerEvents:"none", zIndex:0,
      }}/>
      <div style={{
        position:"fixed", bottom:"5%", left:"-3%",
        width:"clamp(160px,22vw,300px)", height:"clamp(160px,22vw,300px)",
        borderRadius:"50%",
        background:"radial-gradient(circle, rgba(249,199,79,0.25) 0%, transparent 70%)",
        filter:"blur(24px)", pointerEvents:"none", zIndex:0,
      }}/>

      {/* Hero header */}
      <div style={{
        textAlign: "center",
        marginBottom: "clamp(1.5rem, 4vh, 3rem)",
        position: "relative",
        zIndex: 1,
      }}>
        <img
          src="/assets/as/4.svg"
          alt="HBD"
          style={{
            width: "clamp(130px, 24vw, 260px)",
            margin: "0 auto clamp(0.8rem,2vh,1.2rem)",
            filter: "drop-shadow(0 10px 30px rgba(224,82,120,0.4))",
            animation: "float 5s ease-in-out infinite, fadeUp 0.7s ease-out both",
          }}
        />
        <h1
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: "clamp(1.8rem, 5.5vw, 3.5rem)",
            fontWeight: 700,
            color: "#e05278",
            marginBottom: "0.4rem",
            animation: "fadeUp 0.7s ease-out 0.15s both",
          }}
        >
          Our Beautiful Memories 📸
        </h1>
        <p
          style={{
            color: "#c47a8a",
            fontFamily: "'Dancing Script', cursive",
            fontSize: "clamp(0.95rem, 2.5vw, 1.3rem)",
            animation: "fadeUp 0.7s ease-out 0.25s both",
            marginBottom: "0.8rem",
          }}
        >
          Every photo is a treasure, every moment is gold ✨
        </p>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            background: "rgba(255,143,171,0.2)",
            border: "1.5px solid rgba(255,143,171,0.5)",
            borderRadius: "999px",
            padding: "0.4rem 1.4rem",
            fontSize: "clamp(0.75rem,1.8vw,0.88rem)",
            fontWeight: 700,
            color: "#e05278",
            letterSpacing: "0.08em",
            animation: "fadeUp 0.7s ease-out 0.35s both",
            backdropFilter: "blur(10px)",
            boxShadow: "0 4px 16px rgba(255,143,171,0.3)",
          }}
        >
          📸 {images.length} Memories with Love
        </div>
      </div>

      {/* Masonry Grid */}
      <div
        style={{
          columns: "clamp(120px, 30vw, 240px) auto",
          columnGap: "clamp(0.5rem, 1.5vw, 1rem)",
          maxWidth: "1280px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {images.map((img, i) => (
          <div
            key={i}
            ref={(el) => { cardRefs.current[i] = el; }}
            data-idx={i}
            style={{
              breakInside: "avoid",
              marginBottom: "clamp(0.5rem, 1.5vw, 1rem)",
            }}
          >
            <GalleryCard
              img={img}
              index={i}
              onClick={() => setLightbox(i)}
              visible={visibleCards.has(i)}
            />
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        textAlign: "center",
        marginTop: "clamp(2rem, 5vh, 4rem)",
        position: "relative",
        zIndex: 1,
      }}>
        <div style={{
          fontSize: "clamp(2.5rem, 8vw, 4rem)",
          animation: "heartbeatBig 1.5s ease-in-out infinite",
          marginBottom: "1rem",
          display: "inline-block",
        }}>
          💖
        </div>
        <h3 style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: "clamp(1.3rem, 4vw, 2.3rem)",
          fontWeight: 700,
          color: "#e05278",
          marginBottom: "0.4rem",
        }}>
          Here's to many more memories! 🥂
        </h3>
        <p style={{
          color: "#c47a8a",
          fontFamily: "'Dancing Script', cursive",
          fontSize: "clamp(0.95rem, 2.2vw, 1.2rem)",
          marginBottom: "clamp(1.2rem, 3vh, 2rem)",
        }}>
          Happy Birthday, Saniya! 🎂✨
        </p>
        {onNext && (
          <button
            onClick={onNext}
            className="btn btn-primary"
            style={{
              fontSize: "clamp(0.9rem, 2.2vw, 1.05rem)",
              padding: "clamp(0.85rem,2vw,1.1rem) clamp(2rem,5vw,3rem)",
              boxShadow: "0 10px 36px rgba(224,82,120,0.45)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-5px) scale(1.06)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = ""; }}
          >
            See Final Message 💌
          </button>
        )}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(60,10,30,0.85)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            animation: "fadeIn 0.3s ease",
          }}
        >
          {/* Close */}
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
            style={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              width: "clamp(36px,6vw,48px)",
              height: "clamp(36px,6vw,48px)",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.15)",
              border: "1.5px solid rgba(255,143,171,0.5)",
              color: "#fff",
              fontSize: "1.2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.25s",
              backdropFilter: "blur(8px)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,77,121,0.5)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; }}
          >
            ✕
          </button>

          {/* Counter */}
          <div style={{
            position: "absolute",
            top: "1rem",
            left: "1rem",
            background: "rgba(255,255,255,0.12)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,143,171,0.4)",
            borderRadius: "999px",
            padding: "0.35rem 1rem",
            color: "#ffcdd8",
            fontSize: "0.8rem",
            fontFamily: "'Dancing Script', cursive",
            fontWeight: 600,
          }}>
            💕 {lightbox + 1} / {images.length}
          </div>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox((l) => (l - 1 + images.length) % images.length); }}
            style={{
              position: "absolute",
              left: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              width: "clamp(40px,7vw,56px)",
              height: "clamp(40px,7vw,56px)",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.14)",
              border: "1.5px solid rgba(255,143,171,0.5)",
              color: "#fff",
              fontSize: "1.8rem",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.25s",
              backdropFilter: "blur(8px)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,77,121,0.5)"; e.currentTarget.style.transform = "translateY(-50%) scale(1.1)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.14)"; e.currentTarget.style.transform = "translateY(-50%)"; }}
          >‹</button>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox((l) => (l + 1) % images.length); }}
            style={{
              position: "absolute",
              right: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              width: "clamp(40px,7vw,56px)",
              height: "clamp(40px,7vw,56px)",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.14)",
              border: "1.5px solid rgba(255,143,171,0.5)",
              color: "#fff",
              fontSize: "1.8rem",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.25s",
              backdropFilter: "blur(8px)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,77,121,0.5)"; e.currentTarget.style.transform = "translateY(-50%) scale(1.1)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.14)"; e.currentTarget.style.transform = "translateY(-50%)"; }}
          >›</button>

          {/* Image container */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              borderRadius: "clamp(12px,2vw,24px)",
              overflow: "hidden",
              boxShadow: "0 40px 100px rgba(0,0,0,0.5), 0 0 0 2px rgba(255,143,171,0.4)",
              animation: "scaleInBounce 0.4s ease-out both",
              position: "relative",
              maxWidth: "min(90vw, 800px)",
              maxHeight: "85vh",
            }}
          >
            <img
              src={`/assets/${images[lightbox]}`}
              alt={`Memory ${lightbox + 1}`}
              style={{
                display: "block",
                maxWidth: "min(88vw, 800px)",
                maxHeight: "80vh",
                objectFit: "contain",
              }}
            />
            <div style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "1rem 1.5rem 0.8rem",
              background: "linear-gradient(to top, rgba(60,10,30,0.85), transparent)",
              fontFamily: "'Dancing Script', cursive",
              fontSize: "clamp(0.85rem,2vw,1.1rem)",
              color: "#ffd6e7",
              fontWeight: 600,
            }}>
              💕 Memory {lightbox + 1} of {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
