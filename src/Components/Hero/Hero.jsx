import React, { useRef, useEffect, useCallback } from "react";
import {
  motion, useInView, useScroll, useTransform,
  useSpring, AnimatePresence, useMotionValueEvent,
} from "framer-motion";
import Farmvideo from "../../assets/FarmVideo.mp4";

import farmImage1 from "../../assets/farm1.jpg";
import farmImage2 from "../../assets/farm2.webp";
import farmImage3 from "../../assets/farm3.webp";
import farmImage4 from "../../assets/farm4.webp";
import farmImage5 from "../../assets/farm5.webp";

// useState is still needed for wordIdx, videoLoaded, scrolled
import { useState } from "react";

const EASE_EXPO = [0.16, 1, 0.3, 1];

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
};

const WHATSAPP_URL = "https://wa.me/919075481074";
const PHONE_URL    = "tel:+919075481074";
const WORDS        = ["Organic.", "Fresh.", "Seasonal.", "Pure."];
const STAT_PILLS   = [
  { label: "Since 1969"          },
  { label: "300+ Daily Visitors" },
  { label: "100% Organic"        },
  { label: "Open Farm Visits"    },
];

const CHAPTERS = [
  {
    id: "farm", navLabel: "The Farm",
    tag: "About the Farm",
    heading: "About Our\nStrawberry Farm",
    body: "Our strawberry farm is developed with care, keeping soil health and seasonal farming in mind. Strawberries are grown using traditional methods that support natural growth and freshness. Visitors can walk through the farm, observe the plants closely, and learn about the strawberry cultivation process — making it an ideal place for anyone interested in agriculture, nature, and local produce.",
    accent: C.brandDark,
    image: farmImage1,
    imageAlt: "Strawberry farm overview at Dhanashree Garden",
    tags: ["Soil Health", "Traditional Methods", "Farm Walks", "Local Produce"],
    icon: "",
  },
  {
    id: "picking", navLabel: "Picking",
    tag: "Seasonal Activity",
    heading: "Strawberry\nPicking Experience",
    body: "Strawberry picking in Mahabaleshwar is a seasonal activity that allows visitors to connect directly with the farm. During the harvest season, guests can experience strawberry plucking and understand how ripe strawberries are selected. This activity is especially enjoyed by families, children, and first-time farm visitors who want a hands-on experience with nature.",
    accent: C.primaryGreen,
    image: farmImage2,
    imageAlt: "Visitors picking strawberries at the farm",
    tags: ["Seasonal Harvest", "Hands-On Picking", "Family Friendly", "Nature Connect"],
    icon: "",
  },
  {
    id: "families", navLabel: "For Families",
    tag: "For Everyone",
    heading: "Peaceful Farm\nExperience",
    body: "A visit to a strawberry farm near Panchgani offers a refreshing break from busy travel schedules. The open farm space, fresh air, and scenic surroundings make it suitable for family outings, small groups, and photography enthusiasts. The farm atmosphere encourages slow travel, allowing visitors to spend quality time while learning about local farming culture.",
    accent: C.mediumGreen,
    image: farmImage3,
    imageAlt: "Families enjoying the farm at Dhanashree Garden",
    tags: ["Family Outings", "Fresh Air", "Photography", "Slow Travel"],
    icon: "",
  },
  {
    id: "nature", navLabel: "Nature & Views",
    tag: "Farm Views",
    heading: "Natural\nSurroundings",
    body: "The farm is surrounded by natural greenery and open landscapes, making it a pleasant location for photography and relaxation. Many visitors enjoy capturing moments among strawberry plants, especially during the growing and harvesting season. The calm environment adds to the overall strawberry farm experience in Mahabaleshwar.",
    accent: C.darkGreen,
    image: farmImage4,
    imageAlt: "Natural greenery and open landscapes at the farm",
    tags: ["Greenery", "Open Landscapes", "Plant Portraits", "Serene Views"],
    icon: "",
  },
  {
    id: "importance", navLabel: "Why It Matters",
    tag: "Why It Matters",
    heading: "Mahabaleshwar's\nStrawberry Legacy",
    body: "Strawberry farming plays a significant role in Mahabaleshwar's agricultural identity. The region's climate supports high-quality strawberry growth, making it one of the most well-known strawberry-producing areas in Maharashtra. Visiting a strawberry farm helps people understand local farming practices and supports sustainable agriculture awareness.",
    accent: C.brandLight,
    image: farmImage5,
    imageAlt: "Strawberry farming landscape in Mahabaleshwar",
    tags: ["Regional Identity", "Climate Advantage", "Sustainable Farming", "Maharashtra Heritage"],
    icon: "",
  },
];

// ─── Hero ─────────────────────────────────────────────────────────────────────
const HeroSection = ({ onExplore }) => {
  const heroRef = useRef(null);
  const [wordIdx, setWordIdx] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const rawScale   = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentY   = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -60]),
    { stiffness: 80, damping: 20 }
  );

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 80));

  useEffect(() => {
    const t = setInterval(() => setWordIdx((p) => (p + 1) % WORDS.length), 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <div ref={heroRef} className="relative w-full overflow-hidden" style={{ height: "100svh", minHeight: 580 }}>

      {/* ── Video background ── */}
      <motion.div className="absolute inset-0" style={{ scale: rawScale }}>
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay loop muted playsInline
          onLoadedData={() => setVideoLoaded(true)}
        >
          <source src={Farmvideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0" aria-hidden="true"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.6) 100%)" }} />
        <div className="absolute inset-0" aria-hidden="true"
          style={{ background: "linear-gradient(100deg, rgba(19,105,54,0.6) 0%, transparent 60%)" }} />
        <motion.div className="absolute inset-0 bg-black" aria-hidden="true"
          initial={{ opacity: 1 }}
          animate={{ opacity: videoLoaded ? 0 : 1 }}
          transition={{ duration: 1.2 }} />
      </motion.div>

      {/* ── Hero content ── */}
      <motion.div
        style={{ y: contentY, opacity: rawOpacity }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-8 z-10"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.75, ease: EASE_EXPO, delay: 0.2 }}
          className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-8 border"
          style={{ fontFamily: "'Nunito', sans-serif", background: "rgba(255,255,255,0.12)", backdropFilter: "blur(16px)", borderColor: "rgba(255,255,255,0.25)", color: C.limeGreen }}
        >
          <motion.span
            aria-hidden="true"
            animate={{ scale: [1, 1.6, 1], opacity: [1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-2 h-2 rounded-full inline-block"
            style={{ background: C.limeGreen }}
          />
          Dhanashree Garden · Mahabaleshwar
        </motion.div>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE_EXPO, delay: 0.35 }}
          className="font-bold leading-[1.04] text-white mb-3 tracking-tight"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.6rem, 7vw, 5.5rem)", textShadow: "0 4px 32px rgba(0,0,0,0.4)" }}
        >
          Best Strawberry Farm
          <br />
          <span style={{ color: C.limeGreen }}>in Mahabaleshwar</span>
        </motion.h1>

        {/* Rotating word */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: EASE_EXPO }}
          className="flex items-center justify-center gap-3 mb-6"
          style={{ height: 44 }}
        >
          <div aria-hidden="true" className="h-px w-10 bg-white/30 rounded-full" />
          <AnimatePresence mode="wait">
            <motion.span
              key={wordIdx}
              initial={{ y: 30, opacity: 0, filter: "blur(8px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: -22, opacity: 0, filter: "blur(6px)" }}
              transition={{ duration: 0.48, ease: EASE_EXPO }}
              className="text-2xl sm:text-3xl font-bold"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: C.yellow, textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}
            >
              {WORDS[wordIdx]}
            </motion.span>
          </AnimatePresence>
          <div aria-hidden="true" className="h-px w-10 bg-white/30 rounded-full" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.65, ease: EASE_EXPO }}
          className="text-white/75 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-10"
          style={{ fontFamily: "'Nunito', sans-serif", textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}
        >
          Experience naturally grown strawberries in a peaceful farm environment.
          Visit Dhanashree Garden and enjoy the freshness of farm life.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: EASE_EXPO }}
        >
          <motion.button
            onClick={onExplore}
            whileHover={{ scale: 1.06, boxShadow: `0 14px 40px ${C.yellow}55` }}
            whileTap={{ scale: 0.96 }}
            className="px-9 py-4 rounded-2xl text-sm font-bold cursor-pointer"
            style={{ fontFamily: "'Nunito', sans-serif", background: C.yellow, color: C.brandDark, boxShadow: `0 6px 22px ${C.yellow}44`, border: "none" }}
          >
            Explore Farm ↓
          </motion.button>
        </motion.div>

        {/* Stat pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1, ease: EASE_EXPO }}
          className="flex flex-wrap items-center justify-center gap-3 mt-10"
        >
          {STAT_PILLS.map((pill, i) => (
            <motion.div
              key={pill.label}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 1.1 + i * 0.07, ease: EASE_EXPO }}
              className="px-4 py-1.5 rounded-full text-xs font-bold"
              style={{ fontFamily: "'Nunito', sans-serif", background: "rgba(255,255,255,0.12)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.9)" }}
            >
              {pill.label}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <AnimatePresence>
        {!scrolled && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
            aria-hidden="true"
          >
            <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/50"
              style={{ fontFamily: "'Nunito', sans-serif" }}>
              Scroll to explore
            </p>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-5 h-8 rounded-full border-2 border-white/30 flex items-start justify-center pt-1.5"
            >
              <div className="w-1 h-2 rounded-full bg-white/60" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Bottom fade ── */}
      <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(242,250,232,0.95))" }} />
    </div>
  );
};

// ─── Full-Bleed Chapter Panel ─────────────────────────────────────────────────
const ChapterPanel = ({ chapter, index, onVisible }) => {
  const ref    = useRef(null);
  const navRef = useRef(null);

  const enterView  = useInView(ref,    { once: true,  margin: "-80px" });
  const activeView = useInView(navRef, { once: false, margin: "-40% 0px -40% 0px" });

  // ✅ BUG #2 FIXED: all deps included, no eslint-disable needed
  useEffect(() => {
    if (activeView) onVisible(chapter.id);
  }, [activeView, onVisible, chapter.id]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const imgTranslateY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const isOdd = index % 2 !== 0;
  const tagColor = chapter.accent === C.limeGreen || chapter.accent === C.brandLight
    ? C.brandDark
    : chapter.accent;

  return (
    <div
      id={`chapter-${chapter.id}`}
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ minHeight: "100svh", display: "flex", alignItems: "stretch" }}
    >
      {/* Invisible nav-tracking sentinel */}
      <div ref={navRef} className="absolute inset-0 pointer-events-none" aria-hidden="true" />

      <div className={`flex flex-col ${isOdd ? "lg:flex-row-reverse" : "lg:flex-row"} w-full`}>

        {/* ══ IMAGE HALF ══════════════════════════════════════════════════════ */}
        <div className="relative w-full lg:w-1/2 overflow-hidden" style={{ minHeight: "50vh" }}>

          {/* ✅ BUG #4 FIXED: scale moved to motion.div so it composes with translateY */}
          <motion.div
            className="absolute inset-0"
            style={{ translateY: imgTranslateY, scale: 1.1 }}
          >
            {/* Colour fallback behind the image */}
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(145deg, ${chapter.accent}cc 0%, ${chapter.accent}77 100%)` }}
            />
            {/* scale removed from img — now on parent motion.div */}
            <img
              src={chapter.image}
              alt={chapter.imageAlt}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
          </motion.div>

          {/* Subtle dark vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.12) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.18) 100%)" }}
          />

          {/* Floating icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={enterView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4, ease: EASE_EXPO }}
            className="absolute top-8 left-8 text-4xl sm:text-5xl select-none z-10"
            aria-hidden="true"
          >
            {chapter.icon}
          </motion.div>

          {/* Tag pill on image */}
          <motion.div
            initial={{ opacity: 0, x: isOdd ? 20 : -20 }}
            animate={enterView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5, ease: EASE_EXPO }}
            className="absolute bottom-8 left-8 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase z-10"
            style={{ fontFamily: "'Nunito', sans-serif", background: "rgba(0,0,0,0.35)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.25)", color: C.white }}
          >
            {chapter.tag}
          </motion.div>
        </div>

        {/* ══ TEXT HALF ═══════════════════════════════════════════════════════ */}
        <div
          className="relative w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-20 py-16 lg:py-20"
          style={{ background: "linear-gradient(150deg, #f2fae8 0%, #eaf6dc 100%)" }}
        >
          {/* Dot grid texture */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: `radial-gradient(circle, ${C.lightGreen}44 1px, transparent 1px)`, backgroundSize: "28px 28px", opacity: 0.18 }}
          />

          <div className="relative z-10 max-w-lg">

            {/* Chapter indicator row */}
            <motion.div
              initial={{ opacity: 0, x: isOdd ? 24 : -24 }}
              animate={enterView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE_EXPO }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-px w-10 rounded-full flex-shrink-0" style={{ background: chapter.accent }} />
              <span className="text-[11px] font-bold tracking-[0.22em] uppercase"
                style={{ fontFamily: "'Nunito', sans-serif", color: chapter.accent }}>
                {chapter.tag}
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              animate={enterView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.1, ease: EASE_EXPO }}
              className="font-bold leading-[1.05] mb-7"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.4rem, 5vw, 4rem)", color: C.brandDark, whiteSpace: "pre-line" }}
            >
              {chapter.heading}
            </motion.h2>

            {/* Yellow bar */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={enterView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.28, ease: EASE_EXPO }}
              className="h-1 w-14 rounded-full mb-7 origin-left"
              style={{ background: C.yellow }}
            />

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={enterView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.22, ease: EASE_EXPO }}
              className="leading-[1.85] mb-10"
              style={{ fontFamily: "'Nunito', sans-serif", fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)", color: "#3a5c3e" }}
            >
              {chapter.body}
            </motion.p>

            {/* Keyword pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={enterView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.38, ease: EASE_EXPO }}
              className="flex flex-wrap gap-2"
            >
              {chapter.tags.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={enterView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.42 + i * 0.06, ease: EASE_EXPO }}
                  className="px-4 py-1.5 rounded-full text-xs font-bold"
                  style={{ fontFamily: "'Nunito', sans-serif", background: `${chapter.accent}16`, color: tagColor, border: `1px solid ${chapter.accent}30` }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Left accent bar */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={enterView ? { scaleY: 1 } : {}}
        transition={{ duration: 1.2, ease: EASE_EXPO }}
        className="absolute left-0 top-0 w-1 h-full origin-top hidden lg:block"
        style={{ background: `linear-gradient(to bottom, ${chapter.accent}, transparent)` }}
      />
    </div>
  );
};

// ─── Bottom CTA ───────────────────────────────────────────────────────────────
const BottomCTA = () => {
  const ref      = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      className="px-4 sm:px-6 lg:px-10 xl:px-16 py-16 sm:py-24"
      style={{
        background: `linear-gradient(150deg, #f2fae8 0%, #eef7df 30%, #f8fde8 65%, #f0f9e0 100%)`,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.85, ease: EASE_EXPO }}
        className="relative max-w-7xl mx-auto rounded-[32px] overflow-hidden p-10 sm:p-14 flex flex-col sm:flex-row items-center justify-between gap-8"
        style={{
          background: `linear-gradient(130deg, ${C.brandDark} 0%, ${C.primaryGreen} 55%, ${C.mediumGreen} 100%)`,
          boxShadow: `0 12px 50px ${C.brandDark}45, 0 0 0 1px ${C.mediumGreen}40`,
        }}
      >
        {/* Decorative blobs */}
        <div aria-hidden="true" className="absolute -right-16 -top-16 w-56 h-56 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${C.yellow}35, transparent 70%)` }} />
        <div aria-hidden="true" className="absolute -left-10 -bottom-10 w-44 h-44 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${C.limeGreen}35, transparent 70%)` }} />

        {/* Left text */}
        <div className="relative z-10 text-center sm:text-left">
          <motion.div
            aria-hidden="true"
            animate={{ y: [0, -8, 0], rotate: [0, 8, -4, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-5xl mb-3 select-none"
          >
            🍓
          </motion.div>
          <p className="text-[11px] font-bold tracking-[0.22em] uppercase mb-1"
            style={{ fontFamily: "'Nunito', sans-serif", color: C.limeGreen }}>
            Plan Your Visit
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold mb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: C.white }}>
            Come Taste the Farm.{" "}
            <em style={{ fontStyle: "italic", color: C.limeGreen }}>Mahabaleshwar Awaits.</em>
          </h3>
          <p className="text-sm max-w-sm"
            style={{ fontFamily: "'Nunito', sans-serif", color: "rgba(255,255,255,0.72)" }}>
            Experience the magic of Mahabaleshwar's finest organic strawberry farm.
            Open daily during harvest season.
          </p>
        </div>

        {/* Right buttons */}
        <div className="flex flex-col sm:flex-row gap-3 relative z-10 flex-shrink-0 w-full sm:w-auto">
          <motion.a
            href={WHATSAPP_URL} target="_blank" rel="noreferrer"
            whileHover={{ scale: 1.06, boxShadow: `0 14px 40px ${C.yellow}55` }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2 px-9 py-4 rounded-2xl text-sm font-bold w-full sm:w-auto"
            style={{ fontFamily: "'Nunito', sans-serif", background: C.yellow, color: C.brandDark, boxShadow: `0 6px 22px ${C.yellow}44`, textDecoration: "none" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={C.brandDark} aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Book a Visit →
          </motion.a>

          <motion.a
            href={PHONE_URL}
            whileHover={{ scale: 1.05, boxShadow: `0 12px 32px ${C.white}25` }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2 px-9 py-4 rounded-2xl text-sm font-bold border w-full sm:w-auto"
            style={{ fontFamily: "'Nunito', sans-serif", background: "rgba(255,255,255,0.12)", backdropFilter: "blur(12px)", borderColor: "rgba(255,255,255,0.3)", color: C.white, textDecoration: "none" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/>
            </svg>
            Contact Us
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
};

// ─── Root Export ──────────────────────────────────────────────────────────────
const HeroPage = () => {
  const discoverRef = useRef(null);

  const scrollToDiscover = () =>
    discoverRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  // ✅ BUG #3 FIXED: removed unused activeId state, replaced with stable no-op
  const handleVisible = useCallback(() => {}, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Nunito:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
      `}</style>

      <HeroSection onExplore={scrollToDiscover} />

      <div ref={discoverRef}>
        {CHAPTERS.map((chapter, i) => (
          <ChapterPanel
            key={chapter.id}
            chapter={chapter}
            index={i}
            onVisible={handleVisible}
          />
        ))}
        <BottomCTA />
      </div>
    </>
  );
};

export default HeroPage;