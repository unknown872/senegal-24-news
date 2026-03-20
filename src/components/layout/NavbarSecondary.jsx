"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function NavbarSecondary({ categories }) {
  const [scrolled, setScrolled] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(90);

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
      const navbar =
        document.querySelector("nav") ||
        document.querySelector("[data-navbar]");
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
      className="px-6hidden md:flex"
    >
      <style>{`
        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-1 overflow-x-auto">
        <Link
          href="/"
          className="text-xs font-bold uppercase tracking-widest px-4 py-3 whitespace-nowrap border-b-2 transition-all"
          style={{
            color: pathname === "/" ? "#ffffff" : "#71717a",
            borderColor: pathname === "/" ? "#C8102E" : "transparent",
          }}
        >
          À la une
        </Link>
        {categories?.map((cat) => (
          <Link
            key={cat.id}
            href={`/categorie/${cat.slug}`}
            className="text-xs font-bold uppercase tracking-widest px-4 py-3 whitespace-nowrap border-b-2 transition-all"
            style={{
              color:
                pathname === `/categorie/${cat.slug}` ? "#ffffff" : "#71717a",
              borderColor:
                pathname === `/categorie/${cat.slug}`
                  ? "#C8102E"
                  : "transparent",
            }}
          >
            {cat.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
