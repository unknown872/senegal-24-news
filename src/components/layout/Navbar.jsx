"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar({ categories }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: scrolled ? 0 : "36px",
          left: 0,
          right: 0,
          zIndex: 40,
          transition: "top 0.3s ease",
          background: "#1A1A1A",
          borderBottom: "1px solid #2A2A2A",
        }}
        className="py-4 px-4 md:top-[36px]"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" onClick={() => setMenuOpen(false)}>
            <h1
              className="text-3xl md:text-4xl font-black text-white tracking-tight"
              style={{ fontFamily: "'Georgia', serif", letterSpacing: "-1px" }}
            >
              SENEGAL<span style={{ color: "#C8102E" }}>24</span>
            </h1>
            <p className="text-xs text-zinc-500 tracking-widest uppercase mt-1 hidden md:block">
              L'actualité en temps réel
            </p>
          </Link>

          {/* Desktop bouton */}
          <div className="hidden md:flex items-center gap-4">
            <button
              style={{ background: "#C8102E" }}
              className="text-white cursor-pointer text-xs font-bold uppercase tracking-widest px-5 py-2.5 hover:opacity-90 transition-opacity"
            >
              Newsletter
            </button>
          </div>

          {/* Mobile Burger */}
          <button
            className="md:hidden flex flex-col justify-center gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span
              style={{ background: "white", display: "block", height: "2px", width: "24px", transition: "transform 0.3s ease", transform: menuOpen ? "rotate(45deg) translateY(8px)" : "none" }}
            />
            <span
              style={{ background: "white", display: "block", height: "2px", width: "24px", transition: "opacity 0.3s ease", opacity: menuOpen ? 0 : 1 }}
            />
            <span
              style={{ background: "white", display: "block", height: "2px", width: "24px", transition: "transform 0.3s ease", transform: menuOpen ? "rotate(-45deg) translateY(-8px)" : "none" }}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "#0F0F0F",
          zIndex: 35,
          transition: "transform 0.4s ease",
          transform: menuOpen ? "translateX(0)" : "translateX(-100%)",
          overflowY: "auto",
          paddingTop: "80px",
        }}
      >
        <div className="px-6 py-8 flex flex-col gap-2">
          {/* À la une */}
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            style={{ borderBottom: "1px solid #2A2A2A" }}
            className="text-white text-xl font-black uppercase tracking-widest py-4 hover:text-red-500 transition-colors"
          >
            À la une
          </Link>

          {/* Catégories dynamiques */}
          {categories?.map((cat) => (
            <Link
              key={cat.id}
              href={`/categorie/${cat.slug}`}
              onClick={() => setMenuOpen(false)}
              style={{ borderBottom: "1px solid #2A2A2A" }}
              className="text-white text-xl font-black uppercase tracking-widest py-4 hover:text-red-500 transition-colors"
            >
              {cat.name}
            </Link>
          ))}

          {/* Newsletter */}
          <button
            style={{ background: "#C8102E" }}
            className="text-white cursor-pointer text-sm font-bold uppercase tracking-widest px-5 py-4 mt-6 w-full"
          >
            Newsletter
          </button>
        </div>
      </div>
    </>
  );
}