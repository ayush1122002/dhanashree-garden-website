import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

import FarmVideo from "../../assets/FarmVideo.mp4";
import img1  from "../../assets/Gallary/img1.webp";
import img2  from "../../assets/Gallary/img2.webp";
import img3  from "../../assets/Gallary/img3.webp";
import img4  from "../../assets/Gallary/img4.webp";
import img5  from "../../assets/Gallary/img5.webp";
import img6  from "../../assets/Gallary/img6.webp";
import img7  from "../../assets/Gallary/img7.webp";
import img8  from "../../assets/Gallary/img8.webp";
import img9  from "../../assets/Gallary/img9.webp";
import img10 from "../../assets/Gallary/img10.webp";
import img11 from "../../assets/Gallary/img11.webp";
import img12 from "../../assets/Gallary/img12.webp";
import img13 from "../../assets/Gallary/img13.webp";
import img14 from "../../assets/Gallary/img14.webp";
import img15 from "../../assets/Gallary/img15.webp";
import img16 from "../../assets/Gallary/img16.webp";
import img17 from "../../assets/Gallary/img17.webp";
import img18 from "../../assets/Gallary/img18.webp";
import img19 from "../../assets/Gallary/img19.webp";
import img20 from "../../assets/Gallary/img20.webp";
import img21 from "../../assets/Gallary/img21.webp";
import img22 from "../../assets/Gallary/img22.webp";
import img23 from "../../assets/Gallary/img23.webp";
import img24 from "../../assets/Gallary/img24.webp";

// ─── Brand Palette ────────────────────────────────────────────────────────────
const C = {
  primaryGreen: "#0E7909",
  mediumGreen:  "#5FA800",
  lightGreen:   "#A1CB00",
  limeGreen:    "#C7E259",
  darkGreen:    "#1F6B1F",
  brandDark:    "#136936",
  brandLight:   "#94BE3F",
  yellow:       "#F2C91D",
  saffron:      "#F4C430",
  white:        "#FFFFFF",
  bgFrom:       "#f2fae8",
  bgMid:        "#eef7df",
  bgTo:         "#f0f9e0",
  textMuted:    "#4a6b4e",
};

const EASE_EXPO = [0.16, 1, 0.3, 1];

const ALL_IMAGES = [
  img1,  img2,  img3,  img4,  img5,  img6,
  img7,  img8,  img9,  img10, img11, img12,
  img13, img14, img15, img16, img17, img18,
  img19, img20, img21, img22, img23, img24,
];

const CAPTIONS = [
  "Golden hour harvest", "Rows of red", "Morning dew", "Farmer's hands",
  "The yield", "Sunlit fields", "Fresh picked", "Earth & sky",
  "Organic beds", "Sweet season", "Countryside calm", "Berry time",
  "Living soil", "Garden paths", "Bloom & fruit", "Twilight farm",
  "Canopy light", "Abundant rows", "Green season", "Dhanashree life",
  "From the earth", "Hand-picked care", "Nature's best", "Farm fresh",
];

const ROTATIONS = [
  -1.2,  1.5, -0.8,  2.1, -1.7,  0.9,
  -2.0,  1.3, -0.5,  1.8, -1.4,  2.3,
  -0.7,  1.1, -1.9,  0.6, -2.2,  1.4,
  -0.4,  2.0, -1.6,  0.8, -1.1,  1.7,
];

// ─── Scroll lock ──────────────────────────────────────────────────────────────
let _lockCount = 0;
const lockScroll   = () => { if (++_lockCount === 1) document.body.style.overflow = "hidden"; };
const unlockScroll = () => { _lockCount = Math.max(0, _lockCount - 1); if (_lockCount === 0) document.body.style.overflow = ""; };

// ─── Blobs ────────────────────────────────────────────────────────────────────
const Blobs = () => (
  <div aria-hidden="true" style={{ pointerEvents: "none", position: "absolute", inset: 0, overflow: "hidden" }}>
    <motion.div
      animate={{ scale: [1, 1.1, 1], rotate: [0, 6, 0] }}
      transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      style={{
        position: "absolute", top: -192, right: -192,
        width: 600, height: 600, borderRadius: "50%",
        background: `radial-gradient(circle, ${C.limeGreen}66 0%, transparent 68%)`, opacity: 0.45,
      }}
    />
    <motion.div
      animate={{ scale: [1, 1.06, 1] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      style={{
        position: "absolute", bottom: 0, left: -160,
        width: 480, height: 480, borderRadius: "50%",
        background: `radial-gradient(circle, ${C.yellow}55 0%, transparent 70%)`, opacity: 0.4,
      }}
    />
    <motion.div
      animate={{ scale: [1, 1.08, 1], rotate: [0, -4, 0] }}
      transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        width: 400, height: 400, borderRadius: "50%",
        background: `radial-gradient(circle, ${C.mediumGreen}33 0%, transparent 70%)`, opacity: 0.22,
      }}
    />
  </div>
);

// ─── Section Header ───────────────────────────────────────────────────────────
const SectionHeader = ({ isInView }) => (
  <div style={{ textAlign: "center", marginBottom: 64, position: "relative", zIndex: 2 }}>
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 14 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: EASE_EXPO }}
      style={{
        display: "inline-flex", alignItems: "center", gap: 10,
        padding: "8px 20px", borderRadius: 50, marginBottom: 28,
        fontFamily: "'Nunito', sans-serif",
        fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase",
        color: C.brandDark,
        background: `${C.limeGreen}28`,
        backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
        border: `1px solid ${C.mediumGreen}35`,
        boxShadow: `0 2px 16px ${C.primaryGreen}14`,
      }}
    >
      <motion.span
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        aria-hidden="true"
        style={{ width: 8, height: 8, borderRadius: "50%", background: C.mediumGreen, display: "inline-block" }}
      />
      Dhanashree Garden · Farm Life in Focus
    </motion.div>

    <motion.h2
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay: 0.1, ease: EASE_EXPO }}
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "clamp(2.6rem, 6vw, 4.5rem)",
        fontWeight: 700, lineHeight: 1.1,
        color: C.brandDark, margin: "0 0 16px",
      }}
    >
      The Farm in{" "}
      <em style={{
        fontStyle: "normal",
        background: `linear-gradient(135deg, ${C.primaryGreen} 0%, ${C.mediumGreen} 50%, ${C.lightGreen} 100%)`,
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
      }}>
        Every Frame
      </em>
    </motion.h2>

    <motion.div
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
      aria-hidden="true"
      style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: 12 }}
    >
      <div style={{ height: 1.5, width: 64, background: `linear-gradient(90deg, transparent, ${C.yellow}, transparent)`, borderRadius: 2 }} />
      <span style={{ fontSize: 18 }}>🌿</span>
      <div style={{ height: 1.5, width: 64, background: `linear-gradient(90deg, transparent, ${C.yellow}, transparent)`, borderRadius: 2 }} />
    </motion.div>

    <motion.p
      initial={{ opacity: 0, y: 14 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.28, ease: EASE_EXPO }}
      style={{ fontFamily: "'Nunito', sans-serif", fontSize: 15, color: C.textMuted, margin: 0 }}
    >
      Strawberry fields, open skies, and memories worth keeping — captured from Mahabaleshwar.
    </motion.p>
  </div>
);

// ─── Stats strip ──────────────────────────────────────────────────────────────
const StatsStrip = ({ isInView }) => {
  const stats = [
    { num: "100+", label: "Photographs" },
    { num: "5★",   label: "Experiences" },
    { num: "5★",   label: "Guest Rating" },
    { num: "∞",    label: "Memories"     },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: 0.15, ease: EASE_EXPO }}
      style={{
        display: "grid", gridTemplateColumns: "repeat(4,1fr)",
        marginBottom: 52, position: "relative", zIndex: 2,
        borderRadius: 20, overflow: "hidden",
        border: `1px solid ${C.limeGreen}60`,
        boxShadow: `0 4px 24px ${C.primaryGreen}10`,
      }}
    >
      {stats.map((s, i) => (
        <div key={i} style={{
          padding: "22px 12px", textAlign: "center",
          background: i % 2 === 0 ? `${C.limeGreen}18` : C.white,
          borderRight: i < 3 ? `1px solid ${C.limeGreen}50` : "none",
        }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 30, fontWeight: 700, color: C.brandDark, lineHeight: 1,
          }}>{s.num}</div>
          <div style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: 11, color: C.textMuted, marginTop: 5,
            letterSpacing: "0.06em", fontWeight: 600,
          }}>{s.label}</div>
        </div>
      ))}
    </motion.div>
  );
};

// ─── Featured Video ───────────────────────────────────────────────────────────
const FeaturedVideo = ({ isInView }) => (
  <motion.div
    initial={{ opacity: 0, y: 40, scale: 0.96 }}
    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
    transition={{ duration: 0.85, ease: EASE_EXPO }}
    style={{
      position: "relative", borderRadius: 28, overflow: "hidden",
      border: `1.5px solid ${C.limeGreen}55`,
      boxShadow: `0 12px 48px ${C.primaryGreen}18, 0 0 0 1px ${C.limeGreen}40`,
      background: C.white, marginBottom: 56, zIndex: 2,
    }}
  >
    <div style={{
      position: "absolute", top: 16, left: 16, zIndex: 5,
      display: "inline-flex", alignItems: "center", gap: 8,
      padding: "6px 16px", borderRadius: 50,
      background: C.yellow, color: C.brandDark,
      fontFamily: "'Nunito', sans-serif",
      fontSize: 11, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase",
      boxShadow: `0 4px 16px ${C.yellow}66`,
    }}>
      ▶  Farm Tour
    </div>

    <video
      controls muted playsInline preload="none" poster={img1}
      aria-label="Dhanashree Garden farm tour video"
      style={{ width: "100%", maxHeight: 480, objectFit: "cover", display: "block" }}
    >
      <source src={FarmVideo} type="video/mp4" />
    </video>

    <div style={{
      padding: "14px 22px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      borderTop: `1px solid ${C.limeGreen}45`,
      background: `${C.limeGreen}12`,
    }}>
      <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: C.textMuted, fontWeight: 500 }}>
        🎬 A day at Dhanashree Garden, Mahabaleshwar
      </span>
    </div>
  </motion.div>
);

// ─── Polaroid photo card ──────────────────────────────────────────────────────
const PhotoCard = ({ src, index, onClick, isInView }) => {
  const [hovered, setHovered] = useState(false);
  const rot = ROTATIONS[index % ROTATIONS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: rot - 3 }}
      animate={isInView ? { opacity: 1, y: 0, rotate: rot } : {}}
      transition={{ duration: 0.7, delay: (index % 8) * 0.06, ease: EASE_EXPO }}
      whileHover={{ rotate: 0, scale: 1.05, zIndex: 10 }}
      onClick={onClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        flexShrink: 0, cursor: "pointer", position: "relative",
        background: C.white, padding: "10px 10px 36px", borderRadius: 4,
        boxShadow: hovered
          ? `0 24px 56px ${C.primaryGreen}30, 0 0 0 2px ${C.mediumGreen}55`
          : `0 6px 24px ${C.primaryGreen}15, 0 0 0 1px ${C.limeGreen}50`,
        transition: "box-shadow 0.35s ease", userSelect: "none",
      }}
    >
      <div style={{ width: 200, height: 150, overflow: "hidden", borderRadius: 2, background: `${C.limeGreen}30` }}>
        <motion.img
          src={src} alt={`Farm photo ${index + 1}`} loading="lazy"
          animate={{ scale: hovered ? 1.12 : 1 }}
          transition={{ duration: 0.6, ease: EASE_EXPO }}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>

      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: 36, display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ fontFamily: "'Caveat', cursive", fontSize: 12, color: C.brandDark, letterSpacing: "0.04em" }}>
          {CAPTIONS[index % CAPTIONS.length]}
        </span>
      </div>

      <AnimatePresence>
        {hovered && (
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              position: "absolute", inset: 0, borderRadius: 4, pointerEvents: "none",
              background: `linear-gradient(135deg, ${C.limeGreen}22 0%, transparent 60%)`,
            }}
          />
        )}
      </AnimatePresence>

      <div style={{
        position: "absolute", top: 14, right: 14,
        fontFamily: "'Nunito', sans-serif", fontSize: 9, fontWeight: 700,
        color: `${C.brandDark}55`, letterSpacing: "0.1em",
      }}>
        #{String(index + 1).padStart(2, "0")}
      </div>
    </motion.div>
  );
};

// ─── Film perforation strip ───────────────────────────────────────────────────
const FilmPerforations = () => (
  <div aria-hidden="true" style={{
    position: "absolute", top: 0, left: 0, right: 0, height: 18,
    background: `${C.limeGreen}30`, borderBottom: `1px solid ${C.limeGreen}60`,
    display: "flex", alignItems: "center", gap: 16, paddingLeft: 10,
    zIndex: 3, overflow: "hidden",
  }}>
    {Array.from({ length: 48 }).map((_, i) => (
      <div key={i} style={{
        flexShrink: 0, width: 10, height: 8,
        background: C.white, border: `1px solid ${C.limeGreen}80`, borderRadius: 2,
      }} />
    ))}
  </div>
);

// ─── Scrollable filmstrip row ─────────────────────────────────────────────────
const FilmStrip = ({ photos, startIndex, onOpen, isInView, label, autoDir = 1 }) => {
  const stripRef    = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart   = useRef({ x: 0, scroll: 0 });
  const touchStart  = useRef(0);
  const touchScroll = useRef(0);

  const onMouseDown  = (e) => { setIsDragging(true); dragStart.current = { x: e.clientX, scroll: stripRef.current.scrollLeft }; };
  const onMouseMove  = (e) => { if (!isDragging) return; stripRef.current.scrollLeft = dragStart.current.scroll - (e.clientX - dragStart.current.x); };
  const onMouseUp    = () => setIsDragging(false);
  const onTouchStart = (e) => { touchStart.current = e.touches[0].clientX; touchScroll.current = stripRef.current.scrollLeft; };
  const onTouchMove  = (e) => { stripRef.current.scrollLeft = touchScroll.current - (e.touches[0].clientX - touchStart.current); };

  useEffect(() => {
    let animId;
    const speed = 0.55 * autoDir;
    const tick = () => {
      if (!stripRef.current || isDragging) { animId = requestAnimationFrame(tick); return; }
      const el = stripRef.current;
      el.scrollLeft += speed;
      if (autoDir > 0 && el.scrollLeft >= el.scrollWidth - el.clientWidth - 1) el.scrollLeft = 0;
      if (autoDir < 0 && el.scrollLeft <= 1) el.scrollLeft = el.scrollWidth - el.clientWidth;
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [isDragging, autoDir]);

  return (
    <div style={{ marginBottom: 0, position: "relative", zIndex: 2 }}>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: EASE_EXPO }}
        style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, paddingLeft: 4 }}
      >
        <span style={{
          fontFamily: "'Nunito', sans-serif", fontSize: 11, fontWeight: 800,
          letterSpacing: "0.22em", textTransform: "uppercase", color: C.brandDark, opacity: 0.75,
        }}>{label}</span>
        <div style={{ flex: 1, height: 1.5, background: `linear-gradient(90deg, ${C.limeGreen}80, transparent)` }} />
        <span style={{
          fontFamily: "'Nunito', sans-serif", fontSize: 9, color: C.textMuted,
          opacity: 0.55, letterSpacing: "0.1em", fontWeight: 600,
        }}>← drag to explore →</span>
      </motion.div>

      <div style={{ position: "relative" }}>
        <FilmPerforations />
        <div
          ref={stripRef}
          onMouseDown={onMouseDown} onMouseMove={onMouseMove}
          onMouseUp={onMouseUp} onMouseLeave={onMouseUp}
          onTouchStart={onTouchStart} onTouchMove={onTouchMove}
          style={{
            display: "flex", gap: 20,
            overflowX: "auto", overflowY: "visible",
            padding: "22px 24px 32px",
            cursor: isDragging ? "grabbing" : "grab",
            scrollbarWidth: "none", msOverflowStyle: "none", userSelect: "none",
          }}
        >
          {[...photos, ...photos].map((src, i) => (
            <PhotoCard
              key={`${src}-${i}`} src={src}
              index={(startIndex + (i % photos.length)) % ALL_IMAGES.length}
              onClick={() => onOpen(startIndex + (i % photos.length))}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Lightbox — FIXED: onSelect prop added, thumbnails now navigate ───────────
const Lightbox = ({ index, onClose, onPrev, onNext, onSelect }) => {
  const src      = ALL_IMAGES[index];
  const total    = ALL_IMAGES.length;
  const progress = ((index + 1) / total) * 100;
  const touchRef = useRef(null);

  const onTouchStart = (e) => { touchRef.current = e.touches[0].clientX; };
  const onTouchEnd   = (e) => {
    if (touchRef.current === null) return;
    const dx = touchRef.current - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 50) dx > 0 ? onNext() : onPrev();
    touchRef.current = null;
  };

  const navBtn = {
    background: `${C.white}f0`,
    border: `1px solid ${C.limeGreen}70`,
    color: C.brandDark, cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    backdropFilter: "blur(10px)",
  };

  return (
    <motion.div
      role="dialog" aria-modal="true" aria-label={`Photo ${index + 1} of ${total}`}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.28 }}
      onClick={onClose}
      onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}
      style={{
        position: "fixed", inset: 0, zIndex: 2000,
        background: "rgba(10, 32, 14, 0.93)",
        backdropFilter: "blur(20px)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      }}
    >
      {/* Progress bar */}
      <div style={{
        position: "fixed", top: 0, left: 0, height: 3,
        width: `${progress}%`,
        background: `linear-gradient(90deg, ${C.yellow}, ${C.mediumGreen})`,
        zIndex: 11, transition: "width 0.3s ease",
        boxShadow: `0 0 8px ${C.yellow}88`,
      }} />

      {/* Top bar */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, padding: "16px 24px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          zIndex: 10, background: "linear-gradient(to bottom, rgba(10,32,14,0.95), transparent)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            fontFamily: "'Nunito', sans-serif", fontSize: 11, fontWeight: 700,
            color: C.brandDark, letterSpacing: "0.12em",
            background: `${C.limeGreen}ee`, padding: "4px 14px", borderRadius: 20,
            border: `1px solid ${C.limeGreen}`,
          }}>
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </div>
          <span style={{ fontFamily: "'Caveat', cursive", fontSize: 17, color: C.yellow, letterSpacing: "0.04em" }}>
            {CAPTIONS[index % CAPTIONS.length]}
          </span>
        </div>
        <motion.button
          whileHover={{ rotate: 90, scale: 1.1, background: C.yellow, color: C.brandDark }}
          whileTap={{ scale: 0.92 }}
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          aria-label="Close"
          style={{ ...navBtn, width: 40, height: 40, borderRadius: 12, fontSize: 16 }}
        >✕</motion.button>
      </div>

      {/* Prev */}
      <motion.button
        whileHover={{ x: -3, scale: 1.08 }} whileTap={{ scale: 0.92 }}
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous"
        style={{ ...navBtn, position: "fixed", left: 14, top: "50%", transform: "translateY(-50%)", zIndex: 10, width: 46, height: 78, borderRadius: 12, fontSize: 24 }}
      >‹</motion.button>

      {/* Polaroid frame */}
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.38, ease: [0.34, 1.2, 0.64, 1] }}
        onClick={e => e.stopPropagation()}
        style={{
          position: "relative", background: C.white,
          padding: "12px 12px 52px", borderRadius: 4,
          boxShadow: `0 40px 100px rgba(0,0,0,0.6), 0 0 0 2px ${C.limeGreen}60`,
          maxWidth: "min(90vw, 800px)",
        }}
      >
        <img
          src={src} alt={`Farm scene ${index + 1}`}
          style={{ display: "block", maxWidth: "min(85vw, 780px)", maxHeight: "70vh", objectFit: "contain", borderRadius: 2 }}
        />
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 52,
          display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
        }}>
          <span style={{ fontFamily: "'Caveat', cursive", fontSize: 17, color: C.brandDark, letterSpacing: "0.04em" }}>
            {CAPTIONS[index % CAPTIONS.length]}
          </span>
          <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: 10, fontWeight: 600, color: `${C.brandDark}55`, letterSpacing: "0.06em" }}>
            Dhanashree Garden
          </span>
        </div>
      </motion.div>

      {/* Next */}
      <motion.button
        whileHover={{ x: 3, scale: 1.08 }} whileTap={{ scale: 0.92 }}
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next"
        style={{ ...navBtn, position: "fixed", right: 14, top: "50%", transform: "translateY(-50%)", zIndex: 10, width: 46, height: 78, borderRadius: 12, fontSize: 24 }}
      >›</motion.button>

      {/* Thumbnail strip — FIXED: onClick now calls onSelect(i) to navigate */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: "fixed", bottom: 0, left: 0, right: 0,
          background: "linear-gradient(to top, rgba(10,32,14,0.98), transparent)",
          padding: "24px 16px 14px",
          display: "flex", justifyContent: "center", overflowX: "auto", gap: 6, zIndex: 10,
          scrollbarWidth: "none",
        }}
      >
        {ALL_IMAGES.map((thumb, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.15, y: -4 }}
            onClick={(e) => { e.stopPropagation(); onSelect(i); }}
            style={{
              flexShrink: 0, width: i === index ? 52 : 36, height: i === index ? 40 : 28,
              padding: 0, border: "none", cursor: "pointer", borderRadius: 3, overflow: "hidden",
              outline: i === index ? `2.5px solid ${C.yellow}` : `1px solid ${C.limeGreen}55`,
              outlineOffset: i === index ? 2 : 0, opacity: i === index ? 1 : 0.5,
              transition: "all 0.25s ease", background: "none",
            }}
          >
            <img src={thumb} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const sectionRef = useRef(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-80px" });

  const openImage   = useCallback((i) => { setLightboxIndex(i); lockScroll(); }, []);
  const closeImage  = useCallback(() => { setLightboxIndex(null); unlockScroll(); }, []);
  const goPrev      = useCallback(() => setLightboxIndex(p => (p - 1 + ALL_IMAGES.length) % ALL_IMAGES.length), []);
  const goNext      = useCallback(() => setLightboxIndex(p => (p + 1) % ALL_IMAGES.length), []);
  const selectImage = useCallback((i) => setLightboxIndex(i), []);

  useEffect(() => {
    const handler = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape")     closeImage();
      if (e.key === "ArrowLeft")  goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, closeImage, goPrev, goNext]);

  useEffect(() => () => { if (lightboxIndex !== null) unlockScroll(); }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Nunito:wght@400;500;600;700;800&family=Caveat:wght@400;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      <section
        ref={sectionRef}
        style={{
          position: "relative", width: "100%", overflow: "hidden",
          background: `linear-gradient(150deg, ${C.bgFrom} 0%, ${C.bgMid} 30%, #f8fde8 65%, ${C.bgTo} 100%)`,
          padding: "90px 0 100px",
          fontFamily: "'Nunito', sans-serif", minHeight: "100vh",
        }}
      >
        <Blobs />

        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `radial-gradient(circle, ${C.lightGreen}55 1px, transparent 1px)`,
          backgroundSize: "30px 30px", opacity: 0.18, zIndex: 0,
        }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <SectionHeader isInView={isInView} />
          <StatsStrip    isInView={isInView} />
          <FeaturedVideo isInView={isInView} />
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", marginBottom: 36 }}>
            <FilmStrip photos={ALL_IMAGES.slice(0, 12)}  startIndex={0}  onOpen={openImage} isInView={isInView} label="Series I — The Fields"  autoDir={1}  />
          </div>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
            <FilmStrip photos={ALL_IMAGES.slice(12, 24)} startIndex={12} onOpen={openImage} isInView={isInView} label="Series II — Farm Life" autoDir={-1} />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 1, delay: 0.5 }}
          style={{
            position: "relative", zIndex: 1, maxWidth: 1280, margin: "52px auto 0",
            padding: "24px 24px 0",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            borderTop: `1px solid ${C.limeGreen}60`,
          }}
        >
          <span style={{
            fontFamily: "'Nunito', sans-serif", fontSize: 11, fontWeight: 800,
            letterSpacing: "0.22em", textTransform: "uppercase", color: C.brandDark, opacity: 0.55,
          }}>Dhanashree Garden · Mahabaleshwar</span>
          <span style={{
            fontFamily: "'Nunito', sans-serif", fontSize: 10, fontWeight: 600,
            color: C.textMuted, opacity: 0.4, letterSpacing: "0.1em",
          }}>© All rights reserved</span>
        </motion.div>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            index={lightboxIndex}
            onClose={closeImage}
            onPrev={goPrev}
            onNext={goNext}
            onSelect={selectImage}
          />
        )}
      </AnimatePresence>
    </>
  );
}