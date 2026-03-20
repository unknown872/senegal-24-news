import { getPostBySlug, getPosts } from "@/lib/services/posts";
import Image from "next/image";
import SidebarCard from "@/components/ui/SidebarCard";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt?.replace(/<[^>]*>/g, "").slice(0, 160),
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt?.replace(/<[^>]*>/g, "").slice(0, 160),
      url: `https://senegal24.com/actualites/${post.slug}`,
      publishedTime: post.date,
      authors: [post.author?.name],
      images: post.featuredImage?.url
        ? [{ url: post.featuredImage.url, width: 1200, height: 630, alt: post.title }]
        : [],
    },
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([
    getPostBySlug(slug),
    getPosts(),
  ]);

  if (!post) return notFound();

  const relatedPosts = allPosts?.filter((p) => p.slug !== slug).slice(0, 8);

  return (
    <main className="min-h-screen" style={{ background: "#0F0F0F" }}>

      {/* Hero Image */}
      <div className="relative w-full" style={{ height: "500px" }}>
        {post.featuredImage?.url ? (
          <Image
            src={post.featuredImage?.url}
            alt={post.featuredImage.altText || post.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-zinc-800" />
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-10 max-w-7xl mx-auto">
          {post.categories?.[0] && (
            <span
              style={{ background: "#C8102E" }}
              className="text-white text-xs font-black uppercase tracking-widest px-3 py-1 inline-block mb-3"
            >
              {post.categories?.[0].name}
            </span>
          )}
          <h1
            className="text-white text-2xl md:text-4xl font-black leading-tight max-w-3xl"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            {post.title}
          </h1>
        </div>
      </div>

      {/* Layout Principal */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Contenu Article */}
        <div className="col-span-1 md:col-span-2">

          {/* Métadonnées */}
          <div
            className="flex flex-wrap items-center gap-4 pb-6 mb-8"
            style={{ borderBottom: "1px solid #2A2A2A" }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0"
              style={{ background: "#C8102E" }}
            >
              {post.author?.name?.charAt(0)}
            </div>
            <div>
              <p className="text-white text-sm font-bold">
                {post.author?.name}
              </p>
              <p className="text-zinc-500 text-xs">
                {new Date(post.date).toLocaleDateString("fr-FR", {
                  weekday: "long", day: "numeric", month: "long", year: "numeric",
                })}
              </p>
            </div>

            {/* Partage */}
            <div className="flex items-center gap-2 md:gap-3 md:ml-auto flex-wrap">
              {["Facebook", "Twitter", "WhatsApp"].map((s) => (
                <button
                  key={s}
                  style={{ background: "#1A1A1A", border: "1px solid #2A2A2A" }}
                  className="text-zinc-400 text-xs font-bold uppercase tracking-widest px-3 py-2 hover:text-white hover:border-red-600 transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Contenu */}
          <div
            className="article-content text-zinc-300 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content?.html }}
          />
        </div>

        {/* Sidebar - cachée sur mobile */}
        <aside className="hidden md:block col-span-1">
          <div className="sticky top-32">
            <div
              className="flex items-center gap-3 mb-6 pb-3"
              style={{ borderBottom: "2px solid #C8102E" }}
            >
              <span style={{ background: "#C8102E" }} className="w-1 h-5 inline-block" />
              <h3 className="text-white text-sm font-black uppercase tracking-widest">
                À lire aussi
              </h3>
            </div>
            {relatedPosts?.map((p) => (
              <SidebarCard key={p.id} post={p} />
            ))}
          </div>
        </aside>

      </div>

      {/* Articles similaires sur mobile uniquement */}
      <div
        className="md:hidden max-w-7xl mx-auto px-4 pb-10"
        style={{ borderTop: "1px solid #2A2A2A" }}
      >
        <div className="flex items-center gap-4 my-6">
          <span style={{ background: "#C8102E" }} className="w-1 h-6 inline-block" />
          <h2 className="text-white text-xl font-black uppercase tracking-widest">
            À lire aussi
          </h2>
        </div>
        <div className="flex flex-col gap-4">
          {relatedPosts?.slice(0, 4).map((p) => (
            <SidebarCard key={p.id} post={p} />
          ))}
        </div>
      </div>

    </main>
  );
}