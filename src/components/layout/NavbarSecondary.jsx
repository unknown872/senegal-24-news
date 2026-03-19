"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function NavbarSecondary({ categories }) {
  const [scrolled, setScrolled] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(90);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
      const navbar = document.querySelector("nav") || document.querySelector("[data-navbar]");
      if (navbar) setNavbarHeight(navbar.offsetHeight);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!scrolled) return null;

  return (
    <div
      style={{
        background: "#111111",
        borderBottom: "1px solid #2A2A2A",
        position: "fixed",
        top: `${navbarHeight}px`,
        left: 0,
        right: 0,
        zIndex: 30,
        animation: "slideDown 0.3s ease",
      }}
      className="px-6 hidden md:flex"
    >
      <style>{`
        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-1 overflow-x-auto">
        <Link href="/" className="text-zinc-400 text-xs font-bold uppercase tracking-widest px-4 py-3 whitespace-nowrap hover:text-white border-b-2 border-transparent hover:border-red-600 transition-all">
          À la une
        </Link>
        {categories?.map((cat) => (
          <Link key={cat.id} href={`/categorie/${cat.slug}`} className="text-zinc-400 text-xs font-bold uppercase tracking-widest px-4 py-3 whitespace-nowrap hover:text-white border-b-2 border-transparent hover:border-red-600 transition-all">
            {cat.name}
          </Link>
        ))}
      </div>
    </div>
  );
}