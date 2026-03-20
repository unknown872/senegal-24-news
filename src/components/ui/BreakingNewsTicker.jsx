"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function BreakingNewsTicker({ posts }) {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % posts.length);
        setVisible(true);
      }, 500);
    }, 3000);
    return () => clearInterval(timer);
  }, [posts.length]);

  return (
    <div
      style={{ background: "#C8102E" }}
      className="py-3 px-6 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex items-center gap-4">
        <span className="text-white text-xs font-black uppercase tracking-widest whitespace-nowrap">
          🔴 À la une
        </span>
        <span className="text-white opacity-40">|</span>
        <div
          style={{
            transition: "opacity 0.5s ease, transform 0.5s ease",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(-10px)",
          }}
        >
          <Link
            href={`/actualites/${posts?.[current]?.slug}`}
            className="text-white text-sm font-medium hover:underline"
          >
            {posts?.[current]?.title}
          </Link>
        </div>
      </div>
    </div>
  );
}