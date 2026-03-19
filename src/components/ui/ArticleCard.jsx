import Link from "next/link";
import Image from "next/image";

export default function ArticleCard({ post }) {
  return (
    <article className="group cursor-pointer" style={{ marginBottom: "1.5rem" }}>
      <div className="relative overflow-hidden" style={{ height: "200px" }}>
        {post.featuredImage?.node?.sourceUrl ? (
          <Image
            src={post.featuredImage.node.sourceUrl}
            alt={post.featuredImage.node.altText || post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full bg-zinc-800" />
        )}
        {post.categories?.nodes?.[0] && (
          <div className="absolute bottom-0 left-0 right-0 flex justify-center">
            <span
              style={{ background: "#C8102E" }}
              className="text-white text-xs font-black uppercase tracking-widest px-6 py-1.5"
            >
              {post.categories.nodes[0].name}
            </span>
          </div>
        )}
      </div>

      <div className="p-3 md:p-4">
        <p
          style={{ color: "#C8102E" }}
          className="text-xs font-black uppercase tracking-widest mb-1"
        >
          {post.categories?.nodes?.[0]?.name}
        </p>
        <h3
          className="text-white text-base md:text-lg font-black leading-snug uppercase group-hover:text-red-400 transition-colors"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          <Link href={`/actualites/${post.slug}`}>{post.title}</Link>
        </h3>
        <div className="flex items-center gap-3 mt-2 text-zinc-500 text-xs flex-wrap">
          <span className="flex items-center gap-1">
            🕐 {new Date(post.date).toLocaleDateString("fr-FR", {
              day: "numeric", month: "long", year: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1">
            💬 {Math.floor(Math.random() * 100)} Commentaires
          </span>
        </div>
      </div>
    </article>
  );
}