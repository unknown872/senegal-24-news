import Link from "next/link";
import Image from "next/image";

export default function SidebarCard({ post }) {
  return (
    <article
      className="group cursor-pointer"
      style={{ marginBottom: "0.75rem" }}
    >
      <Link href={`/actualites/${post.slug}`}>
        <div
          className="relative overflow-hidden"
          style={{ height: "110px" }}
        >
          {/* Image de fond */}
          {post.featuredImage?.url ? (
            <Image
              src={post.featuredImage.url}
              alt={post.featuredImage.altText || post.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full" style={{ background: "#1A1A1A" }} />
          )}

          {/* Overlay dégradé */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)",
            }}
          />

          {/* Contenu */}
          <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
            {/* Titre */}
            <h4
              className="text-white text-xs font-bold leading-snug group-hover:text-red-500 transition-colors duration-200 line-clamp-3"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              {post.title}
            </h4>

            {/* Date */}
            <div className="flex items-center gap-1 mt-1">
              <span
                style={{ background: "#C8102E" }}
                className="w-1 h-1 rounded-full inline-block"
              />
              <p className="text-zinc-400 text-xs">
                {new Date(post.date).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                })}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}