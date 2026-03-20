"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function FeaturedArticle({ posts }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % posts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [posts.length]);

  const prev = () => setCurrent((prev) => (prev - 1 + posts.length) % posts.length);
  const next = () => setCurrent((prev) => (prev + 1) % posts.length);

  const post = posts[current];

  return (
    <div className="relative w-full h-full overflow-hidden group">
      {/* Images */}
      {posts.map((p, i) => (
        <div
          key={p.id}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          {p.featuredImage?.url ? (
            <Image
              src={p.featuredImage.url}
              alt={p.featuredImage.altText || p.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-zinc-800" />
          )}
        </div>
      ))}

      {/* Overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
        }}
      />

      {/* Contenu */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 z-20">
        {post.categories?.[0].name && (
          <span
            style={{ background: "#C8102E" }}
            className="text-white text-xs font-bold uppercase tracking-widest px-3 py-1 mb-3 inline-block"
          >
            {post.categories?.[0].name}
          </span>
        )}
        <h2
          className="text-white text-xl md:text-3xl font-black leading-tight mt-2"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          <Link
            href={`/actualites/${post.slug}`}
            className="hover:text-red-500 transition-colors"
          >
            {post.title}
          </Link>
        </h2>
        <div className="hidden md:flex items-center gap-3 mt-4 text-zinc-400 text-xs">
          <span>
            {new Date(post.date).toLocaleDateString("fr-FR", {
              day: "numeric", month: "long", year: "numeric",
            })}
          </span>
        </div>

        {/* Dots */}
        <div className="flex items-center gap-2 mt-4">
          {posts.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="transition-all duration-300"
              style={{
                width: i === current ? "24px" : "8px",
                height: "8px",
                borderRadius: i === current ? "4px" : "50%",
                background: i === current ? "#C8102E" : "rgba(255,255,255,0.4)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Boutons Prev / Next */}
      <button
        onClick={prev}
        className="absolute cursor-pointer left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 text-white hover:text-red-500 transition-colors"
        style={{ background: "rgba(0,0,0,0.5)", padding: "8px 12px", fontSize: "18px" }}
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute cursor-pointer right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 text-white hover:text-red-500 transition-colors"
        style={{ background: "rgba(0,0,0,0.5)", padding: "8px 12px", fontSize: "18px" }}
      >
        ›
      </button>
    </div>
  );
}