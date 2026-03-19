import Link from "next/link";
import Image from "next/image";

export default function SidebarCard({ post }) {
  return (
    <article className="group flex gap-3 cursor-pointer" style={{ borderBottom: "1px solid #2A2A2A", paddingBottom: "1rem", marginBottom: "1rem" }}>
      <div className="relative overflow-hidden flex-shrink-0" style={{ width: "80px", height: "80px" }}>
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
      </div>
      <div className="flex-1">
        <h4
          className="text-white text-sm font-bold leading-snug group-hover:text-red-400 transition-colors"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          <Link href={`/actualites/${post.slug}`}>{post.title}</Link>
        </h4>
        <p className="text-zinc-500 text-xs mt-1">
          {new Date(post.date).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
          })}
        </p>
      </div>
    </article>
  );
}