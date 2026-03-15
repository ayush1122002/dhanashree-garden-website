import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";

// ─── Brand Palette ─────────────────────────────────────────────────────────────
const C = {
  yellow:     "#F2C91D",
  lightGreen: "#94BE3F",
  darkGreen:  "#136936",
  white:      "#FFFFFF",
};

// ─── Constants ─────────────────────────────────────────────────────────────────
const WHATSAPP_NUMBER  = "919075481074";
const WHATSAPP_MESSAGE = "Hi! I'd like to plan a visit to Dhanashree Garden 🍓";
const PHONE_URL        = "tel:+919075481074";
const WHATSAPP_URL     = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

const EASE_EXPO = [0.16, 1, 0.3, 1];

// ─── Story sections — accents now from brand palette ──────────────────────────
const stories = [
  {
    icon: "🌱",
    number: "01",
    title: "Our Approach to Strawberry Farming",
    body: "The process of strawberry cultivation requires careful planning, from preparing the soil to managing plant growth during the season. At our farm, traditional farming knowledge is combined with practical field experience to ensure balanced growth — maintaining soil fertility and consistent quality throughout the harvest.",
    accent: C.darkGreen,
    tag: "Philosophy",
  },
  {
    icon: "🏔️",
    number: "02",
    title: "Mahabaleshwar's Farming Environment",
    body: "Mahabaleshwar offers ideal conditions for strawberry farming — cool temperatures, mist-kissed mornings, and fertile highland soil. Seasonal changes play a vital role in determining planting and harvesting timelines. By working in harmony with these conditions, our strawberries develop their signature sweetness.",
    accent: C.lightGreen,
    tag: "Environment",
  },
  {
    icon: "🍓",
    number: "03",
    title: "From Cultivation to Harvest",
    body: "Strawberry cultivation involves multiple careful stages — planting, regular monitoring, and harvesting at precisely the right moment. Each stage demands attention and patience. Visitors to the farm can observe this process up close and gain insight into how strawberries are grown before they reach the table.",
    accent: C.yellow,
    tag: "Process",
  },
  {
    icon: "🎓",
    number: "04",
    title: "A Living Learning Space",
    body: "Beyond cultivation, the farm serves as a living classroom for those curious about agriculture and local farming traditions. During harvest season, visitors experience strawberry picking first-hand and learn how ripeness and quality are identified — building genuine appreciation for the effort behind every berry.",
    accent: C.darkGreen,
    tag: "Experience",
  },
  {
    icon: "🤝",
    number: "05",
    title: "Welcoming Thoughtful Farm Visits",
    body: "Nestled near Panchgani, our location invites visitors to fold a farm visit into their regional journey. The calm surroundings, open fields, and gentle mountain air make Dhanashree Garden a perfect stop for families, students, and nature enthusiasts who want to slow down and reconnect with the earth.",
    accent: C.lightGreen,
    tag: "Visits",
  },
];

// ─── Blobs ─────────────────────────────────────────────────────────────────────
const Blobs = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    <motion.div
      animate={{ scale: [1, 1.12, 1], rotate: [0, 8, 0] }}
      transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      className="absolute -top-56 -left-40 w-[650px] h-[650px] rounded-full"
      style={{ background: `radial-gradient(circle, ${C.lightGreen}55 0%, transparent 68%)`, opacity: 0.5 }}
    />
    <motion.div
      animate={{ scale: [1, 1.07, 1], rotate: [0, -5, 0] }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      className="absolute top-1/3 -right-52 w-[500px] h-[500px] rounded-full"
      style={{ background: `radial-gradient(circle, ${C.yellow}44 0%, transparent 70%)`, opacity: 0.45 }}
    />
    <motion.div
      animate={{ scale: [1, 1.09, 1] }}
      transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full"
      style={{ background: `radial-gradient(circle, ${C.darkGreen}44 0%, transparent 70%)`, opacity: 0.3 }}
    />
  </div>
);

// ─── Floating Leaf ─────────────────────────────────────────────────────────────
const FloatingLeaf = ({ style, delay = 0 }) => (
  <motion.div
    animate={{ y: [0, -18, 0], rotate: [0, 10, -6, 0], opacity: [0.18, 0.32, 0.18] }}
    transition={{ duration: 7 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    className="absolute text-4xl pointer-events-none select-none"
    style={style}
  >
    🍃
  </motion.div>
);

// ─── Hero Banner ───────────────────────────────────────────────────────────────
const HeroBanner = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, -70]), { stiffness: 80, damping: 20 });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="relative overflow-hidden">
      <FloatingLeaf style={{ top: "12%", left: "6%", fontSize: 28 }} delay={0} />
      <FloatingLeaf style={{ top: "30%", right: "8%", fontSize: 22 }} delay={2} />
      <FloatingLeaf style={{ bottom: "15%", left: "14%", fontSize: 18 }} delay={4} />
      <FloatingLeaf style={{ top: "60%", right: "18%", fontSize: 30 }} delay={1.5} />

      <motion.div style={{ y, opacity }} className="text-center py-20 sm:py-28 px-4 relative z-10">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 16 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: EASE_EXPO }}
          className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-8 border"
          style={{
            fontFamily: "'Nunito', sans-serif",
            background: `${C.darkGreen}12`,
            backdropFilter: "blur(16px)",
            borderColor: `${C.darkGreen}30`,
            color: C.darkGreen,
            boxShadow: `0 2px 16px ${C.darkGreen}14`,
          }}
        >
          <motion.span
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-2 h-2 rounded-full inline-block"
            style={{ background: C.lightGreen }}
          />
          Est. in Mahabaleshwar · Since generations
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE_EXPO }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.05] mb-6 tracking-tight"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: C.darkGreen }}
        >
          The Story Behind
          <br />
          <em
            className="not-italic"
            style={{
              background: `linear-gradient(135deg, ${C.darkGreen} 0%, ${C.lightGreen} 55%, ${C.yellow} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Dhanashree Garden
          </em>
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.35, ease: EASE_EXPO }}
          className="mx-auto h-px w-28 mb-8 origin-center"
          style={{ background: `linear-gradient(90deg, transparent, ${C.yellow}, transparent)` }}
        />

        {/* Sub-text */}
        <motion.p
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.3, ease: EASE_EXPO }}
          className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          style={{ fontFamily: "'Nunito', sans-serif", color: "#3a5c3e" }}
        >
          Strawberry farming in Mahabaleshwar is deeply connected to the region's climate,
          soil, and seasonal rhythms. At Dhanashree Garden, farming is approached as a
          <span className="font-semibold" style={{ color: C.darkGreen }}> long-term relationship with the land </span>
          — years of experience, observation, and deep respect for natural growing cycles.
        </motion.p>

        {/* Stat pills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5, ease: EASE_EXPO }}
          className="flex flex-wrap justify-center gap-4 mt-12"
        >
          {[
            { val: "100%", label: "Organic",     icon: "🌿", color: C.darkGreen },
            { val: "Mahab.", label: "Highlands",  icon: "🏔️", color: C.lightGreen },
            { val: "5+",   label: "Crop Stages", icon: "🍓", color: C.yellow },
            { val: "Open", label: "Farm Visits", icon: "🤝", color: C.darkGreen },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.55 + i * 0.08, ease: EASE_EXPO }}
              whileHover={{ y: -5, scale: 1.05, transition: { duration: 0.25 } }}
              className="flex flex-col items-center gap-1.5 px-6 py-4 rounded-2xl border cursor-default"
              style={{
                background: C.white,
                backdropFilter: "blur(20px)",
                borderColor: `${C.lightGreen}50`,
                boxShadow: `0 4px 20px ${C.darkGreen}0d`,
              }}
            >
              <span className="text-xl">{s.icon}</span>
              <span className="text-2xl font-bold" style={{ fontFamily: "'Cormorant Garamond', serif", color: s.color }}>
                {s.val}
              </span>
              <span className="text-[11px] font-bold tracking-widest uppercase" style={{ fontFamily: "'Nunito', sans-serif", color: "#6b8f6e" }}>
                {s.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

// ─── Story Card ────────────────────────────────────────────────────────────────
const StoryCard = ({ story, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, x: isEven ? -30 : 30 }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.85, ease: EASE_EXPO, delay: 0.1 }}
      className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-0 rounded-[32px] overflow-hidden mb-8 group`}
      style={{
        background: C.white,
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        boxShadow: `0 6px 40px ${C.darkGreen}12, 0 0 0 1px ${C.lightGreen}30`,
      }}
    >
      {/* Colour panel */}
      <motion.div
        whileHover={{ flex: "0 0 42%" }}
        className="relative flex-shrink-0 lg:w-[38%] flex flex-col justify-between p-8 sm:p-10 overflow-hidden transition-all duration-500"
        style={{ background: `linear-gradient(145deg, ${story.accent}18 0%, ${story.accent}08 100%)` }}
      >
        {/* Ghost number */}
        <div
          className="absolute -bottom-4 -right-2 text-[8rem] sm:text-[10rem] font-bold leading-none pointer-events-none select-none"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: `${story.accent}18` }}
        >
          {story.number}
        </div>

        {/* Tag pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3, ease: EASE_EXPO }}
          className="inline-flex self-start items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase mb-6"
          style={{
            fontFamily: "'Nunito', sans-serif",
            background: `${story.accent}18`,
            color: story.accent === C.yellow ? C.darkGreen : story.accent,
            border: `1px solid ${story.accent}40`,
          }}
        >
          {story.tag}
        </motion.div>

        {/* Icon */}
        <motion.div
          animate={{ rotate: [0, 8, -4, 0], y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: index * 0.7 }}
          className="text-5xl sm:text-6xl mb-4 select-none"
        >
          {story.icon}
        </motion.div>

        {/* Chapter number */}
        <div>
          <p className="text-xs font-bold tracking-widest uppercase mb-1"
            style={{ fontFamily: "'Nunito', sans-serif", color: `${story.accent}99` }}>
            Chapter
          </p>
          <p className="text-4xl font-bold"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: story.accent === C.yellow ? C.darkGreen : story.accent }}>
            {story.number}
          </p>
        </div>

        {/* Accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.4, ease: EASE_EXPO }}
          className="mt-6 h-0.5 rounded-full origin-left"
          style={{ background: `linear-gradient(90deg, ${story.accent}, transparent)` }}
        />
      </motion.div>

      {/* Content panel */}
      <div className="flex-1 p-8 sm:p-10 flex flex-col justify-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.25, ease: EASE_EXPO }}
          className="text-2xl sm:text-3xl font-bold mb-5 leading-tight"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: C.darkGreen }}
        >
          {story.title}
        </motion.h2>

        <div className="text-6xl font-bold leading-none mb-2 -mt-2 select-none"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: `${C.yellow}55` }}>
          "
        </div>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.35, ease: EASE_EXPO }}
          className="leading-relaxed text-base sm:text-[1.05rem]"
          style={{ fontFamily: "'Nunito', sans-serif", color: "#4a6b4e" }}
        >
          {story.body}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex items-center gap-2 mt-8"
        >
          <div className="w-2 h-2 rounded-full" style={{ background: C.yellow }} />
          <div className="w-12 h-px" style={{ background: `${C.lightGreen}88` }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: `${C.lightGreen}88` }} />
          <div className="w-6 h-px" style={{ background: `${C.lightGreen}44` }} />
        </motion.div>
      </div>
    </motion.div>
  );
};

// ─── Timeline Connector ────────────────────────────────────────────────────────
const TimelineConnector = ({ accent }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  return (
    <div ref={ref} className="flex justify-center my-2">
      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        animate={isInView ? { scaleY: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, ease: EASE_EXPO }}
        className="w-px h-10 origin-top"
        style={{ background: `linear-gradient(180deg, ${accent}, transparent)` }}
      />
    </div>
  );
};

// ─── Closing CTA ───────────────────────────────────────────────────────────────
const ClosingCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: EASE_EXPO }}
      className="relative overflow-hidden rounded-[36px] p-10 sm:p-16 mt-12 text-center"
      style={{
        background: `linear-gradient(135deg, ${C.darkGreen} 0%, #1a7a40 50%, ${C.lightGreen} 100%)`,
        boxShadow: `0 16px 60px ${C.darkGreen}40, 0 0 0 1px ${C.lightGreen}40`,
      }}
    >
      {/* BG decorations */}
      <div
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${C.yellow}30, transparent 70%)` }}
      />
      <div
        className="absolute -bottom-16 -left-16 w-52 h-52 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${C.lightGreen}40, transparent 70%)` }}
      />

      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 6, -4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="text-6xl mb-6 select-none relative z-10"
      >
        🍓
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2, ease: EASE_EXPO }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 relative z-10"
        style={{ fontFamily: "'Cormorant Garamond', serif", color: C.white }}
      >
        Come Visit the Farm
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, delay: 0.35, ease: EASE_EXPO }}
        className="text-base sm:text-lg max-w-lg mx-auto leading-relaxed mb-10 relative z-10"
        style={{ fontFamily: "'Nunito', sans-serif", color: "rgba(255,255,255,0.82)" }}
      >
        Experience strawberry picking first-hand, breathe the highland air,
        and take home a basket of the freshest organic produce you'll ever taste.
      </motion.p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center relative z-10 w-full max-w-sm mx-auto sm:max-w-none">

        {/* WhatsApp */}
        <motion.a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.06, boxShadow: `0 16px 44px ${C.yellow}55` }}
          whileTap={{ scale: 0.96 }}
          className="flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-bold"
          style={{
            fontFamily: "'Nunito', sans-serif",
            background: C.yellow,
            color: C.darkGreen,
            boxShadow: `0 6px 24px ${C.yellow}55`,
            textDecoration: "none",
            minWidth: "180px",
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill={C.darkGreen} aria-hidden="true" style={{ flexShrink: 0 }}>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Plan Your Visit →
        </motion.a>

        {/* Phone */}
        <motion.a
          href={PHONE_URL}
          whileHover={{ scale: 1.05, boxShadow: `0 12px 32px ${C.white}30` }}
          whileTap={{ scale: 0.96 }}
          className="flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-bold border"
          style={{
            fontFamily: "'Nunito', sans-serif",
            background: "rgba(255,255,255,0.12)",
            backdropFilter: "blur(12px)",
            borderColor: "rgba(255,255,255,0.35)",
            color: C.white,
            textDecoration: "none",
            minWidth: "160px",
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" />
          </svg>
          Contact Us
        </motion.a>
      </div>
    </motion.div>
  );
};

// ─── Root ──────────────────────────────────────────────────────────────────────
const AboutUs = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Nunito:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      <section
        id="about"
        className="relative min-h-screen w-full overflow-hidden"
        style={{
          background: `linear-gradient(150deg, #f5faf0 0%, #eef7e6 30%, #e8f5e0 65%, #f0f9ea 100%)`,
          fontFamily: "'Nunito', sans-serif",
        }}
      >
        <Blobs />

        {/* Dot-grid texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, ${C.lightGreen}55 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
            opacity: 0.22,
          }}
        />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
          <HeroBanner />

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE_EXPO }}
            className="h-px mx-auto w-3/4 mb-16 origin-center"
            style={{ background: `linear-gradient(90deg, transparent, ${C.yellow}, transparent)` }}
          />

          <div className="pb-4">
            {stories.map((story, index) => (
              <React.Fragment key={story.number}>
                <StoryCard story={story} index={index} />
                {index < stories.length - 1 && (
                  <TimelineConnector accent={stories[index + 1].accent} />
                )}
              </React.Fragment>
            ))}
          </div>

          <ClosingCTA />
          <div className="h-16" />
        </div>
      </section>
    </>
  );
};

export default AboutUs;