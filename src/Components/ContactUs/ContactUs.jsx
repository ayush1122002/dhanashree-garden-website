import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

import facebookIcon  from "../../assets/icons/facebook.png";
import whatsappIcon  from "../../assets/icons/social.png";
import instagramIcon from "../../assets/icons/instagram.png";
import emailIcon     from "../../assets/icons/gmail.png";

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

// ─── Constants ────────────────────────────────────────────────────────────────
const WHATSAPP_URL = "https://wa.me/919075481074";
const PHONE_URL    = "tel:+919075481074";
const EMAIL        = "Dhanashreestrawberryfarm@gmail.com";
const EASE_EXPO    = [0.16, 1, 0.3, 1];

// ─── Social links ─────────────────────────────────────────────────────────────
const socials = [
  { icon: facebookIcon,  label: "Facebook",  href: "https://www.facebook.com/dhanashreegarden",  color: "#1877f2" },
  { icon: whatsappIcon,  label: "WhatsApp",  href: WHATSAPP_URL,                                 color: "#25d366" },
  { icon: instagramIcon, label: "Instagram", href: "https://www.instagram.com/dhanashreegarden", color: "#e1306c" },
  { icon: emailIcon,     label: "Email",     href: `mailto:${EMAIL}`,                             color: "#ea4335" },
];

// ─── Farm stats ───────────────────────────────────────────────────────────────
const stats = [
  { value: "1969",      label: "Est. Year",      icon: "🌱" },
  { value: "300+",      label: "Daily Visitors", icon: "🚜" },
  { value: "100+",      label: "Products",       icon: "🥕" },
  { value: "Pan‑India", label: "Export Reach",   icon: "🌍" },
];

// ─── Decorative blobs ─────────────────────────────────────────────────────────
const Blobs = () => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
    <motion.div
      animate={{ scale: [1, 1.1, 1], rotate: [0, 6, 0] }}
      transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full"
      style={{ background: `radial-gradient(circle, ${C.limeGreen}66 0%, transparent 68%)`, opacity: 0.45 }}
    />
    <motion.div
      animate={{ scale: [1, 1.07, 1] }}
      transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      className="absolute -bottom-24 -right-24 w-[420px] h-[420px] rounded-full"
      style={{ background: `radial-gradient(circle, ${C.yellow}55 0%, transparent 70%)`, opacity: 0.38 }}
    />
    <motion.div
      animate={{ scale: [1, 1.06, 1], rotate: [0, -5, 0] }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] rounded-full"
      style={{ background: `radial-gradient(circle, ${C.mediumGreen}30 0%, transparent 70%)`, opacity: 0.22 }}
    />
  </div>
);

// ─── Section header ───────────────────────────────────────────────────────────
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
        aria-hidden="true"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="w-2 h-2 rounded-full inline-block"
        style={{ background: C.mediumGreen }}
      />
      Dhanashree Garden · Get In Touch
    </motion.div>

    <motion.h2
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay: 0.1, ease: EASE_EXPO }}
      className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-4"
      style={{ fontFamily: "'Cormorant Garamond', serif", color: C.brandDark }}
    >
      Visit &{" "}
      <em
        className="not-italic"
        style={{
          background: `linear-gradient(135deg, ${C.primaryGreen} 0%, ${C.mediumGreen} 50%, ${C.lightGreen} 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Connect
      </em>
    </motion.h2>

    <motion.p
      initial={{ opacity: 0, y: 18 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.28, ease: EASE_EXPO }}
      className="text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
      style={{ fontFamily: "'Nunito', sans-serif", color: "#3a5c3e" }}
    >
      We're nestled in the highlands of Mahabaleshwar — come say hello,
      plan your visit, or simply drop us a message.
    </motion.p>

    <motion.div
      aria-hidden="true"
      initial={{ scaleX: 0 }}
      animate={isInView ? { scaleX: 1 } : {}}
      transition={{ duration: 0.9, delay: 0.4, ease: EASE_EXPO }}
      className="mx-auto mt-7 h-px w-24 origin-center"
      style={{ background: `linear-gradient(90deg, transparent, ${C.yellow}, transparent)` }}
    />
  </div>
);

// ─── Stat card ────────────────────────────────────────────────────────────────
const StatCard = ({ stat, index, isInView }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.9 }}
    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
    transition={{ duration: 0.6, delay: 0.1 + index * 0.09, ease: EASE_EXPO }}
    whileHover={{ y: -6, scale: 1.05, transition: { duration: 0.25 } }}
    className="flex flex-col items-center gap-1.5 px-5 py-5 rounded-2xl border cursor-default"
    style={{
      background: C.white,
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderColor: `${C.limeGreen}50`,
      boxShadow: `0 4px 20px ${C.primaryGreen}0d`,
    }}
  >
    <span aria-hidden="true" className="text-2xl">{stat.icon}</span>
    <span
      className="text-xl sm:text-2xl font-bold"
      style={{ fontFamily: "'Cormorant Garamond', serif", color: C.brandDark }}
    >
      {stat.value}
    </span>
    <span
      className="text-[10px] font-bold tracking-widest uppercase"
      style={{ fontFamily: "'Nunito', sans-serif", color: "#6b8f6e" }}
    >
      {stat.label}
    </span>
  </motion.div>
);

// ─── Info card (glass panel) ──────────────────────────────────────────────────
const InfoCard = ({ children, delay = 0, isInView }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.75, delay, ease: EASE_EXPO }}
    className="rounded-[24px] p-6 sm:p-8 border"
    style={{
      background: C.white,
      backdropFilter: "blur(24px)",
      WebkitBackdropFilter: "blur(24px)",
      borderColor: `${C.limeGreen}45`,
      boxShadow: `0 6px 32px ${C.primaryGreen}0d`,
    }}
  >
    {children}
  </motion.div>
);

// ─── Social icon button ───────────────────────────────────────────────────────
const SocialBtn = ({ social, index, isInView }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.7, y: 16 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.55 + index * 0.08, ease: EASE_EXPO }}
      whileHover={{ y: -6, scale: 1.15 }}
      whileTap={{ scale: 0.93 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="flex flex-col items-center gap-1.5"
      aria-label={social.label}
    >
      <motion.div
        animate={{
          boxShadow: hovered ? `0 8px 28px ${social.color}55` : `0 2px 12px ${C.primaryGreen}10`,
          background: hovered ? `${social.color}18` : C.white,
        }}
        transition={{ duration: 0.3 }}
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center border"
        style={{
          backdropFilter: "blur(12px)",
          borderColor: hovered ? `${social.color}40` : `${C.limeGreen}50`,
          transition: "border-color 0.3s",
        }}
      >
        <img src={social.icon} alt="" aria-hidden="true" className="w-6 h-6 object-contain" />
      </motion.div>
      <motion.span
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 4 }}
        transition={{ duration: 0.25 }}
        className="text-[10px] font-bold tracking-wide"
        style={{ fontFamily: "'Nunito', sans-serif", color: social.color }}
      >
        {social.label}
      </motion.span>
    </motion.a>
  );
};

// ─── Contact section ──────────────────────────────────────────────────────────
const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      className="relative overflow-hidden"
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

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {stats.map((s, i) => (
            <StatCard key={s.label} stat={s} index={i} isInView={isInView} />
          ))}
        </div>

        {/* Main info grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">

          {/* Farm info card */}
          <InfoCard delay={0.2} isInView={isInView}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ background: `${C.limeGreen}30` }}>
                🌱
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase"
                  style={{ fontFamily: "'Nunito', sans-serif", color: C.mediumGreen }}>
                  About the Farm
                </p>
                <h3 className="text-lg font-bold"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: C.brandDark }}>
                  Organic Since 1969
                </h3>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { icon: "🚜", text: "300+ Daily Visitors"     },
                { icon: "🥕", text: "100+ Organic Products"   },
                { icon: "🌾", text: "Certified Organic Farm"   },
                { icon: "🌍", text: "Exporting All Over India" },
              ].map((item, i) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, x: -16 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.07, ease: EASE_EXPO }}
                  className="flex items-center gap-3 p-3 rounded-xl"
                  style={{ background: `${C.limeGreen}22` }}
                >
                  <span aria-hidden="true" className="text-lg">{item.icon}</span>
                  <span className="text-sm font-semibold"
                    style={{ fontFamily: "'Nunito', sans-serif", color: "#3a5c3e" }}>
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </InfoCard>

          {/* Contact details card */}
          <InfoCard delay={0.3} isInView={isInView}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ background: `${C.yellow}25` }}>
                📞
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase"
                  style={{ fontFamily: "'Nunito', sans-serif", color: C.brandDark }}>
                  Reach Us
                </p>
                <h3 className="text-lg font-bold"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: C.brandDark }}>
                  Contact Info
                </h3>
              </div>
            </div>

            <div className="space-y-4">
              {/* Phone */}
              <motion.a
                href={PHONE_URL}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-4 p-4 rounded-2xl border cursor-pointer"
                style={{
                  background: `${C.limeGreen}18`,
                  borderColor: `${C.mediumGreen}28`,
                  textDecoration: "none",
                }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                  style={{ background: `${C.limeGreen}40` }}>
                  📲
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-widest uppercase"
                    style={{ fontFamily: "'Nunito', sans-serif", color: "#6b8f6e" }}>Phone</p>
                  <p className="text-base font-bold"
                    style={{ fontFamily: "'Nunito', sans-serif", color: C.darkGreen }}>
                    +91 90 7548 1074
                  </p>
                </div>
              </motion.a>

              {/* Email */}
              <motion.a
                href={`mailto:${EMAIL}`}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-4 p-4 rounded-2xl border cursor-pointer"
                style={{
                  background: `${C.yellow}14`,
                  borderColor: `${C.yellow}30`,
                  textDecoration: "none",
                }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                  style={{ background: `${C.yellow}30` }}>
                  ✉️
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold tracking-widest uppercase"
                    style={{ fontFamily: "'Nunito', sans-serif", color: "#6b8f6e" }}>Email</p>
                  <p className="text-sm font-bold truncate"
                    style={{ fontFamily: "'Nunito', sans-serif", color: C.darkGreen }}>
                    {EMAIL}
                  </p>
                </div>
              </motion.a>

              {/* Address */}
              <motion.div
                whileHover={{ x: 4 }}
                transition={{ duration: 0.25 }}
                className="flex items-start gap-4 p-4 rounded-2xl border"
                style={{
                  background: `${C.brandLight}14`,
                  borderColor: `${C.brandLight}30`,
                }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 mt-0.5"
                  style={{ background: `${C.brandLight}30` }}>
                  📍
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-widest uppercase mb-1"
                    style={{ fontFamily: "'Nunito', sans-serif", color: "#6b8f6e" }}>Address</p>
                  <p className="text-sm leading-relaxed"
                    style={{ fontFamily: "'Nunito', sans-serif", color: "#4a6b4e" }}>
                    Lingmala, Panchgani‑Mahabaleshwar Rd,<br />
                    near Courtyard by Marriott,<br />
                    Mahabaleshwar, MH 412806
                  </p>
                </div>
              </motion.div>
            </div>
          </InfoCard>

          {/* Map card */}
          <InfoCard delay={0.4} isInView={isInView}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ background: `${C.mediumGreen}20` }}>🗺️</div>
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase"
                  style={{ fontFamily: "'Nunito', sans-serif", color: C.mediumGreen }}>Find Us Here</p>
                <h3 className="text-lg font-bold"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: C.brandDark }}>Our Location</h3>
              </div>
            </div>

            <div className="relative w-full rounded-2xl overflow-hidden"
              style={{ height: "260px", boxShadow: `0 4px 24px ${C.primaryGreen}18` }}>
              <iframe
                title="Dhanashree Garden location on Google Maps"
                className="w-full h-full"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4514.226208344373!2d73.68835950940935!3d17.93231083320438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc265e7cb123caf%3A0xa60066711bfa6993!2sDhanashree%20Garden%20Strawberry%20Picking%20Farm%20Mahabaleshwar!5e0!3m2!1sen!2sin!4v1738059563078!5m2!1sen!2sin"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: "none" }}
              >
                <p style={{ padding: 16, fontFamily: "'Nunito', sans-serif", fontSize: 14, color: "#4a6b4e" }}>
                  Map could not load.{" "}
                  <a
                    href="https://maps.google.com/?q=Dhanashree+Garden+Strawberry+Picking+Farm+Mahabaleshwar"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: C.primaryGreen }}
                  >
                    Open in Google Maps →
                  </a>
                </p>
              </iframe>

              <div
                aria-hidden="true"
                className="absolute top-3 left-3 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5"
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  background: "rgba(255,255,255,0.92)",
                  backdropFilter: "blur(10px)",
                  color: C.brandDark,
                  boxShadow: `0 2px 12px ${C.primaryGreen}20`,
                }}
              >
                <span
                  aria-hidden="true"
                  className="w-1.5 h-1.5 rounded-full inline-block animate-pulse"
                  style={{ background: C.mediumGreen }}
                />
                Dhanashree Garden
              </div>
            </div>

            <motion.a
              href="https://maps.google.com/?q=Dhanashree+Garden+Strawberry+Picking+Farm+Mahabaleshwar"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, boxShadow: `0 6px 20px ${C.mediumGreen}30` }}
              whileTap={{ scale: 0.97 }}
              className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold border"
              style={{
                fontFamily: "'Nunito', sans-serif",
                background: `${C.limeGreen}25`,
                borderColor: `${C.mediumGreen}35`,
                color: C.brandDark,
                textDecoration: "none",
              }}
            >
              🧭 Get Directions →
            </motion.a>
          </InfoCard>
        </div>

        {/* Social icons row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5, ease: EASE_EXPO }}
          className="flex flex-col items-center gap-5"
        >
          <p className="text-xs font-bold tracking-[0.22em] uppercase"
            style={{ fontFamily: "'Nunito', sans-serif", color: "#6b8f6e" }}>
            Follow Our Journey
          </p>
          <div className="flex items-start justify-center gap-4 sm:gap-6 flex-wrap">
            {socials.map((s, i) => (
              <SocialBtn key={s.label} social={s} index={i} isInView={isInView} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// ─── Footer bar ───────────────────────────────────────────────────────────────
const FooterBar = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const year = new Date().getFullYear();

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.7, ease: EASE_EXPO }}
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${C.brandDark} 0%, ${C.darkGreen} 50%, ${C.brandDark} 100%)`,
      }}
    >
      {/* Top shimmer line */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${C.yellow}66, transparent)` }}
      />
      {/* Dot grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, ${C.limeGreen}10 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 py-6 sm:py-8">
        {/* Brand + social row */}
        <div className="flex items-center justify-between gap-4 mb-4 sm:mb-0">
          {/* Brand */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <motion.span
              aria-hidden="true"
              animate={{ rotate: [0, 10, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="text-xl sm:text-2xl select-none"
            >🍓</motion.span>
            <div>
              <p
                className="text-xs sm:text-sm font-bold leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: C.white, letterSpacing: "0.02em" }}
              >
                Dhanashree Garden
              </p>
              <p
                className="text-[9px] sm:text-[10px] font-semibold tracking-widest uppercase"
                style={{ fontFamily: "'Nunito', sans-serif", color: `${C.limeGreen}cc` }}
              >
                Mahabaleshwar · Est. 1969
              </p>
            </div>
          </div>

          {/* Mini social icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {socials.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.10)" }}
                aria-label={s.label}
              >
                <img src={s.icon} alt="" aria-hidden="true" className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Mobile divider */}
        <div
          aria-hidden="true"
          className="sm:hidden my-4 h-px w-full"
          style={{ background: `${C.limeGreen}25` }}
        />

        {/* Copyright — mobile */}
        <div className="sm:hidden text-center">
          <p
            className="text-[10px]"
            style={{ fontFamily: "'Nunito', sans-serif", color: "rgba(255,255,255,0.3)" }}
          >
            © {year} Dhanashree Garden. All Rights Reserved.
          </p>
        </div>

        {/* Copyright — desktop */}
        <div className="hidden sm:flex items-center justify-center mt-5">
          <p
            className="text-xs"
            style={{ fontFamily: "'Nunito', sans-serif", color: "rgba(255,255,255,0.3)" }}
          >
            © {year} Dhanashree Garden. All Rights Reserved.
          </p>
        </div>
      </div>

      {/* Bottom shimmer line */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${C.limeGreen}40, transparent)` }}
      />
    </motion.footer>
  );
};

// ─── Root export ──────────────────────────────────────────────────────────────
const  ContactUs = () => (
  <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Nunito:wght@400;500;600;700;800&display=swap');
      *, *::before, *::after { box-sizing: border-box; }
    `}</style>
    <ContactSection />
    <FooterBar />
  </>
);

export default ContactUs;