import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";

// ─── Image imports ─────────────────────────────────────────────────────────────
import strawberry from "../../assets/products/strawberry.jpg";
import mulberry from "../../assets/products/mulberry.jpg";
import raspberry from "../../assets/products/raspberry.jpg";
import gooseberry from "../../assets/products/Gooseberry.jpg";
import jackfruit from "../../assets/products/jackfruit.jpg";
import Broccoli from "../../assets/products/broccoli.jpeg";
import Cauliflower from "../../assets/products/Cauliflower.jpeg";
import Greencabbage from "../../assets/products/greencabbage.jpeg";
import IcebergLettuce from "../../assets/products/iceberglettuce.jpeg";
import carrot from "../../assets/products/carrot.jpeg";
import RedRadish from "../../assets/products/RedRadish.jpeg";
import WhiteRadish from "../../assets/products/whiteradish.jpg";
import Beetroot from "../../assets/products/beetroot.jpeg";
import Zucchini from "../../assets/products/zucchini.jpeg";
import Potato from "../../assets/products/Potato.jpeg";
import CherryTomato from "../../assets/products/cherrytomato.jpg";
import Brinjal from "../../assets/products/Brinjal.jpeg";
import Ladyfinger from "../../assets/products/ladyfinger.jpeg";
import Parsley from "../../assets/products/parsley.jpeg";
import Celery from "../../assets/products/celery.jpeg";
import Mint from "../../assets/products/mint.jpeg";
import Coriander from "../../assets/products/coriander.jpeg";
import Basil from "../../assets/products/basil.jpeg";
import Rocket from "../../assets/products/rocket.jpeg";
import BokChoy from "../../assets/products/bokchoy.jpeg";
import AloeVera from "../../assets/products/aloevera.jpeg";
import DillLeaves from "../../assets/products/dillLeaves.jpeg";
import WildOlive from "../../assets/products/wildolive.jpeg";
import Fenugreek from "../../assets/products/fenugreek.jpeg";
import RedAmaranthus from "../../assets/products/RedAmaranth.jpeg";
import LimaBeans from "../../assets/products/limabeans.jpeg";
import CommonBeans from "../../assets/products/commonbeans.jpeg";
import BroadBeans from "../../assets/products/broadbeans.jpeg";
import Wheat from "../../assets/products/wheat.jpeg";
import SunflowerSeeds from "../../assets/products/sunflowerseed.jpeg";
import Sweetcorn from "../../assets/products/sweetcorn.jpeg";
import Onion from "../../assets/products/Onion.jpeg";
import Garlic from "../../assets/products/garlic.jpeg";
import Chili from "../../assets/products/greenChili.jpeg";
import Capsicum from "../../assets/products/Capsicum.jpg";
import Kohlrabi from "../../assets/products/Kohlrabi.jpg";

// ─── Brand Palette ─────────────────────────────────────────────────────────────
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

// ─── Constants ─────────────────────────────────────────────────────────────────
const WHATSAPP_NUMBER  = "919075481074";
const WHATSAPP_MESSAGE = "Hi! I'd like to order fresh organic produce from Dhanashree Garden 🌿";
const WHATSAPP_URL     = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
const PHONE_URL        = "tel:+919075481074";

// ✅ BUG #1 FIXED: moved outside component so it's never recreated on re-render
const ROTATING_WORDS = ["Fresh.", "Organic.", "Pure.", "Local."];

// ─── Animation easings ─────────────────────────────────────────────────────────
const EASE_EXPO   = [0.16, 1, 0.3, 1];
const EASE_SMOOTH = [0.4, 0, 0.2, 1];

// ─── Category data ─────────────────────────────────────────────────────────────
const categories = [
  {
    id: "fruits",
    label: "Fruits",
    icon: "🍓",
    accent:      C.mediumGreen,
    accentLight: "#edf7d6",
    accentMid:   C.limeGreen,
    items: [
      { name: "Strawberry", img: strawberry },
      { name: "Mulberry",   img: mulberry },
      { name: "Raspberry",  img: raspberry },
      { name: "Gooseberry", img: gooseberry },
      { name: "Jackfruit",  img: jackfruit },
    ],
  },
  {
    id: "vegetables",
    label: "Vegetables",
    icon: "🥦",
    accent:      C.primaryGreen,
    accentLight: "#e6f4e6",
    accentMid:   C.brandLight,
    items: [
      { name: "Broccoli",        img: Broccoli },
      { name: "Cauliflower",     img: Cauliflower },
      { name: "Green Cabbage",   img: Greencabbage },
      { name: "Iceberg Lettuce", img: IcebergLettuce },
      { name: "Carrot",          img: carrot },
      { name: "Red Radish",      img: RedRadish },
      { name: "White Radish",    img: WhiteRadish },
      { name: "Beetroot",        img: Beetroot },
      { name: "Zucchini",        img: Zucchini },
      { name: "Potato",          img: Potato },
      { name: "Cherry Tomato",   img: CherryTomato },
      { name: "Brinjal",         img: Brinjal },
      { name: "Ladyfinger",      img: Ladyfinger },
      { name: "Onion",           img: Onion },
      { name: "Garlic",          img: Garlic },
      { name: "Capsicum",        img: Capsicum },
      { name: "Kohlrabi",        img: Kohlrabi },
      { name: "Green Chili",     img: Chili },
    ],
  },
  {
    id: "herbs",
    label: "Herbs & Greens",
    icon: "🌿",
    accent:      C.darkGreen,
    accentLight: "#e4f0e4",
    accentMid:   C.brandLight,
    items: [
      { name: "Parsley",        img: Parsley },
      { name: "Celery",         img: Celery },
      { name: "Mint",           img: Mint },
      { name: "Coriander",      img: Coriander },
      { name: "Basil",          img: Basil },
      { name: "Rocket",         img: Rocket },
      { name: "Bok Choy",       img: BokChoy },
      { name: "Aloe Vera",      img: AloeVera },
      { name: "Dill Leaves",    img: DillLeaves },
      { name: "Wild Olive",     img: WildOlive },
      { name: "Fenugreek",      img: Fenugreek },
      { name: "Red Amaranthus", img: RedAmaranthus },
    ],
  },
  {
    id: "legumes",
    label: "Legumes & Grains",
    icon: "🌾",
    accent:      C.yellow,
    accentLight: "#fdf9e3",
    accentMid:   C.saffron,
    items: [
      { name: "Lima Beans",      img: LimaBeans },
      { name: "Common Beans",    img: CommonBeans },
      { name: "Broad Beans",     img: BroadBeans },
      { name: "Wheat",           img: Wheat },
      { name: "Sunflower Seeds", img: SunflowerSeeds },
      { name: "Sweet Corn",      img: Sweetcorn },
    ],
  },
];

// ─── Decorative soft blobs ─────────────────────────────────────────────────────
const Blobs = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    <motion.div
      animate={{ scale: [1, 1.08, 1], rotate: [0, 6, 0] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      className="absolute -top-40 -right-40 w-[560px] h-[560px] rounded-full opacity-40"
      style={{ background: `radial-gradient(circle, ${C.limeGreen}88 0%, transparent 72%)` }}
    />
    <motion.div
      animate={{ scale: [1, 1.05, 1], rotate: [0, -5, 0] }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      className="absolute top-1/2 -left-52 w-[420px] h-[420px] rounded-full opacity-25"
      style={{ background: `radial-gradient(circle, ${C.yellow}88 0%, transparent 70%)` }}
    />
    <motion.div
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      className="absolute bottom-20 right-1/4 w-[320px] h-[320px] rounded-full opacity-30"
      style={{ background: `radial-gradient(circle, ${C.lightGreen}66 0%, transparent 70%)` }}
    />
  </div>
);

// ─── Product Card ──────────────────────────────────────────────────────────────
const ProductCard = ({ item, index, accent, accentLight }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative flex-shrink-0 w-44 sm:w-48 md:w-52 cursor-pointer select-none"
      initial={{ opacity: 0, y: 50, scale: 0.88 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: EASE_EXPO }}
      whileHover={{ y: -12, scale: 1.04, transition: { duration: 0.35, ease: EASE_EXPO } }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <motion.div
        className="relative overflow-hidden rounded-[28px]"
        animate={{
          boxShadow: hovered
            ? `0 28px 70px rgba(0,0,0,0.13), 0 0 0 2.5px ${accent}60`
            : "0 4px 24px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.04)",
        }}
        transition={{ duration: 0.3, ease: EASE_SMOOTH }}
        style={{
          background: "rgba(255,255,255,0.82)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
        }}
      >
        <div className="relative h-40 sm:h-44 overflow-hidden">
          <motion.img
            src={item.img}
            alt={item.name}
            className="w-full h-full object-cover"
            animate={{ scale: hovered ? 1.16 : 1 }}
            transition={{ duration: 0.7, ease: EASE_EXPO }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.05) 55%, transparent 100%)",
            }}
          />
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ x: "-140%", opacity: 1 }}
                animate={{ x: "220%" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0 w-1/2 skew-x-[-18deg]"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.42), transparent)" }}
              />
            )}
          </AnimatePresence>
        </div>

        <motion.div
          className="px-4 py-3.5 flex items-center justify-center"
          animate={{ background: hovered ? accentLight : "rgba(255,255,255,0)" }}
          transition={{ duration: 0.3 }}
        >
          <motion.p
            className="text-sm font-bold truncate"
            animate={{ color: hovered ? accent : "#1f2937" }}
            transition={{ duration: 0.3 }}
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            {item.name}
          </motion.p>
        </motion.div>

        <motion.div
          className="absolute bottom-0 left-0 h-[3.5px] rounded-full"
          style={{ background: `linear-gradient(90deg, ${accent}dd, ${accent}44)` }}
          animate={{ width: hovered ? "100%" : "0%" }}
          transition={{ duration: 0.45, ease: EASE_EXPO }}
        />
      </motion.div>
    </motion.div>
  );
};

// ─── Category Tab ──────────────────────────────────────────────────────────────
const CategoryTab = ({ cat, active, onClick }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="relative flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap overflow-hidden border"
    style={{
      fontFamily: "'Nunito', sans-serif",
      color: active
        ? (cat.accent === C.yellow || cat.accent === C.saffron ? C.brandDark : C.white)
        : "#4b5563",
      background: active ? cat.accent : "rgba(255,255,255,0.8)",
      backdropFilter: "blur(14px)",
      borderColor: active ? "transparent" : "rgba(0,0,0,0.07)",
      boxShadow: active ? `0 8px 28px ${cat.accent}55` : "0 1px 8px rgba(0,0,0,0.06)",
      transition: "all 0.3s ease",
    }}
  >
    <span className="text-base">{cat.icon}</span>
    {cat.label}
  </motion.button>
);

// ─── Progress bar for auto-slide ──────────────────────────────────────────────
const ProgressBar = ({ accent, isRunning, duration }) => (
  <div className="relative h-0.5 w-full rounded-full overflow-hidden" style={{ background: `${accent}22` }}>
    <AnimatePresence>
      {isRunning && (
        <motion.div
          key="bar"
          className="absolute left-0 top-0 h-full rounded-full"
          style={{ background: accent }}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: duration / 1000, ease: "linear" }}
        />
      )}
    </AnimatePresence>
  </div>
);

// ─── Category Slider ───────────────────────────────────────────────────────────
const CategorySlider = ({ cat }) => {
  const sliderRef  = useRef(null);
  const sectionRef = useRef(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-50px" });

  const [activeIdx,   setActiveIdx]   = useState(0);
  const [isPaused,    setIsPaused]    = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const AUTO_DELAY = 3000;
  const CARD_W     = 216;

  const goTo = useCallback(
    (idx) => {
      const count = cat.items.length;
      const next  = ((idx % count) + count) % count;
      setActiveIdx(next);
      setProgressKey((k) => k + 1);
      sliderRef.current?.scrollTo({ left: next * CARD_W, behavior: "smooth" });
    },
    [cat.items.length],
  );

  // ✅ BUG #3 FIXED: use goTo inside interval so auto-slide and manual nav stay in sync
  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(() => {
      setActiveIdx((prev) => {
        const next = (prev + 1) % cat.items.length;
        goTo(next);
        return next;
      });
    }, AUTO_DELAY);
    return () => clearInterval(t);
  }, [isPaused, cat.items.length, goTo]);

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 70 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: EASE_EXPO }}
      className="mb-16"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Header row */}
      <div className="flex items-end justify-between mb-5 px-1">
        <div className="flex items-center gap-4">
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={isInView ? { scaleY: 1, opacity: 1 } : {}}
            transition={{ duration: 0.55, delay: 0.15, ease: EASE_EXPO }}
            className="w-[4px] h-9 rounded-full origin-top"
            style={{ background: `linear-gradient(180deg, ${cat.accent}, ${cat.accentMid})` }}
          />
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -24 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE_EXPO }}
              className="text-2xl sm:text-3xl font-bold text-gray-800"
              style={{ fontFamily: "'Cormorant Garamond', serif", lineHeight: 1.1 }}
            >
              {cat.icon} {cat.label}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, x: -16 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xs text-gray-400 font-semibold mt-1 tracking-wide uppercase"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              {cat.items.length} varieties · Freshly harvested
            </motion.p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {[-1, 1].map((dir) => (
            <motion.button
              key={dir}
              whileHover={{ scale: 1.12, backgroundColor: cat.accentLight }}
              whileTap={{ scale: 0.9 }}
              onClick={() => goTo(activeIdx + dir)}
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border transition-colors duration-200"
              style={{
                background: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(12px)",
                borderColor: `${cat.accent}35`,
                color: cat.accent,
              }}
            >
              {dir === -1 ? "←" : "→"}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="mb-4 px-1">
        <ProgressBar key={progressKey} accent={cat.accent} isRunning={!isPaused} duration={AUTO_DELAY} />
      </div>

      <div
        ref={sliderRef}
        className="flex gap-4 overflow-x-auto pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none", scrollSnapType: "x mandatory" }}
      >
        {cat.items.map((item, i) => (
          <div key={item.name} style={{ scrollSnapAlign: "start" }}>
            <ProductCard item={item} index={i} accent={cat.accent} accentLight={cat.accentLight} />
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-3 justify-center flex-wrap">
        {cat.items.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => goTo(i)}
            animate={{
              width:      i === activeIdx ? 24 : 7,
              background: i === activeIdx ? cat.accent : "#d1d5db",
              opacity:    i === activeIdx ? 1 : 0.55,
            }}
            transition={{ duration: 0.4, ease: EASE_EXPO }}
            className="h-[7px] rounded-full cursor-pointer"
          />
        ))}
      </div>
    </motion.div>
  );
};

// ─── Animated stat counter ─────────────────────────────────────────────────────
const Counter = ({ to, label, icon, color, bgColor, delay = 0 }) => {
  const ref      = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  // ✅ BUG #2 FIXED: interval ref kept outside setTimeout so React cleanup can reach it
  useEffect(() => {
    if (!isInView) return;
    let id;
    const timer = setTimeout(() => {
      let start = 0;
      const step = Math.max(1, Math.ceil(to / 45));
      id = setInterval(() => {
        start += step;
        if (start >= to) {
          setCount(to);
          clearInterval(id);
        } else {
          setCount(start);
        }
      }, 28);
    }, delay);
    return () => {
      clearTimeout(timer);
      clearInterval(id);
    };
  }, [isInView, to, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: delay / 1000 + 0.1, ease: EASE_EXPO }}
      whileHover={{ y: -4, scale: 1.04, transition: { duration: 0.25 } }}
      className="flex flex-col items-center gap-1.5 px-6 py-5 rounded-3xl border cursor-default"
      style={{
        background: bgColor || "rgba(255,255,255,0.72)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderColor: `${color}30`,
        boxShadow: `0 4px 24px ${color}18`,
      }}
    >
      <span className="text-2xl">{icon}</span>
      <span className="text-3xl font-bold" style={{ fontFamily: "'Cormorant Garamond', serif", color }}>
        {count}+
      </span>
      <span className="text-[11px] text-gray-500 font-bold tracking-widest uppercase" style={{ fontFamily: "'Nunito', sans-serif" }}>
        {label}
      </span>
    </motion.div>
  );
};

// ─── Hero / Header ─────────────────────────────────────────────────────────────
const Hero = ({ sectionRef }) => {
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const rawY       = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const y          = useSpring(rawY, { stiffness: 90, damping: 22 });

  // ✅ BUG #1 FIXED: uses module-level ROTATING_WORDS constant, no stale closure
  const [wordIdx, setWordIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setWordIdx((p) => (p + 1) % ROTATING_WORDS.length), 2500);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div style={{ y, opacity: rawOpacity }} className="text-center mb-16 sm:mb-24">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.75, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE_EXPO }}
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
        Certified Organic · Farm to Table
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 0.1, ease: EASE_EXPO }}
        className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.04] mb-5 tracking-tight"
        style={{ fontFamily: "'Cormorant Garamond', serif", color: C.brandDark }}
      >
        Our Organic
        <br />
        <span className="relative inline-block" style={{ minWidth: "5ch" }}>
          <AnimatePresence mode="wait">
            <motion.span
              key={wordIdx}
              initial={{ y: 48, opacity: 0, filter: "blur(12px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: -36, opacity: 0, filter: "blur(8px)" }}
              transition={{ duration: 0.52, ease: EASE_EXPO }}
              className="inline-block"
              style={{
                background: `linear-gradient(135deg, ${C.primaryGreen} 0%, ${C.mediumGreen} 50%, ${C.lightGreen} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {ROTATING_WORDS[wordIdx]}
            </motion.span>
          </AnimatePresence>
        </span>
      </motion.h1>

      {/* Sub-copy */}
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="text-base sm:text-lg max-w-md mx-auto leading-relaxed mb-10"
        style={{ fontFamily: "'Nunito', sans-serif", color: "#3a5c3e" }}
      >
        Hand-picked from certified farms. Nutrient-rich, chemical-free, and delivered fresh straight to your door.
      </motion.p>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.4, ease: EASE_EXPO }}
        className="mx-auto h-px w-24 mb-10 origin-center"
        style={{ background: `linear-gradient(90deg, transparent, ${C.yellow}, transparent)` }}
      />

      {/* Stat counters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="flex flex-wrap justify-center gap-4"
      >
        <Counter to={40}  label="Varieties"  icon="🌱" color={C.primaryGreen} delay={0}   />
        <Counter to={100} label="% Organic"  icon="✅" color={C.brandDark}    delay={120} />
        <Counter to={4}   label="Categories" icon="📦" color={C.mediumGreen}  delay={240} />
        <Counter to={500} label="Clients"    icon="😊" color={C.brandLight}   delay={360} />
      </motion.div>
    </motion.div>
  );
};

// ─── Root ──────────────────────────────────────────────────────────────────────
const OrganicProduce = () => {
  const sectionRef = useRef(null);
  const [activeTab, setActiveTab] = useState(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Nunito:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <section
        ref={sectionRef}
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
          <Hero sectionRef={sectionRef} />

          {/* ✅ BUG #4 FIXED: tabs only filter, no toggle-to-null confusion */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15, ease: EASE_EXPO }}
            className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(null)}
              className="flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-bold border whitespace-nowrap"
              style={{
                fontFamily: "'Nunito', sans-serif",
                background: activeTab === null ? C.brandDark : "rgba(255,255,255,0.82)",
                color:      activeTab === null ? C.white     : "#4b5563",
                backdropFilter: "blur(14px)",
                borderColor: activeTab === null ? "transparent" : "rgba(0,0,0,0.07)",
                boxShadow:   activeTab === null ? `0 8px 28px ${C.brandDark}44` : "0 1px 8px rgba(0,0,0,0.06)",
                transition: "all 0.3s ease",
              }}
            >
              🌿 All Products
            </motion.button>

            {categories.map((cat) => (
              <CategoryTab
                key={cat.id}
                cat={cat}
                active={activeTab === cat.id}
                onClick={() => setActiveTab(cat.id)}
              />
            ))}
          </motion.div>

          {/* Sliders */}
          <AnimatePresence mode="popLayout">
            {categories
              .filter((c) => activeTab === null || c.id === activeTab)
              .map((cat, i) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 40, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96, y: -20 }}
                  transition={{ duration: 0.55, delay: i * 0.06, ease: EASE_EXPO }}
                >
                  <CategorySlider cat={cat} />
                </motion.div>
              ))}
          </AnimatePresence>

          {/* CTA Banner */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.85, ease: EASE_EXPO }}
            className="mt-16 sm:mt-20 relative overflow-hidden rounded-[32px] p-10 sm:p-14 flex flex-col sm:flex-row items-center justify-between gap-8"
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
                Ready to order?
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold mb-2"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: C.white }}>
                Fresh Delivery, Every Week.
              </h3>
              <p className="text-sm max-w-sm"
                style={{ fontFamily: "'Nunito', sans-serif", color: "rgba(255,255,255,0.72)" }}>
                Subscribe to our weekly organic basket and enjoy 10% off your first order.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 relative z-10 flex-shrink-0 w-full sm:w-auto">
              <motion.a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
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
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={C.brandDark} aria-hidden="true" style={{ flexShrink: 0 }}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Order Now →
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
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" />
                </svg>
                Call Us
              </motion.a>
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
};

export default OrganicProduce;