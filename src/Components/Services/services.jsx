import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

// ─── Fresh Plucking images ────────────────────────────────────────────────────
import FreshPlucking  from "../../assets/ServicesImg/freshplucking.webp";
import FreshPlucking1 from "../../assets/ServicesImg/freshplucking1.webp";
import FreshPlucking2 from "../../assets/ServicesImg/freshplucking2.webp";
import FreshPlucking3 from "../../assets/ServicesImg/freshplucking3.webp";

// ─── Farm Stay images ─────────────────────────────────────────────────────────
import Hotel  from "../../assets/ServicesImg/hotel.webp";
import Hotel1 from "../../assets/ServicesImg/hotel1.webp";
import Hotel2 from "../../assets/ServicesImg/hotel2.webp";
import Hotel3 from "../../assets/ServicesImg/hotel3.jpg";

// ─── Guided Farm Visit images ─────────────────────────────────────────────────
import Guided  from "../../assets/ServicesImg/guided.webp";
import Guided1 from "../../assets/ServicesImg/guided1.jpg";
import Guided2 from "../../assets/ServicesImg/guided2.webp";

// ─── Bulk Orders images ───────────────────────────────────────────────────────
import BulkOrder  from "../../assets/ServicesImg/bulkorder.webp";
import BulkOrder1 from "../../assets/ServicesImg/bulkorder1.jpg";
import BulkOrder2 from "../../assets/ServicesImg/bulkorder2.jpg";
import BulkOrder3 from "../../assets/ServicesImg/bulkorder3.jpg";

// ─── Farm-to-Table Dining images ──────────────────────────────────────────────
import Food from "../../assets/ServicesImg/food.webp";
import Food1 from "../../assets/ServicesImg/food1.jpg";
import Food2 from "../../assets/ServicesImg/food2.jpg";
import Food3 from "../../assets/ServicesImg/food3.webp";

// ─── Farmer harvesting (hero/strawberry) image ───────────────────────────────
import FarmerHarvest from "../../assets/ServicesImg/farmer-hands-harvesting-fresh-strawberries-wooden-crate-sunset-agriculture-organic_11zon.webp";

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
};

const WHATSAPP_URL = "https://wa.me/919075481074";
const PHONE_URL    = "tel:+919075481074";
const EASE_EXPO    = [0.16, 1, 0.3, 1];

// ─── Services data ────────────────────────────────────────────────────────────
const services = [
  {
    images: [FreshPlucking, FreshPlucking1, FreshPlucking2, FreshPlucking3],
    icon: "🍓",
    title: "Fresh Plucking",
    description:
      "Enjoy the joy of handpicking fresh, organic strawberries and other seasonal fruits directly from our farm. Feel the connection with nature and take home farm-fresh produce.",
    accent:      C.primaryGreen,
    accentLight: "#e6f7e5",
    accentMid:   C.limeGreen,
    tag: "Most Popular",
    featured: true,
  },
  {
    images: [Hotel, Hotel1, Hotel2, Hotel3],
    icon: "🏡",
    title: "Farm Stay",
    description:
      "Escape the hustle of city life and experience peaceful countryside living. Wake up to fresh air, enjoy scenic views, and indulge in organic meals straight from the farm.",
    accent:      C.brandDark,
    accentLight: "#e4f2ea",
    accentMid:   C.brandLight,
    tag: "Overnight",
    featured: false,
  },
  {
    images: [Guided, Guided1, Guided2],
    icon: "🧭",
    title: "Guided Farm Visit",
    description:
      "Take a guided tour and learn about organic farming, fruit cultivation, and sustainable agricultural practices. A perfect experience for families, students, and nature lovers.",
    accent:      C.mediumGreen,
    accentLight: "#edf6d9",
    accentMid:   C.limeGreen,
    tag: "Educational",
    featured: false,
  },
  {
    images: [BulkOrder, BulkOrder1, BulkOrder2, BulkOrder3],
    icon: "📦",
    title: "Bulk Orders",
    description:
      "High-quality organic fruits and vegetables in bulk for businesses, retailers, and individuals — at competitive prices with doorstep delivery options.",
    accent:      C.yellow,
    accentLight: "#fdf9e3",
    accentMid:   C.saffron,
    tag: "For Business",
    featured: false,
  },
  {
    images: [Food, Food1, Food2, Food3],
    icon: "🍽️",
    title: "Farm-to-Table Dining",
    description:
      "Savor delicious, farm-fresh meals at our on-site café. Traditional and organic dishes made from locally sourced ingredients — an authentic countryside dining experience.",
    accent:      C.darkGreen,
    accentLight: "#e4f0e4",
    accentMid:   C.brandLight,
    tag: "Dine In",
    featured: false,
  },
];

// ─── Decorative blobs ─────────────────────────────────────────────────────────
const Blobs = () => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
    <motion.div
      animate={{ scale: [1, 1.1, 1], rotate: [0, 6, 0] }}
      transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      className="absolute -top-48 -right-48 w-[600px] h-[600px] rounded-full"
      style={{ background: `radial-gradient(circle, ${C.limeGreen}66 0%, transparent 68%)`, opacity: 0.45 }}
    />
    <motion.div
      animate={{ scale: [1, 1.06, 1] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      className="absolute bottom-0 -left-40 w-[480px] h-[480px] rounded-full"
      style={{ background: `radial-gradient(circle, ${C.yellow}55 0%, transparent 70%)`, opacity: 0.4 }}
    />
    <motion.div
      animate={{ scale: [1, 1.08, 1], rotate: [0, -4, 0] }}
      transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
      style={{ background: `radial-gradient(circle, ${C.mediumGreen}33 0%, transparent 70%)`, opacity: 0.22 }}
    />
  </div>
);

// ─── Section Header ───────────────────────────────────────────────────────────
const SectionHeader = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="text-center mb-16 sm:mb-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 14 }}
        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: EASE_EXPO }}
        className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-7 border"
        style={{
          fontFamily: "'Nunito', sans-serif",
          background: `${C.limeGreen}28`,
          backdropFilter: "blur(16px)",
          borderColor: `${C.mediumGreen}35`,
          color: C.brandDark,
          boxShadow: `0 2px 16px ${C.primaryGreen}14`,
        }}
      >
        <motion.span
          aria-hidden="true"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-2 h-2 rounded-full inline-block"
          style={{ background: C.mediumGreen }}
        />
        Dhanashree Garden · What We Offer
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.85, delay: 0.1, ease: EASE_EXPO }}
        className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-5"
        style={{ fontFamily: "'Cormorant Garamond', serif", color: C.brandDark }}
      >
        Our Farm
        <br />
        <em
          className="not-italic"
          style={{
            background: `linear-gradient(135deg, ${C.primaryGreen} 0%, ${C.mediumGreen} 50%, ${C.lightGreen} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Experiences
        </em>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.28, ease: EASE_EXPO }}
        className="text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
        style={{ fontFamily: "'Nunito', sans-serif", color: "#3a5c3e" }}
      >
        From picking strawberries at sunrise to dining under open skies —
        every service is crafted to bring you closer to nature's best.
      </motion.p>

      <motion.div
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.4, ease: EASE_EXPO }}
        className="mx-auto mt-8 h-px w-24 origin-center"
        style={{ background: `linear-gradient(90deg, transparent, ${C.yellow}, transparent)` }}
      />
    </div>
  );
};

// ─── Image Carousel ───────────────────────────────────────────────────────────
const ImageCarousel = ({ images, accent, featured, tag, icon, hovered }) => {
  const [current, setCurrent]       = useState(0);
  const [paused,  setPaused]        = useState(false);
  const touchStartX                 = useRef(null);
  const timerRef                    = useRef(null);

  // ── helpers ──────────────────────────────────────────────────────────────
  const goTo = useCallback((idx) => {
    setCurrent((idx + images.length) % images.length);
  }, [images.length]);

  const prev = useCallback((e) => {
    e?.stopPropagation();
    setPaused(true);
    goTo(current - 1);
    // resume after 4 s
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setPaused(false), 4000);
  }, [current, goTo]);

  const next = useCallback((e) => {
    e?.stopPropagation();
    setPaused(true);
    goTo(current + 1);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setPaused(false), 4000);
  }, [current, goTo]);

  // ── always-on auto-play every 2.5 s ──────────────────────────────────────
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setCurrent(c => (c + 1) % images.length);
    }, 2500);
    return () => clearInterval(id);
  }, [paused, images.length]);

  // cleanup timeout on unmount
  useEffect(() => () => clearTimeout(timerRef.current), []);

  // ── touch swipe ──────────────────────────────────────────────────────────
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) {
      delta > 0 ? next(e) : prev(e);
    }
    touchStartX.current = null;
  };

  const accentText =
    accent === C.yellow || accent === C.saffron || accent === C.limeGreen
      ? C.brandDark : accent;

  return (
    <div
      className={`relative overflow-hidden flex-shrink-0 ${featured ? "h-72 sm:h-80 md:h-96" : "h-52"}`}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Images — crossfade */}
      {images.map((img, i) => (
        <motion.img
          key={i}
          src={img}
          alt=""
          aria-hidden={i !== current}
          className="absolute inset-0 w-full h-full object-cover"
          animate={{
            opacity: i === current ? 1 : 0,
            scale:   i === current && hovered ? 1.08 : 1,
          }}
          transition={{ duration: 0.6, ease: EASE_EXPO }}
        />
      ))}

      {/* Gradient overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.48) 0%, rgba(0,0,0,0.06) 60%, transparent 100%)" }}
      />

      {/* Shimmer on hover (desktop) */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            aria-hidden="true"
            initial={{ x: "-140%", opacity: 1 }}
            animate={{ x: "220%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
            className="absolute inset-0 w-1/2 skew-x-[-15deg] pointer-events-none z-20"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)" }}
          />
        )}
      </AnimatePresence>

      {/* ── Prev / Next arrows — ALWAYS visible ── */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-30
                       flex items-center justify-center rounded-full
                       transition-all duration-200 active:scale-90"
            style={{
              width: 32, height: 32,
              background: "rgba(0,0,0,0.45)",
              backdropFilter: "blur(6px)",
              border: "1px solid rgba(255,255,255,0.28)",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            onClick={next}
            aria-label="Next image"
            className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-30
                       flex items-center justify-center rounded-full
                       transition-all duration-200 active:scale-90"
            style={{
              width: 32, height: 32,
              background: "rgba(0,0,0,0.45)",
              backdropFilter: "blur(6px)",
              border: "1px solid rgba(255,255,255,0.28)",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </>
      )}

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setPaused(true); goTo(i); clearTimeout(timerRef.current); timerRef.current = setTimeout(() => setPaused(false), 4000); }}
              aria-label={`Image ${i + 1}`}
              style={{
                width: i === current ? 18 : 6,
                height: 6,
                borderRadius: 9999,
                background: i === current ? accent : "rgba(255,255,255,0.55)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "width 0.3s ease, background 0.3s ease",
              }}
            />
          ))}
        </div>
      )}

      {/* Emoji icon */}
      <motion.div
        aria-hidden="true"
        animate={{ scale: hovered ? 1.2 : 1, rotate: hovered ? [0, -8, 6, 0] : 0 }}
        transition={{ duration: 0.45 }}
        className={`absolute bottom-10 left-5 z-20 select-none drop-shadow-lg ${featured ? "text-4xl" : "text-3xl"}`}
      >
        {icon}
      </motion.div>

      {/* Tag badge */}
      <div
        className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase"
        style={{
          fontFamily: "'Nunito', sans-serif",
          background: accent === C.yellow ? C.yellow : accent === C.limeGreen ? C.limeGreen : `${accent}ee`,
          color: (accent === C.yellow || accent === C.limeGreen) ? C.brandDark : C.white,
          boxShadow: `0 3px 12px ${accent}44`,
        }}
      >
        {tag}
      </div>

      {/* Image counter pill */}
      {images.length > 1 && (
        <div
          className="absolute top-4 left-4 z-20 px-2.5 py-1 rounded-full text-[10px] font-bold"
          style={{
            fontFamily: "'Nunito', sans-serif",
            background: "rgba(0,0,0,0.38)",
            backdropFilter: "blur(8px)",
            color: "rgba(255,255,255,0.9)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          {current + 1} / {images.length}
        </div>
      )}
    </div>
  );
};

// ─── Service Card ─────────────────────────────────────────────────────────────
const ServiceCard = ({ service, index, featured = false }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [hovered, setHovered] = useState(false);

  const accentText =
    service.accent === C.yellow || service.accent === C.saffron || service.accent === C.limeGreen
      ? C.brandDark
      : service.accent;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 55, scale: 0.93 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.75, delay: index * 0.08, ease: EASE_EXPO }}
      whileHover={{ y: -10, scale: featured ? 1.01 : 1.02 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative rounded-[28px] overflow-hidden cursor-pointer flex flex-col"
      style={{
        background: C.white,
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        boxShadow: hovered
          ? `0 24px 64px rgba(0,0,0,0.1), 0 0 0 2px ${service.accent}55`
          : `0 4px 28px ${C.primaryGreen}10, 0 0 0 1px ${C.limeGreen}45`,
        transition: "box-shadow 0.35s ease",
      }}
    >
      {/* Image Carousel */}
      <ImageCarousel
        images={service.images}
        accent={service.accent}
        featured={featured}
        tag={service.tag}
        icon={service.icon}
        hovered={hovered}
      />

      {/* Content */}
      <div className={`flex flex-col flex-1 ${featured ? "p-7 sm:p-9" : "p-6"}`}>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2, ease: EASE_EXPO }}
          className="inline-flex self-start items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase mb-4"
          style={{
            fontFamily: "'Nunito', sans-serif",
            background: `${service.accent}18`,
            color: accentText,
            border: `1px solid ${service.accent}35`,
          }}
        >
          <span aria-hidden="true">✦</span>
          {service.tag}
        </motion.div>

        <motion.h3
          animate={{ color: hovered ? accentText : C.darkGreen }}
          transition={{ duration: 0.3 }}
          className={`font-bold mb-3 leading-tight ${featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"}`}
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {service.title}
        </motion.h3>

        <p
          className={`leading-relaxed flex-1 ${featured ? "text-sm sm:text-base" : "text-sm"}`}
          style={{ fontFamily: "'Nunito', sans-serif", color: "#4a6b4e" }}
        >
          {service.description}
        </p>

        <div
          className="flex items-center justify-between mt-5 pt-4 border-t"
          style={{ borderColor: `${C.limeGreen}45` }}
        >
          <motion.a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-xs font-bold tracking-wide uppercase"
            animate={{ color: hovered ? accentText : "#7a9c7e" }}
            transition={{ duration: 0.3 }}
            style={{ fontFamily: "'Nunito', sans-serif", textDecoration: "none" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Book on WhatsApp
            <motion.span
              aria-hidden="true"
              animate={{ x: hovered ? 4 : 0 }}
              transition={{ duration: 0.3, ease: EASE_EXPO }}
            >→</motion.span>
          </motion.a>

          <div aria-hidden="true" className="flex items-center gap-1">
            <motion.div
              animate={{ width: hovered ? 20 : 6, background: hovered ? service.accent : C.limeGreen + "80" }}
              transition={{ duration: 0.35, ease: EASE_EXPO }}
              className="h-1.5 rounded-full"
            />
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: C.limeGreen + "55" }} />
            <div className="w-1 h-1 rounded-full" style={{ background: C.limeGreen + "30" }} />
          </div>
        </div>
      </div>

      {/* Bottom accent bar */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[3px] rounded-full"
        style={{ background: `linear-gradient(90deg, ${service.accent}, ${service.accentMid})` }}
        animate={{ width: hovered ? "100%" : "0%" }}
        transition={{ duration: 0.45, ease: EASE_EXPO }}
      />
    </motion.div>
  );
};

// ─── CTA Strip ────────────────────────────────────────────────────────────────
const CtaStrip = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: EASE_EXPO }}
      className="relative mt-16 sm:mt-20 rounded-[32px] overflow-hidden p-10 sm:p-14 flex flex-col sm:flex-row items-center justify-between gap-8"
      style={{
        background: `linear-gradient(130deg, ${C.brandDark} 0%, ${C.primaryGreen} 55%, ${C.mediumGreen} 100%)`,
        boxShadow: `0 12px 50px ${C.brandDark}45, 0 0 0 1px ${C.mediumGreen}40`,
      }}
    >
      <div aria-hidden="true" className="absolute -right-16 -top-16 w-56 h-56 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${C.yellow}35, transparent 70%)` }} />
      <div aria-hidden="true" className="absolute -left-10 -bottom-10 w-44 h-44 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${C.limeGreen}35, transparent 70%)` }} />

      <div className="relative z-10 text-center sm:text-left">
        <motion.div
          aria-hidden="true"
          animate={{ y: [0, -8, 0], rotate: [0, 8, -4, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-5xl mb-3 select-none"
        >
          🌿
        </motion.div>
        <p className="text-[11px] font-bold tracking-[0.22em] uppercase mb-1"
          style={{ fontFamily: "'Nunito', sans-serif", color: C.limeGreen }}>
          Ready for an experience?
        </p>
        <h3 className="text-2xl sm:text-3xl font-bold mb-2"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: C.white }}>
          Book Your Farm Experience Today
        </h3>
        <p className="text-sm max-w-sm"
          style={{ fontFamily: "'Nunito', sans-serif", color: "rgba(255,255,255,0.72)" }}>
          Whether you're coming for a day or staying overnight — we'll make it unforgettable.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 relative z-10 flex-shrink-0 w-full sm:w-auto">
        <motion.a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.06, boxShadow: `0 14px 40px ${C.yellow}55` }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center justify-center gap-2 px-9 py-4 rounded-2xl text-sm font-bold w-full sm:w-auto"
          style={{
            fontFamily: "'Nunito', sans-serif",
            background: C.yellow,
            color: C.brandDark,
            boxShadow: `0 6px 22px ${C.yellow}44`,
            textDecoration: "none",
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={C.brandDark} aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Book Now →
        </motion.a>
        <motion.a
          href={PHONE_URL}
          whileHover={{ scale: 1.05, boxShadow: `0 12px 32px ${C.white}25` }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center justify-center gap-2 px-9 py-4 rounded-2xl text-sm font-bold border w-full sm:w-auto"
          style={{
            fontFamily: "'Nunito', sans-serif",
            background: "rgba(255,255,255,0.12)",
            backdropFilter: "blur(12px)",
            borderColor: "rgba(255,255,255,0.3)",
            color: C.white,
            textDecoration: "none",
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/>
          </svg>
          Contact Us
        </motion.a>
      </div>
    </motion.div>
  );
};

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function Services() {
  const featuredService   = services[0];
  const remainingServices = services.slice(1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Nunito:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
      `}</style>

      <section
        className="relative min-h-screen w-full overflow-hidden"
        style={{
          background: `linear-gradient(150deg, #f2fae8 0%, #eef7df 30%, #f8fde8 65%, #f0f9e0 100%)`,
          fontFamily: "'Nunito', sans-serif",
        }}
      >
        <Blobs />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, ${C.lightGreen}55 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
            opacity: 0.18,
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 py-16 sm:py-24">
          <SectionHeader />

          <div className="mb-6">
            <ServiceCard service={featuredService} index={0} featured={true} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {remainingServices.map((s, i) => (
              <ServiceCard key={s.title} service={s} index={i + 1} featured={false} />
            ))}
          </div>

          <CtaStrip />
        </div>
      </section>
    </>
  );
}