"use client";
import { useState, useEffect, useRef } from "react";
import SplashPage from "./components/SplashPage";
import MendHeartPage from "./components/MendHeartPage";
import WishPage from "./components/WishPage";
import LetterPageNew from "./components/LetterPageNew";
import QuestionPage from "./components/QuestionPage";
import SaniyaGalleryPage from "./components/SaniyaGalleryPage";
import MemoriesAlbumPage from "./components/MemoriesAlbumPage";
import FinalPage from "./components/FinalPage";

/*
  Pages (in order):
  0 - Splash / Landing
  1 - Mend the Heart
  2 - Make a Wish
  3 - Letter (notebook style)
  4 - Question (are you ready?)
  5 - Saniya Gallery (her solo photos)
  6 - Our Memories (sonal album — fullscreen stacked)
  7 - Final celebration
*/

const TOTAL_PAGES = 8;

export default function ClientHome({ saniyaImages, sonalImages }) {
  const [page, setPage] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const audioRef = useRef(null);
  const saniya = saniyaImages || [];
  const sonal = sonalImages || [];

  const navigate = (target) => {
    setTransitioning(true);
    setTimeout(() => {
      setPage(target);
      setTransitioning(false);
      window.scrollTo(0, 0);
    }, 380);
  };

  const next = () => navigate(Math.min(page + 1, TOTAL_PAGES - 1));
  const restart = () => navigate(0);

  // Play music on page 1+ (after user interaction)
  useEffect(() => {
    if (page >= 1 && audioRef.current) {
      audioRef.current.volume = 0.35;
      audioRef.current.play().catch(() => {});
    }
  }, [page]);

  return (
    <>
      {/* Background audio */}
      <audio ref={audioRef} src="/assets/saniya.mp3" loop />

      {/* Page transition wrapper */}
      <div
        style={{
          opacity: transitioning ? 0 : 1,
          transform: transitioning ? "translateY(16px) scale(0.99)" : "translateY(0) scale(1)",
          transition: "opacity 0.35s ease, transform 0.35s ease",
        }}
      >
        {page === 0 && <SplashPage onNext={next} />}
        {page === 1 && <MendHeartPage onNext={next} />}
        {page === 2 && <WishPage onNext={next} />}
        {page === 3 && <LetterPageNew onNext={next} />}
        {page === 4 && <QuestionPage onYes={next} />}
        {page === 5 && <SaniyaGalleryPage images={saniya} onNext={next} />}
        {page === 6 && <MemoriesAlbumPage images={sonal} onNext={next} />}
        {page === 7 && <FinalPage onRestart={restart} />}
      </div>

      {/* Progress dots */}
      <div
        style={{
          position: "fixed",
          bottom: "1.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "0.45rem",
          zIndex: 100,
          alignItems: "center",
        }}
      >
        {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
          <div
            key={i}
            onClick={() => navigate(i)}
            style={{
              width: i === page ? "22px" : "8px",
              height: "8px",
              borderRadius: i === page ? "4px" : "50%",
              background: i === page
                ? "#e05278"
                : i < page
                ? "rgba(224,82,120,0.55)"
                : "rgba(224,82,120,0.2)",
              transition: "all 0.35s ease",
              cursor: "pointer",
              boxShadow: i === page ? "0 2px 10px rgba(224,82,120,0.5)" : "none",
            }}
          />
        ))}
      </div>

      {/* Music toggle */}
      {page >= 1 && (
        <button
          onClick={() => {
            if (!audioRef.current) return;
            audioRef.current.paused
              ? audioRef.current.play().catch(() => {})
              : audioRef.current.pause();
          }}
          style={{
            position: "fixed",
            bottom: "1.25rem",
            right: "1.5rem",
            zIndex: 100,
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.7)",
            border: "1.5px solid rgba(255,143,171,0.45)",
            color: "#e05278",
            fontSize: "1.1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            backdropFilter: "blur(8px)",
            boxShadow: "0 2px 12px rgba(224,82,120,0.2)",
            transition: "all 0.25s ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.1)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = ""; }}
          title="Toggle music"
        >
          🎵
        </button>
      )}
    </>
  );
}
