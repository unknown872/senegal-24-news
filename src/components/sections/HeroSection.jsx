import Image from "next/image";
import Link from "next/link";
import FeaturedArticle from "@/components/ui/FeaturedArticle";

export default function HeroSection({ featured, secondary }) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Carrousel */}
        <div
          className="col-span-1 md:col-span-2 relative"
          style={{ height: "500px", minHeight: "500px" }}
        >
          <FeaturedArticle posts={featured} />
        </div>

        {/* Articles Secondaires - cachés sur mobile */}
        <div
          className="hidden md:flex col-span-1 flex-col gap-4"
          style={{ height: "500px" }}
        >
          {secondary?.map((post) => (
            <div
              key={post.id}
              className="relative overflow-hidden group cursor-pointer flex-1"
            >
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
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)",
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                {post.categories?.nodes?.[0] && (
                  <span
                    style={{ background: "#C8102E" }}
                    className="text-white text-xs font-bold uppercase tracking-widest px-2 py-0.5 inline-block mb-2"
                  >
                    {post.categories.nodes[0].name}
                  </span>
                )}
                <h3
                  className="text-white text-sm font-bold leading-snug"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  <Link
                    href={`/actualites/${post.slug}`}
                    className="hover:text-red-400 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}