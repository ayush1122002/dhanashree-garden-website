import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

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

// ─── Easing ───────────────────────────────────────────────────────────────────
const EASE_EXPO = [0.16, 1, 0.3, 1];

// ─── Constants ────────────────────────────────────────────────────────────────
const GOOGLE_REVIEW_URL = "https://maps.google.com/?q=Dhanashree+Garden+Strawberry+Picking+Farm+Mahabaleshwar";
const WHATSAPP_NUMBER   = "919075481074";

// ─── Testimonials data — accents from brand palette ───────────────────────────
const testimonials = [
  {
    id: 1,
    name: "Kailas Malgam",
    initials: "KM",
    rating: 5,
    date: "2 years ago",
    color: C.primaryGreen,
    text: "Absolutely delighted with my visits to Dhanashree Garden Strawberry Farm! Among all the strawberry farms in the area, Dhanashree Garden stands out as the largest and most incredible spot for strawberry picking. The berries are reasonably priced, and the farm's commitment to organic farming extends to a variety of vegetables. Kudos to Mr. Aniruddha Dhanawade for maintaining an efficient and customer-friendly system. I'll definitely be recommending this beautiful place to friends and relatives!",
    highlight: "Largest & most incredible spot",
  },
  {
    id: 2,
    name: "Devang Chokshi",
    initials: "DC",
    rating: 5,
    date: "2 months ago",
    color: C.brandDark,
    text: "This is the best place for the best tasting Strawberries. We bought a lot of really great Organic Strawberries from here. Really different taste than others available. Thanks to Anil and Amruta — they were really kind and helpful. They also allow Strawberry picking if one is interested. A must visit place in Mahabaleshwar.",
    highlight: "Best tasting strawberries",
  },
  {
    id: 3,
    name: "Gyana S",
    initials: "GS",
    rating: 5,
    date: "1 year ago",
    color: C.mediumGreen,
    text: "I had visited Dhanashree Garden with my friends and family. It was one of our best experiences in the Panchgani trip. The farm has not only strawberries but also varieties of different fruits and exotic vegetables. We were just overwhelmed by seeing this well-maintained farm. We plucked strawberries which was a great experience. The family who maintains the farm are very friendly and responsive. I would definitely recommend if you are planning to visit Panchgani / Mahabaleshwar.",
    highlight: "One of our best experiences",
  },
  {
    id: 4,
    name: "Vishal Phadtare",
    initials: "VP",
    rating: 5,
    date: "3 years ago",
    color: C.yellow,
    text: "Taste of strawberry is very yummy — best part is you can directly pluck from the farm. In normal market you don't get this big, sweet and juicy strawberries! You can also buy organic strawberries, mulberry, gooseberry and raspberry at reasonable rates. I would like to thank the owner Aniruddha who was with us while exploring the farm and provided us with required knowledge about all the plantation.",
    highlight: "Big, sweet and juicy strawberries",
  },
  {
    id: 5,
    name: "Amit Kalbande",
    initials: "AK",
    rating: 5,
    date: "3 years ago",
    color: C.darkGreen,
    text: "Awesome place. We experienced plucking of fresh Strawberries, Cape Gooseberries and Mulberries from the farm. My children were delighted with the activity which they don't get to experience in Cities like Pune. Aniruddha, the farm owner, was very friendly and cooperative. I wish Aniruddha and his farm all the best!",
    highlight: "Kids absolutely delighted",
  },
  {
    id: 6,
    name: "sanskruti Physio",
    initials: "SP",
    rating: 5,
    date: "1 month ago",
    color: C.brandLight,
    text: "I would recommend this place for Food as well as Strawberries! Plucking fresh fruits taste like awesome and the food menu was also good. Both Veg and Non-veg options available. A wonderful all-round experience at the farm.",
    highlight: "Great food & fresh fruit picking",
  },
  {
    id: 7,
    name: "Sahil Pawar",
    initials: "SP",
    rating: 5,
    date: "3 years ago",
    color: C.primaryGreen,
    text: "Dhanashree Garden Strawberry Farm gave me a wonderful first experience! I am so glad that my friend suggested this place to me. The owner Aniruddha and his family were polite, sweet and made me feel very welcome. They have nice strawberries, reasonable prices, and good people!",
    highlight: "Wonderful first experience",
  },
  {
    id: 8,
    name: "Sanket Shelar",
    initials: "SS",
    rating: 5,
    date: "3 years ago",
    color: C.mediumGreen,
    text: "Loved the strawberry ice-cream, strawberry milkshake and strawberry with cream — much better than other places. They have a wonderful strawberry garden and sell strawberries as well. Location is also good and easy to access as it is on the road.",
    highlight: "Best strawberry treats around",
  },
  {
    id: 9,
    name: "Shubham Yadav",
    initials: "SY",
    rating: 5,
    date: "3 years ago",
    color: C.saffron,
    text: "Beautiful and a worth-it place to visit in Mahabaleshwar! Dhanashree Garden not only provides strawberries but also fresh vegetables like cabbage, cauliflower, broccoli, zucchini, and more. Will surely suggest my friends to visit Dhanashree Garden Strawberry Farm Mahabaleshwar.",
    highlight: "Beautiful & worth every visit",
  },
  {
    id: 10,
    name: "Aniket Deshpande",
    initials: "AD",
    rating: 5,
    date: "2 weeks ago",
    color: C.darkGreen,
    text: "Wonderful experience! Suggest all to experience strawberry picking at Dhanashree Garden!",
    highlight: "Wonderful experience",
  },
];

// helper — yellow/lime need dark text
const safeText = (color) =>
  color === C.yellow || color === C.saffron || color === C.limeGreen || color === C.brandLight
    ? C.brandDark
    : color;

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
      animate={{ scale: [1, 1.07, 1] }}
      transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      className="absolute -bottom-32 -left-32 w-[480px] h-[480px] rounded-full"
      style={{ background: `radial-gradient(circle, ${C.yellow}55 0%, transparent 70%)`, opacity: 0.38 }}
    />
    <motion.div
      animate={{ scale: [1, 1.06, 1], rotate: [0, -5, 0] }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      className="absolute top-1/2 left-1/4 w-[380px] h-[380px] rounded-full"
      style={{ background: `radial-gradient(circle, ${C.mediumGreen}33 0%, transparent 70%)`, opacity: 0.22 }}
    />
  </div>
);

// ─── Star Rating ──────────────────────────────────────────────────────────────
const Stars = ({ rating }) => (
  <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: i * 0.06, duration: 0.3, ease: EASE_EXPO }}
        style={{ color: i < rating ? C.yellow : "#d1d5db", fontSize: 14 }}
      >★</motion.span>
    ))}
  </div>
);

// ─── Avatar ───────────────────────────────────────────────────────────────────
const Avatar = ({ initials, color, size = "md" }) => {
  const sz = size === "lg" ? "w-16 h-16 text-xl" : "w-12 h-12 text-sm";
  return (
    <div
      className={`${sz} rounded-2xl flex items-center justify-center font-bold flex-shrink-0 select-none`}
      style={{
        background: `linear-gradient(135deg, ${color}, ${color}bb)`,
        boxShadow: `0 4px 16px ${color}44`,
        fontFamily: "'Nunito', sans-serif",
        color: safeText(color) === C.brandDark ? C.brandDark : C.white,
      }}
    >
      {initials}
    </div>
  );
};

// ─── Testimonial Card ─────────────────────────────────────────────────────────
const TestimonialCard = ({ testimonial, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [expanded, setExpanded] = useState(false);

  const isLong = testimonial.text.length > 180;
  const displayText = isLong && !expanded ? testimonial.text.slice(0, 180) + "..." : testimonial.text;
  const textColor = safeText(testimonial.color);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: EASE_EXPO }}
      whileHover={{ y: -6, transition: { duration: 0.3, ease: EASE_EXPO } }}
      className="relative flex flex-col rounded-[28px] overflow-hidden"
      style={{
        background: C.white,
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        boxShadow: `0 4px 32px ${C.primaryGreen}10, 0 0 0 1px ${C.limeGreen}40`,
      }}
    >
      {/* Top color bar */}
      <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${testimonial.color}, ${testimonial.color}44)` }} />

      <div className="flex flex-col flex-1 p-6 sm:p-7">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <Avatar initials={testimonial.initials} color={testimonial.color} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold truncate" style={{ fontFamily: "'Nunito', sans-serif", color: C.darkGreen }}>
              {testimonial.name}
            </p>
            <p className="text-[11px] font-semibold mt-0.5" style={{ fontFamily: "'Nunito', sans-serif", color: "#7a9c7e" }}>
              {testimonial.date}
            </p>
            <div className="mt-1"><Stars rating={testimonial.rating} /></div>
          </div>
          {/* Google badge */}
          <div
            className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ background: "rgba(66,133,244,0.08)", color: "#4285f4", border: "1px solid rgba(66,133,244,0.15)", fontFamily: "sans-serif" }}
            aria-label="Google review"
          >G</div>
        </div>

        {/* Highlight pill */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2, ease: EASE_EXPO }}
          className="inline-flex self-start items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase mb-4"
          style={{
            fontFamily: "'Nunito', sans-serif",
            background: `${testimonial.color}18`,
            color: textColor,
            border: `1px solid ${testimonial.color}30`,
          }}
        >
          <span aria-hidden="true">✦</span>
          {testimonial.highlight}
        </motion.div>

        {/* Quote mark */}
        <div aria-hidden="true" className="text-5xl font-bold leading-none mb-1 select-none"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: `${C.yellow}55`, lineHeight: 1 }}>
          "
        </div>

        <p className="text-sm leading-relaxed flex-1" style={{ fontFamily: "'Nunito', sans-serif", color: "#4a6b4e" }}>
          {displayText}
        </p>

        {isLong && (
          <button
            onClick={() => setExpanded(p => !p)}
            className="mt-2 text-xs font-bold self-start"
            style={{ fontFamily: "'Nunito', sans-serif", color: textColor }}
          >
            {expanded ? "Show less ↑" : "Read more ↓"}
          </button>
        )}

        {/* Dot trail */}
        <div className="flex items-center gap-1.5 mt-5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: C.yellow }} />
          <div className="w-12 h-px" style={{ background: `${C.mediumGreen}55` }} />
          <div className="w-2 h-2 rounded-full" style={{ background: `${C.limeGreen}88` }} />
          <div className="w-6 h-px" style={{ background: `${C.limeGreen}33` }} />
        </div>
      </div>

      {/* Bottom hover bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-[3px] rounded-full"
        style={{ background: `linear-gradient(90deg, ${testimonial.color}, ${testimonial.color}55)` }}
        initial={{ width: "0%" }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.45, ease: EASE_EXPO }}
      />
    </motion.div>
  );
};

// ─── Featured Card ────────────────────────────────────────────────────────────
const FeaturedCard = ({ testimonial }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const textColor = safeText(testimonial.color);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.96 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.9, ease: EASE_EXPO }}
      className="relative rounded-[32px] overflow-hidden p-8 sm:p-12 mb-6"
      style={{
        background: `linear-gradient(135deg, ${testimonial.color}14 0%, ${testimonial.color}07 100%)`,
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        boxShadow: `0 8px 48px ${testimonial.color}1a, 0 0 0 1.5px ${testimonial.color}28`,
      }}
    >
      <div aria-hidden="true" className="absolute -bottom-6 -right-4 text-[10rem] font-bold leading-none pointer-events-none select-none"
        style={{ fontFamily: "'Cormorant Garamond', serif", color: `${C.yellow}18` }}>★</div>

      <div className="relative z-10 flex flex-col sm:flex-row gap-8 items-start">
        <div className="flex flex-col items-center gap-3 flex-shrink-0">
          <Avatar initials={testimonial.initials} color={testimonial.color} size="lg" />
          <Stars rating={testimonial.rating} />
          <div
            className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase"
            style={{
              fontFamily: "'Nunito', sans-serif",
              background: `${C.yellow}28`,
              color: C.brandDark,
              border: `1px solid ${C.yellow}55`,
            }}
          >⭐ Top Review</div>
        </div>
        <div className="flex-1">
          <div aria-hidden="true" className="text-7xl font-bold leading-none mb-2 select-none"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: `${C.yellow}44`, lineHeight: 0.8 }}>"</div>
          <p className="text-base sm:text-lg leading-relaxed mb-6" style={{ fontFamily: "'Nunito', sans-serif", color: "#3a5c3e" }}>
            {testimonial.text}
          </p>
          <div>
            <p className="text-base font-bold" style={{ fontFamily: "'Cormorant Garamond', serif", color: C.brandDark }}>
              {testimonial.name}
            </p>
            <p className="text-xs font-semibold mt-0.5" style={{ fontFamily: "'Nunito', sans-serif", color: "#7a9c7e" }}>
              Google Review · {testimonial.date}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Stats Bar ────────────────────────────────────────────────────────────────
const StatsBar = ({ isInView }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.7, delay: 0.3, ease: EASE_EXPO }}
    className="flex flex-wrap justify-center gap-4 mb-16"
  >
    {[
      { value: "4.8★", label: "Google Rating",   icon: "⭐", color: C.yellow      },
      { value: "10000+", label: "Happy Visitors",   icon: "😊", color: C.primaryGreen },
      { value: "5★",   label: "Avg. Review",      icon: "🏆", color: C.mediumGreen  },
      { value: "Pan‑India", label: "Visitors From", icon: "🌍", color: C.brandDark   },
    ].map((s, i) => (
      <motion.div
        key={s.label}
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: 0.35 + i * 0.08, ease: EASE_EXPO }}
        whileHover={{ y: -5, scale: 1.05, transition: { duration: 0.25 } }}
        className="flex flex-col items-center gap-1.5 px-6 py-4 rounded-2xl border cursor-default"
        style={{
          background: C.white,
          backdropFilter: "blur(20px)",
          borderColor: `${C.limeGreen}50`,
          boxShadow: `0 4px 20px ${C.primaryGreen}0d`,
        }}
      >
        <span className="text-xl">{s.icon}</span>
        <span className="text-2xl font-bold" style={{ fontFamily: "'Cormorant Garamond', serif", color: safeText(s.color) === C.brandDark ? C.brandDark : s.color }}>
          {s.value}
        </span>
        <span className="text-[10px] font-bold tracking-widest uppercase" style={{ fontFamily: "'Nunito', sans-serif", color: "#6b8f6e" }}>
          {s.label}
        </span>
      </motion.div>
    ))}
  </motion.div>
);

// ─── Section Header ───────────────────────────────────────────────────────────
const SectionHeader = ({ isInView }) => (
  <div className="text-center mb-14">
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
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        aria-hidden="true"
        className="w-2 h-2 rounded-full inline-block"
        style={{ background: C.mediumGreen }}
      />
      Google Reviews · Verified Visitors
    </motion.div>

    <motion.h2
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay: 0.1, ease: EASE_EXPO }}
      className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-4"
      style={{ fontFamily: "'Cormorant Garamond', serif", color: C.brandDark }}
    >
      What Visitors{" "}
      <em className="not-italic" style={{
        background: `linear-gradient(135deg, ${C.primaryGreen} 0%, ${C.mediumGreen} 50%, ${C.lightGreen} 100%)`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}>Are Saying</em>
    </motion.h2>

    <motion.p
      initial={{ opacity: 0, y: 18 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.28, ease: EASE_EXPO }}
      className="text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
      style={{ fontFamily: "'Nunito', sans-serif", color: "#3a5c3e" }}
    >
      Real experiences from real visitors — straight from our Google Business page.
    </motion.p>

    <motion.div
      initial={{ scaleX: 0 }}
      animate={isInView ? { scaleX: 1 } : {}}
      transition={{ duration: 0.9, delay: 0.4, ease: EASE_EXPO }}
      className="mx-auto mt-7 h-px w-24 origin-center"
      style={{ background: `linear-gradient(90deg, transparent, ${C.yellow}, transparent)` }}
    />
  </div>
);

// ─── Interactive Star Picker ───────────────────────────────────────────────────
const StarPicker = ({ value, hover, onHover, onLeave, onSelect }) => (
  <div className="flex items-center justify-center gap-2">
    {[1, 2, 3, 4, 5].map((star) => {
      const filled = star <= (hover || value);
      return (
        <motion.button
          key={star}
          onClick={() => onSelect(star)}
          onMouseEnter={() => onHover(star)}
          onMouseLeave={onLeave}
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.18, ease: EASE_EXPO }}
          className="text-4xl sm:text-5xl focus:outline-none cursor-pointer"
          style={{
            color: filled ? C.yellow : "#d1d5db",
            filter: filled ? `drop-shadow(0 2px 6px ${C.yellow}88)` : "none",
          }}
          aria-label={`${star} star${star > 1 ? "s" : ""}`}
        >★</motion.button>
      );
    })}
  </div>
);

// ─── Review Funnel ────────────────────────────────────────────────────────────
const ReviewFunnel = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const [step, setStep]         = useState("idle");
  const [selected, setSelected] = useState(0);
  const [hovered, setHovered]   = useState(0);
  const [name, setName]         = useState("");
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const STAR_LABELS = ["", "Poor", "Below Average", "Average", "Good", "Excellent"];

  const handleSelect = (star) => {
    setSelected(star);
    setTimeout(() => setStep(star >= 4 ? "high" : "low"), 320);
  };

  const handleSend = async () => {
    if (!feedback.trim()) return;
    setSubmitting(true);
    const msg = `🌿 *Private Feedback — Dhanashree Garden*\n\n⭐ Rating: ${selected}/5\n👤 Name: ${name || "Anonymous"}\n💬 Feedback:\n${feedback}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
    setTimeout(() => { setSubmitting(false); setStep("sent"); }, 600);
  };

  const reset = () => {
    setStep("idle"); setSelected(0); setHovered(0); setName(""); setFeedback("");
  };

  const inputStyle = {
    fontFamily: "'Nunito', sans-serif",
    background: "rgba(255,255,255,0.85)",
    borderColor: `${C.mediumGreen}30`,
    color: C.darkGreen,
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: EASE_EXPO }}
      className="relative mt-16 overflow-hidden rounded-[32px]"
      style={{
        background: `linear-gradient(135deg, ${C.brandDark} 0%, ${C.primaryGreen} 55%, ${C.mediumGreen} 100%)`,
        boxShadow: `0 14px 56px ${C.brandDark}45, 0 0 0 1px ${C.mediumGreen}40`,
      }}
    >
      {/* BG decorations */}
      <div aria-hidden="true" className="absolute -right-16 -top-16 w-56 h-56 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${C.yellow}30, transparent 70%)` }} />
      <div aria-hidden="true" className="absolute -left-10 -bottom-10 w-44 h-44 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${C.limeGreen}30, transparent 70%)` }} />

      <div className="relative z-10 p-8 sm:p-14">
        <AnimatePresence mode="wait">

          {/* ── idle ── */}
          {step === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: EASE_EXPO }}
              className="text-center"
            >
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 8, -5, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="text-5xl mb-5 select-none"
                aria-hidden="true"
              >🍓</motion.div>

              <h2 className="text-3xl sm:text-4xl font-bold mb-2"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: C.white }}>
                How Was Your Visit?
              </h2>
              <p className="text-base max-w-sm mx-auto leading-relaxed mb-8"
                style={{ fontFamily: "'Nunito', sans-serif", color: "rgba(255,255,255,0.75)" }}>
                Tap a star to share your experience at Dhanashree Garden.
              </p>

              <StarPicker
                value={selected} hover={hovered}
                onHover={setHovered} onLeave={() => setHovered(0)}
                onSelect={handleSelect}
              />

              <AnimatePresence>
                {(hovered || selected) > 0 && (
                  <motion.p
                    key={hovered || selected}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-4 text-sm font-bold"
                    style={{
                      fontFamily: "'Nunito', sans-serif",
                      color: (hovered || selected) >= 4 ? C.limeGreen : C.saffron,
                    }}
                  >
                    {STAR_LABELS[hovered || selected]}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* ── high — redirect to Google ── */}
          {step === "high" && (
            <motion.div
              key="high"
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: EASE_EXPO }}
              className="text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 12, -8, 0] }}
                transition={{ duration: 0.6, ease: EASE_EXPO }}
                className="text-5xl mb-4 select-none"
              >🎉</motion.div>

              <h2 className="text-3xl sm:text-4xl font-bold mb-2"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: C.white }}>
                You gave us {selected} star{selected > 1 ? "s" : ""}!
              </h2>
              <p className="text-base max-w-sm mx-auto leading-relaxed mb-3"
                style={{ fontFamily: "'Nunito', sans-serif", color: "rgba(255,255,255,0.75)" }}>
                That means the world to us 🙏 Would you mind sharing your experience on Google so others can discover Dhanashree Garden?
              </p>

              <div className="flex justify-center gap-1 mb-8">
                {[1,2,3,4,5].map(s => (
                  <span key={s} className="text-3xl" style={{ color: s <= selected ? C.yellow : "rgba(255,255,255,0.25)" }}>★</span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <motion.a
                  href={GOOGLE_REVIEW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.06, boxShadow: `0 16px 44px ${C.yellow}55` }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-sm font-bold w-full sm:w-auto"
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    background: C.yellow,
                    color: C.brandDark,
                    boxShadow: `0 6px 24px ${C.yellow}44`,
                    textDecoration: "none",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill={C.brandDark} aria-hidden="true">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Write a Google Review
                </motion.a>
                <motion.button
                  onClick={reset}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 rounded-2xl text-sm font-bold border w-full sm:w-auto"
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    background: "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(12px)",
                    borderColor: "rgba(255,255,255,0.3)",
                    color: C.white,
                  }}
                >
                  Maybe Later
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ── low — private feedback ── */}
          {step === "low" && (
            <motion.div
              key="low"
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: EASE_EXPO }}
              className="max-w-lg mx-auto"
            >
              <div className="text-center mb-7">
                <div className="text-4xl mb-3 select-none">🙏</div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: C.white }}>
                  We're sorry to hear that
                </h2>
                <p className="text-sm leading-relaxed"
                  style={{ fontFamily: "'Nunito', sans-serif", color: "rgba(255,255,255,0.72)" }}>
                  Your feedback helps us improve. Please share what went wrong — we'll reach out personally.
                </p>
                <div className="flex justify-center gap-1 mt-3">
                  {[1,2,3,4,5].map(s => (
                    <span key={s} className="text-xl" style={{ color: s <= selected ? C.yellow : "rgba(255,255,255,0.2)" }}>★</span>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase mb-1.5"
                    style={{ fontFamily: "'Nunito', sans-serif", color: C.limeGreen }}>
                    Your Name <span style={{ color: "rgba(255,255,255,0.45)", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Ravi Sharma"
                    className="w-full px-4 py-3 rounded-2xl text-sm outline-none border transition-all duration-200"
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = C.limeGreen}
                    onBlur={e => e.target.style.borderColor = `${C.mediumGreen}30`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase mb-1.5"
                    style={{ fontFamily: "'Nunito', sans-serif", color: C.limeGreen }}>
                    What could we improve? <span style={{ color: C.saffron }}>*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={feedback}
                    onChange={e => setFeedback(e.target.value)}
                    placeholder="Tell us what happened and how we can do better..."
                    className="w-full px-4 py-3 rounded-2xl text-sm outline-none border transition-all duration-200 resize-none"
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = C.limeGreen}
                    onBlur={e => e.target.style.borderColor = `${C.mediumGreen}30`}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                  <motion.button
                    onClick={handleSend}
                    disabled={!feedback.trim() || submitting}
                    whileHover={feedback.trim() ? { scale: 1.04 } : {}}
                    whileTap={feedback.trim() ? { scale: 0.97 } : {}}
                    className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-sm font-bold w-full sm:w-auto"
                    style={{
                      fontFamily: "'Nunito', sans-serif",
                      background: feedback.trim() ? C.yellow : `${C.yellow}55`,
                      color: C.brandDark,
                      boxShadow: feedback.trim() ? `0 6px 24px ${C.yellow}44` : "none",
                      cursor: feedback.trim() ? "pointer" : "not-allowed",
                      transition: "all 0.25s",
                    }}
                  >
                    {submitting ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                          className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                        />
                        Sending…
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={C.brandDark} aria-hidden="true">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        Send Feedback via WhatsApp
                      </>
                    )}
                  </motion.button>
                  <motion.button
                    onClick={reset}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-6 py-4 rounded-2xl text-sm font-bold border w-full sm:w-auto"
                    style={{
                      fontFamily: "'Nunito', sans-serif",
                      background: "rgba(255,255,255,0.1)",
                      backdropFilter: "blur(12px)",
                      borderColor: "rgba(255,255,255,0.3)",
                      color: C.white,
                    }}
                  >← Back</motion.button>
                </div>

                <p className="text-[11px] text-center" style={{ fontFamily: "'Nunito', sans-serif", color: "rgba(255,255,255,0.45)" }}>
                  Your feedback is sent privately to the farm owner — it will not be published.
                </p>
              </div>
            </motion.div>
          )}

          {/* ── sent — thank you ── */}
          {step === "sent" && (
            <motion.div
              key="sent"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: EASE_EXPO }}
              className="text-center py-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.3, 1] }}
                transition={{ duration: 0.6, ease: EASE_EXPO }}
                className="text-6xl mb-5 select-none"
              >✅</motion.div>

              <h2 className="text-3xl sm:text-4xl font-bold mb-3"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: C.white }}>
                Thank You!
              </h2>
              <p className="text-base max-w-sm mx-auto leading-relaxed mb-8"
                style={{ fontFamily: "'Nunito', sans-serif", color: "rgba(255,255,255,0.75)" }}>
                Your feedback has been sent privately to our team. We truly appreciate you taking the time — we'll work on making things better.
              </p>
              <motion.button
                onClick={reset}
                whileHover={{ scale: 1.05, boxShadow: `0 8px 28px ${C.yellow}44` }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3.5 rounded-2xl text-sm font-bold"
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  background: C.yellow,
                  color: C.brandDark,
                }}
              >
                Rate Again
              </motion.button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// ─── Root Component ───────────────────────────────────────────────────────────
const WrittenTestimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const featured = testimonials[0];
  const rest = testimonials.slice(1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Nunito:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
      `}</style>

      <section
        ref={ref}
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
          <SectionHeader isInView={isInView} />
          <StatsBar isInView={isInView} />
          <FeaturedCard testimonial={featured} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((t, i) => (
              <TestimonialCard key={t.id} testimonial={t} index={i} />
            ))}
          </div>

          <ReviewFunnel />
        </div>
      </section>
    </>
  );
};

export default WrittenTestimonials;