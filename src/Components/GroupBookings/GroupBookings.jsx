import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// ─── Images — uncomment and replace when ready ────────────────────────────────
import ImgOne   from "../../assets/GroupBookings/ImgOne.jpg";
import ImgTwo from "../../assets/GroupBookings/ImgTwo.jpg";
import ImgThree    from "../../assets/GroupBookings/ImgThree.jpg";
import ImgFour   from "../../assets/GroupBookings/ImgFour.jpg";

// ─── Brand Palette (matches Services exactly) ─────────────────────────────────
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

// ─── Booking rows ─────────────────────────────────────────────────────────────
const bookings = [
  {
     image: ImgOne,
    title: "Student / Educational Tours",
    description:
      "Let your students embark on a hands-on berry experience — learning organic farming, seasonal cycles, and sustainable agriculture right here at Dhanashree Garden.",
  },
  {
    image: ImgTwo,
    title: "Corporate Day Out",
    description:
      "Step away from screens and into the farm. Bond with your team over fresh-picked strawberries and farm-to-table dining in the peaceful Mahabaleshwar highlands.",
  },
  {
    image: ImgThree,
    title: "A Scene With Your Gang",
    description:
      "Bring your family and friends — every experience at Dhanashree Garden is a core memory waiting to happen, from sunrise picking to organic farm meals.",
  },
  {
    image: ImgFour,
    title: "Reserve the Farm",
    description:
      "Whether it's a pre-wedding shoot, brand campaign, or a picturesque location for your next project — we're happy to host you at our strawberry estate.",
  },
];

// ─── Decorative blobs (matches Services) ─────────────────────────────────────
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

// ─── Section Header (matches Services SectionHeader exactly) ─────────────────
const SectionHeader = ({ isInView }) => (
  <div className="text-center mb-12 sm:mb-16">
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
      Dhanashree Garden · Group Bookings
    </motion.div>

    <motion.h2
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay: 0.1, ease: EASE_EXPO }}
      className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-5"
      style={{ fontFamily: "'Cormorant Garamond', serif", color: C.brandDark }}
    >
      Book for
      <br />
      <em
        className="not-italic"
        style={{
          background: `linear-gradient(135deg, ${C.primaryGreen} 0%, ${C.mediumGreen} 50%, ${C.lightGreen} 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Your Group
      </em>
    </motion.h2>

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.28, ease: EASE_EXPO }}
      className="text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
      style={{ fontFamily: "'Nunito', sans-serif", color: "#3a5c3e" }}
    >
      Whether you're a school group, a corporate team, or a family looking
      for a memorable outing — Dhanashree Garden welcomes you with open fields.
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

// ─── Single Booking Row ───────────────────────────────────────────────────────
const BookingRow = ({ booking, index, isInView }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -28 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.35 + index * 0.1, ease: EASE_EXPO }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="flex items-center gap-5 py-4 sm:py-5"
      style={{
        borderBottom: index < bookings.length - 1
          ? `1px solid ${C.limeGreen}45`
          : "none",
        cursor: "default",
      }}
    >
      {/* Circular image / placeholder */}
      <motion.div
        animate={{ scale: hovered ? 1.1 : 1 }}
        transition={{ duration: 0.3 }}
        className="flex-shrink-0 rounded-full overflow-hidden flex items-center justify-center"
        style={{
          width: 68,
          height: 68,
          background: `linear-gradient(135deg, ${C.brandDark} 0%, ${C.mediumGreen} 100%)`,
          border: `2.5px solid ${C.limeGreen}60`,
          boxShadow: hovered
            ? `0 0 0 4px ${C.limeGreen}30, 0 6px 20px ${C.primaryGreen}22`
            : `0 3px 12px ${C.primaryGreen}18`,
          transition: "box-shadow 0.3s ease",
        }}
      >
      <img src={booking.image} alt={booking.title} className="w-full h-full object-cover" />
        <span className="text-3xl select-none">{booking.icon}</span>
      </motion.div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <motion.h3
          animate={{ color: hovered ? C.primaryGreen : C.brandDark }}
          transition={{ duration: 0.25 }}
          className="font-bold mb-1 leading-tight tracking-wide uppercase"
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: "clamp(0.78rem, 2vw, 0.92rem)",
          }}
        >
          {booking.title}
        </motion.h3>
        <p
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: "clamp(0.72rem, 1.5vw, 0.8rem)",
            color: "#4a6b4e",
            lineHeight: 1.55,
          }}
        >
          {booking.description}
        </p>
      </div>

      {/* Hover arrow */}
     
    </motion.div>
  );
};

// ─── CTA Strip (matches Services CtaStrip exactly) ───────────────────────────
const CtaStrip = ({ isInView }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.85, delay: 0.2, ease: EASE_EXPO }}
    className="relative mt-10 sm:mt-14 rounded-[32px] overflow-hidden p-10 sm:p-14 flex flex-col sm:flex-row items-center justify-between gap-8"
    style={{
      background: `linear-gradient(130deg, ${C.brandDark} 0%, ${C.primaryGreen} 55%, ${C.mediumGreen} 100%)`,
      boxShadow: `0 12px 50px ${C.brandDark}45, 0 0 0 1px ${C.mediumGreen}40`,
    }}
  >
    <div aria-hidden="true"
      className="absolute -right-16 -top-16 w-56 h-56 rounded-full pointer-events-none"
      style={{ background: `radial-gradient(circle, ${C.yellow}35, transparent 70%)` }} />
    <div aria-hidden="true"
      className="absolute -left-10 -bottom-10 w-44 h-44 rounded-full pointer-events-none"
      style={{ background: `radial-gradient(circle, ${C.limeGreen}35, transparent 70%)` }} />

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
        Plan your group visit
      </p>
      <h3 className="text-2xl sm:text-3xl font-bold mb-2"
        style={{ fontFamily: "'Cormorant Garamond', serif", color: C.white }}>
        Bring Your Group to the Farm
      </h3>
      <p className="text-sm max-w-sm"
        style={{ fontFamily: "'Nunito', sans-serif", color: "rgba(255,255,255,0.72)" }}>
        Custom packages for schools, corporates, families, and film crews.
        Get in touch and we'll plan it together.
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

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function GroupBookings() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Nunito:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
      `}</style>

      <section
        ref={ref}
        id="group-bookings"
        className="relative min-h-screen w-full overflow-hidden"
        style={{
          /* exact same background as Services */
          background: `linear-gradient(150deg, #f2fae8 0%, #eef7df 30%, #f8fde8 65%, #f0f9e0 100%)`,
          fontFamily: "'Nunito', sans-serif",
        }}
      >
        <Blobs />

        {/* Dot-grid texture — same as Services */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, ${C.lightGreen}55 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
            opacity: 0.18,
          }}
        />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 py-16 sm:py-24">

          <SectionHeader isInView={isInView} />

          {/* Booking rows inside a clean white glass panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE_EXPO }}
            className="rounded-[28px] px-6 sm:px-10 py-2"
            style={{
              background: C.white,
              boxShadow: `0 6px 40px ${C.primaryGreen}10, 0 0 0 1px ${C.limeGreen}45`,
            }}
          >
            {bookings.map((b, i) => (
              <BookingRow key={b.title} booking={b} index={i} isInView={isInView} />
            ))}
          </motion.div>

          {/* CTA Strip — same as Services */}
          <CtaStrip isInView={isInView} />
        </div>
      </section>
    </>
  );
}