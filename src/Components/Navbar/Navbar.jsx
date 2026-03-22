import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

import str_logo from "../../assets/str_logo.webp";

// ─── Easing ──────────────────────────────────────────────────────────────────
const EASE_EXPO = [0.16, 1, 0.3, 1];

// ─── Brand Palette (mirrors Services, OrganicProduce & HeroPage exactly) ─────
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

// ─── Constants ───────────────────────────────────────────────────────────────
const WHATSAPP_URL = "https://wa.me/919075481074";

// ─── Nav items ───────────────────────────────────────────────────────────────
const navItems = [
  { label: "Home",           path: "/"                     },
  { label: "About",          path: "/aboutus"              },
  { label: "Products",       path: "/products"             },
  { label: "Services",       path: "/services"             },
  { label: "Group Bookings", path: "/group-bookings"       },
  { label: "Gallery",        path: "/gallery"              },
  { label: "Testimonials",   path: "/written-testimonials" },
  { label: "FAQ",            path: "/faq"                  },
  { label: "Contact Us",     path: "/contact"              },
];

// ─── Desktop Nav Link ────────────────────────────────────────────────────────
const DesktopNavLink = ({ item, scrolled }) => (
  <NavLink to={item.path}>
    {({ isActive }) => (
      <div className="relative flex flex-col items-center gap-0.5">
        <motion.span
          whileHover={{ y: -1 }}
          transition={{ duration: 0.2 }}
          className="text-sm font-bold tracking-wide transition-colors duration-200"
          style={{
            fontFamily: "'Nunito', sans-serif",
            color: isActive
              ? C.primaryGreen
              : scrolled
              ? "#374151"
              : "rgba(255,255,255,0.92)",
          }}
        >
          {item.label}
        </motion.span>

        {/* Active underline — primaryGreen */}
        <motion.div
          layoutId={`nav-active-dot-${item.label}`}
          className="h-0.5 rounded-full"
          style={{ background: C.primaryGreen }}
          animate={{ width: isActive ? "100%" : "0%" }}
          transition={{ duration: 0.35, ease: EASE_EXPO }}
        />
      </div>
    )}
  </NavLink>
);

// ─── Mobile Menu Drawer ───────────────────────────────────────────────────────
const MobileDrawer = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-40"
          style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(4px)" }}
          onClick={onClose}
        />

        {/* Drawer panel */}
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE_EXPO }}
          className="fixed top-0 right-0 h-full w-[300px] max-w-[88vw] z-50 flex flex-col overflow-y-auto"
          style={{
            background: "rgba(255,255,255,0.96)",
            backdropFilter: "blur(32px)",
            WebkitBackdropFilter: "blur(32px)",
            boxShadow: "-8px 0 48px rgba(0,0,0,0.14)",
          }}
        >
          {/* Drawer header */}
          <div
            className="flex items-center justify-between px-6 py-5 border-b"
            style={{ borderColor: `${C.primaryGreen}18` }}
          >
            <div className="flex items-center gap-2.5">
              <motion.span
                animate={{ rotate: [0, 10, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="text-xl select-none"
                aria-hidden="true"
              >
                🍓
              </motion.span>
              <div>
                <p
                  className="text-sm font-bold text-gray-800"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Dhanashree Garden
                </p>
                <p
                  className="text-[10px] font-bold tracking-widest uppercase"
                  style={{ fontFamily: "'Nunito', sans-serif", color: C.primaryGreen }}
                >
                  Mahabaleshwar
                </p>
              </div>
            </div>

            {/* Close button — limeGreen tint bg, primaryGreen icon */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.25 }}
              onClick={onClose}
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: `${C.limeGreen}30`, color: C.primaryGreen }}
              aria-label="Close menu"
            >
              <FaTimes size={16} />
            </motion.button>
          </div>

          {/* Top accent bar — matches Services/OrganicProduce gradient style */}
          <div
            aria-hidden="true"
            className="h-0.5 w-full"
            style={{
              background: `linear-gradient(90deg, ${C.primaryGreen}, ${C.limeGreen}, transparent)`,
            }}
          />

          {/* Nav links */}
          <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
            {navItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: EASE_EXPO }}
              >
                <NavLink to={item.path} onClick={onClose}>
                  {({ isActive }) => (
                    <motion.div
                      whileHover={{ x: 4 }}
                      className="flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-colors"
                      style={{
                        fontFamily: "'Nunito', sans-serif",
                        color:      isActive ? C.primaryGreen : "#374151",
                        background: isActive ? `${C.limeGreen}28` : "transparent",
                      }}
                    >
                      {item.label}
                      {isActive && (
                        <div
                          aria-hidden="true"
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: C.mediumGreen }}
                        />
                      )}
                    </motion.div>
                  )}
                </NavLink>
              </motion.div>
            ))}
          </nav>

          {/* Drawer footer CTA — yellow fill + brandDark text, matches Services "Book Now" */}
          <div
            className="px-6 pb-8 pt-4 border-t"
            style={{ borderColor: `${C.primaryGreen}18` }}
          >
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.03, boxShadow: `0 14px 40px ${C.yellow}55` }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-bold"
              style={{
                fontFamily: "'Nunito', sans-serif",
                background: C.yellow,
                color: C.brandDark,
                boxShadow: `0 6px 22px ${C.yellow}44`,
                textDecoration: "none",
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill={C.brandDark} aria-hidden="true" style={{ flexShrink: 0 }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Book Visit
            </motion.a>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

// ─── Navbar Root ─────────────────────────────────────────────────────────────
const Navbar = () => {
  const [isOpen,   setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden,   setHidden]   = useState(false);
  const lastY = useRef(0);
  const location = useLocation();

  // Only go fully transparent on the home/hero page at the very top
  const isHero = location.pathname === "/";
  // Navbar should look "solid" when: scrolled past threshold, OR not on hero page
  const solid = scrolled || !isHero;

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 40);
    setHidden(y > lastY.current && y > 120);
    lastY.current = y;
  });

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Nunito:wght@600;700;800&display=swap');
      `}</style>

      <motion.nav
        animate={{ y: hidden && !isOpen ? "-100%" : "0%" }}
        transition={{ duration: 0.4, ease: EASE_EXPO }}
        className="fixed top-0 left-0 right-0 z-30"
        style={{
          background: solid ? "rgba(255,255,255,0.92)" : "transparent",
          backdropFilter: solid ? "blur(24px)" : "none",
          WebkitBackdropFilter: solid ? "blur(24px)" : "none",
          boxShadow: solid
            ? `0 4px 32px rgba(0,0,0,0.07), 0 0 0 1px ${C.primaryGreen}12`
            : "none",
        }}
      >
        {/* Top micro-strip — primaryGreen → limeGreen, matches Services gradient */}
        <AnimatePresence>
          {solid && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.5, ease: EASE_EXPO }}
              className="absolute top-0 left-0 right-0 h-[2.5px] origin-left"
              aria-hidden="true"
              style={{
                background: `linear-gradient(90deg, ${C.primaryGreen}, ${C.limeGreen}, ${C.primaryGreen})`,
              }}
            />
          )}
        </AnimatePresence>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-16 sm:h-20">

            {/* ── Logo ── */}
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-2.5 flex-shrink-0"
            >
              <NavLink to="/" className="flex items-center gap-2.5" style={{ textDecoration: "none" }}>
                <div style={{ filter: solid ? "none" : "drop-shadow(0 2px 8px rgba(0,0,0,0.3))" }}>
                  <img
                    src={str_logo}
                    alt="Dhanashree Garden"
                    className="h-10 sm:h-12 w-auto object-contain"
                  />
                </div>
                <div className="hidden sm:flex flex-col">
                  <span
                    className="text-base font-bold leading-tight"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      color: solid ? C.brandDark : "rgba(255,255,255,0.97)",
                      textShadow: solid ? "none" : "0 2px 8px rgba(0,0,0,0.3)",
                    }}
                  >
                    Dhanashree Garden
                  </span>
                  <span
                    className="text-[9px] font-bold tracking-[0.2em] uppercase"
                    style={{
                      fontFamily: "'Nunito', sans-serif",
                      color: solid ? C.primaryGreen : "rgba(255,255,255,0.65)",
                    }}
                  >
                    Mahabaleshwar
                  </span>
                </div>
              </NavLink>
            </motion.div>

            {/* ── Desktop nav links ── */}
            <ul className="hidden lg:flex items-center gap-6 xl:gap-7 list-none m-0 p-0">
              {navItems.map((item) => (
                <li key={item.label}>
                  <DesktopNavLink item={item} scrolled={solid} />
                </li>
              ))}
            </ul>

            {/* ── Desktop CTA — yellow fill + brandDark text, matches Services "Book Now" ── */}
            <div className="hidden lg:flex items-center">
              <motion.a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05, boxShadow: `0 8px 24px ${C.yellow}55` }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold"
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  background: C.yellow,
                  color: C.brandDark,
                  boxShadow: `0 4px 16px ${C.yellow}44`,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill={C.brandDark} aria-hidden="true" style={{ flexShrink: 0 }}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Book Visit
              </motion.a>
            </div>

            {/* ── Mobile burger ── */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsOpen(p => !p)}
              className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: solid ? `${C.limeGreen}30` : "rgba(255,255,255,0.15)",
                color:      solid ? C.primaryGreen    : C.white,
                backdropFilter: "blur(10px)",
              }}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0,  opacity: 1 }}
                    exit={{ rotate: 90,  opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaTimes size={18} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90,  opacity: 0 }}
                    animate={{ rotate: 0,   opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaBars size={18} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

          </div>
        </div>
      </motion.nav>

      {/* ── Mobile Drawer ── */}
      <MobileDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default Navbar;