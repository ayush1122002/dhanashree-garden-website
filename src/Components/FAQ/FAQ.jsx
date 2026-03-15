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

const EASE_EXPO = [0.16, 1, 0.3, 1];

// ─── FAQ data ─────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "Where is Dhanashree Garden Strawberry Farm located?",
    a: "We are located at Lingmala, Panchgani-Mahabaleshwar Rd, near Courtyard by Marriott, Mahabaleshwar, MH 412806. Easy to find with parking available on site.",
    accent:      C.primaryGreen,
    accentLight: "#e6f7e5",
    icon: "📍",
  },
  {
    q: "When is the farm open?",
    a: "We are open daily from 9:00 AM to 6:00 PM. Hours may vary during peak season — we recommend calling ahead to confirm.",
    accent:      C.yellow,
    accentLight: "#fdf9e3",
    icon: "🕘",
  },
  {
    q: "Is the farm open year-round?",
    a: "Strawberry season typically runs from November to May. We recommend calling ahead before visiting outside of peak season to check availability.",
    accent:      C.mediumGreen,
    accentLight: "#edf6d9",
    icon: "🌱",
  },
  {
    q: "Can I pick my own strawberries?",
    a: "Yes! We offer a fresh pick-your-own experience. Bring your family and enjoy plucking ripe strawberries directly from the farm — a truly hands-on nature experience.",
    accent:      C.brandDark,
    accentLight: "#e4f2ea",
    icon: "🍓",
  },
  {
    q: "How much does it cost to visit?",
    a: "Prices may vary by season. Contact us for the latest rates.",
    accent:      C.darkGreen,
    accentLight: "#e4f0e4",
    icon: "💰",
  },
  {
    q: "Do I need to book in advance?",
    a: "Walk-ins are always welcome! However, we recommend calling ahead during weekends and public holidays to avoid long wait times.",
    accent:      C.lightGreen,
    accentLight: "#f0f9d9",
    icon: "📅",
  },
  {
    q: "Are pets allowed on the farm?",
    a: "We kindly ask that pets be left at home to ensure a clean and safe environment for all visitors and our produce.",
    accent:      C.saffron,
    accentLight: "#fdf8e3",
    icon: "🐾",
  },
  {
    q: "Do you offer bulk or wholesale orders?",
    a: "Yes, we accept bulk orders for events, restaurants, and retailers at competitive prices. Contact us directly for custom pricing and delivery options.",
    accent:      C.primaryGreen,
    accentLight: "#e6f7e5",
    icon: "📦",
  },
  {
    q: "How can I contact you?",
    a: "Call us at +91 90 7548 1074, email us at Dhanashreestrawberryfarm@gmail.com, or find us on Google Maps. We are happy to help!",
    accent:      C.mediumGreen,
    accentLight: "#edf6d9",
    icon: "📞",
  },
];

// helper — yellow/lime/saffron/lightGreen need dark text
const safeText = (color) =>
  [C.yellow, C.saffron, C.limeGreen, C.lightGreen, C.brandLight].includes(color)
    ? C.brandDark
    : color;

// ─── Decorative blobs ─────────────────────────────────────────────────────────
const Blobs = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    <motion.div
      animate={{ scale: [1, 1.1, 1], rotate: [0, 6, 0] }}
      transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full"
      style={{ background: `radial-gradient(circle, ${C.limeGreen}66 0%, transparent 68%)`, opacity: 0.4 }}
    />
    <motion.div
      animate={{ scale: [1, 1.07, 1] }}
      transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      className="absolute top-1/2 -right-32 w-[400px] h-[400px] rounded-full"
      style={{ background: `radial-gradient(circle, ${C.yellow}55 0%, transparent 70%)`, opacity: 0.35 }}
    />
    <motion.div
      animate={{ scale: [1, 1.06, 1], rotate: [0, -5, 0] }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      className="absolute bottom-40 left-1/3 w-[360px] h-[360px] rounded-full"
      style={{ background: `radial-gradient(circle, ${C.mediumGreen}33 0%, transparent 70%)`, opacity: 0.22 }}
    />
  </div>
);

// ─── Section Header ───────────────────────────────────────────────────────────
const SectionHeader = ({ isInView }) => (
  <div className="text-center mb-14 sm:mb-18">
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
        className="w-2 h-2 rounded-full inline-block"
        style={{ background: C.mediumGreen }}
      />
      Dhanashree Garden · FAQ
    </motion.div>

    <motion.h2
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay: 0.1, ease: EASE_EXPO }}
      className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-4"
      style={{ fontFamily: "'Cormorant Garamond', serif", color: C.brandDark }}
    >
      Have{" "}
      <em
        className="not-italic"
        style={{
          background: `linear-gradient(135deg, ${C.primaryGreen} 0%, ${C.mediumGreen} 50%, ${C.lightGreen} 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Questions?
      </em>
    </motion.h2>

    <motion.p
      initial={{ opacity: 0, y: 18 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.28, ease: EASE_EXPO }}
      className="text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
      style={{ fontFamily: "'Nunito', sans-serif", color: "#3a5c3e" }}
    >
      Everything you need to know before visiting Dhanashree Garden —
      your favourite strawberry farm in Mahabaleshwar.
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

// ─── Single FAQ Item ──────────────────────────────────────────────────────────
const FAQItem = ({ item, index, isOpen, onToggle, isInView }) => {
  const questionColor = isOpen ? safeText(item.accent) : C.darkGreen;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.96 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.65, delay: index * 0.06, ease: EASE_EXPO }}
    >
      <motion.div
        onClick={onToggle}
        whileHover={!isOpen ? { y: -3, transition: { duration: 0.25 } } : {}}
        className="cursor-pointer rounded-[20px] overflow-hidden relative"
        style={{
          background: isOpen ? C.white : "rgba(255,255,255,0.78)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: `1.5px solid ${isOpen ? item.accent + "55" : C.limeGreen + "45"}`,
          boxShadow: isOpen
            ? `0 12px 40px ${C.primaryGreen}12, 0 0 0 1px ${item.accent}22`
            : `0 4px 20px ${C.primaryGreen}08, 0 0 0 1px ${C.limeGreen}30`,
          transition: "box-shadow 0.3s ease, border-color 0.3s ease",
        }}
      >
        {/* Question row */}
        <div className="flex items-center gap-4 p-5 sm:p-6">
          {/* Icon bubble */}
          <motion.div
            animate={{
              background: isOpen
                ? `linear-gradient(135deg, ${item.accent}, ${item.accent}cc)`
                : item.accentLight,
              scale: isOpen ? 1.08 : 1,
            }}
            transition={{ duration: 0.3, ease: EASE_EXPO }}
            className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg"
          >
            <motion.span
              animate={{ filter: isOpen ? "brightness(10)" : "brightness(1)" }}
              transition={{ duration: 0.2 }}
            >
              {item.icon}
            </motion.span>
          </motion.div>

          {/* Question text */}
          <motion.p
            animate={{ color: questionColor }}
            transition={{ duration: 0.25 }}
            className="flex-1 text-base sm:text-lg font-bold leading-snug"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {item.q}
          </motion.p>

          {/* Toggle button */}
          <motion.div
            animate={{
              rotate: isOpen ? 45 : 0,
              borderColor: isOpen ? item.accent : `${C.limeGreen}80`,
              color: isOpen ? safeText(item.accent) : C.mediumGreen,
            }}
            transition={{ duration: 0.3, ease: EASE_EXPO }}
            className="flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center text-xl font-light leading-none"
          >
            +
          </motion.div>
        </div>

        {/* Answer panel */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="answer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.38, ease: EASE_EXPO }}
              style={{ overflow: "hidden" }}
            >
              <div
                className="px-6 pb-6 ml-14"
                style={{ borderTop: `1px solid ${item.accent}22`, paddingTop: "14px" }}
              >
                {/* Dot trail */}
                <div className="flex items-center gap-1.5 mb-3">
                  <div className="w-2 h-2 rounded-full" style={{ background: C.yellow }} />
                  <div className="h-px w-12" style={{ background: `${C.mediumGreen}55` }} />
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: `${C.limeGreen}88` }} />
                </div>
                <p
                  className="text-sm sm:text-base leading-relaxed"
                  style={{ fontFamily: "'Nunito', sans-serif", color: "#4a6b4e" }}
                >
                  {item.a}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom accent bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-[3px] rounded-full"
          style={{ background: `linear-gradient(90deg, ${item.accent}, ${item.accent}44)` }}
          animate={{ width: isOpen ? "100%" : "0%" }}
          transition={{ duration: 0.45, ease: EASE_EXPO }}
        />
      </motion.div>
    </motion.div>
  );
};

// ─── CTA Strip ────────────────────────────────────────────────────────────────
const CtaStrip = ({ isInView }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.85, delay: 0.3, ease: EASE_EXPO }}
    className="relative mt-12 overflow-hidden rounded-[32px] p-10 sm:p-14 flex flex-col sm:flex-row items-center justify-between gap-8"
    style={{
      background: `linear-gradient(130deg, ${C.brandDark} 0%, ${C.primaryGreen} 55%, ${C.mediumGreen} 100%)`,
      boxShadow: `0 12px 50px ${C.brandDark}45, 0 0 0 1px ${C.mediumGreen}40`,
    }}
  >
    {/* BG decorations */}
    <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full pointer-events-none"
      style={{ background: `radial-gradient(circle, ${C.yellow}30, transparent 70%)` }} />
    <div className="absolute -left-10 -bottom-10 w-44 h-44 rounded-full pointer-events-none"
      style={{ background: `radial-gradient(circle, ${C.limeGreen}30, transparent 70%)` }} />

    <div className="relative z-10 text-center sm:text-left">
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [0, 8, -4, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="text-5xl mb-3 select-none"
      >🍓</motion.div>
      <p
        className="text-[11px] font-bold tracking-[0.22em] uppercase mb-1"
        style={{ fontFamily: "'Nunito', sans-serif", color: C.limeGreen }}
      >
        Still have questions?
      </p>
      <h3
        className="text-2xl sm:text-3xl font-bold mb-2"
        style={{ fontFamily: "'Cormorant Garamond', serif", color: C.white }}
      >
        We'd Love to Hear From You
      </h3>
      <p
        className="text-sm max-w-sm"
        style={{ fontFamily: "'Nunito', sans-serif", color: "rgba(255,255,255,0.72)" }}
      >
        Reach out via WhatsApp, call us, or simply drop by the farm.
        We are always happy to help!
      </p>
    </div>

    <div className="flex flex-col sm:flex-row gap-3 relative z-10 flex-shrink-0">
      {/* Primary CTA — Yellow */}
      <motion.a
        href="tel:+919075481074"
        whileHover={{ scale: 1.06, boxShadow: `0 14px 40px ${C.yellow}55` }}
        whileTap={{ scale: 0.97 }}
        className="px-9 py-4 rounded-2xl text-sm font-bold text-center"
        style={{
          fontFamily: "'Nunito', sans-serif",
          background: C.yellow,
          color: C.brandDark,
          boxShadow: `0 6px 22px ${C.yellow}44`,
          textDecoration: "none",
        }}
      >
        📞 Call Us Now
      </motion.a>

      {/* Secondary CTA — white glass */}
      <motion.a
        href="https://wa.me/919075481074"
        target="_blank"
        rel="noreferrer"
        whileHover={{ scale: 1.05, boxShadow: `0 12px 32px ${C.white}25` }}
        whileTap={{ scale: 0.97 }}
        className="px-9 py-4 rounded-2xl text-sm font-bold border text-center"
        style={{
          fontFamily: "'Nunito', sans-serif",
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(12px)",
          borderColor: "rgba(255,255,255,0.3)",
          color: C.white,
          textDecoration: "none",
        }}
      >
        💬 WhatsApp Us
      </motion.a>
    </div>
  </motion.div>
);

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

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
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, ${C.lightGreen}55 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
            opacity: 0.18,
          }}
        />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-24">
          <SectionHeader isInView={isInView} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {faqs.map((item, i) => (
              <FAQItem
                key={i}
                item={item}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
                isInView={isInView}
              />
            ))}
          </div>

          <CtaStrip isInView={isInView} />
        </div>
      </section>
    </>
  );
}