import { getPostsByCategory } from "@/lib/services/posts";
import { getCategoryBySlug } from "@/lib/services/categories";
import ArticleCard from "@/components/ui/ArticleCard";
import SidebarCard from "@/components/ui/SidebarCard";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) return {};

  return {
    title: `${category.name} - Toute l'actualité`,
    description: category.description || `Toute l'actualité ${category.name} en temps réel sur SENEGAL24.`,
    openGraph: {
      type: "website",
      title: `${category.name} | SENEGAL24`,
      description: category.description || `Toute l'actualité ${category.name} en temps réel sur SENEGAL24.`,
      url: `https://senegal24.com/categorie/${category.slug}`,
    },
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  const [category, posts, latestPosts] = await Promise.all([
    getCategoryBySlug(slug),
    getPostsByCategory(slug, 12),
    getPostsByCategory("", 8),
  ]);

  if (!category) return notFound();

  const featured = posts?.[0];
  const rest = posts?.slice(1);

  return (
    <main className="min-h-screen" style={{ background: "#0F0F0F" }}>

      {/* Header Catégorie */}
      <div
        style={{ background: "#1A1A1A", borderBottom: "1px solid #2A2A2A" }}
        className="py-8 md:py-10 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <span style={{ background: "#C8102E" }} className="w-1 h-8 inline-block" />
            <h1
              className="text-white text-2xl md:text-4xl font-black uppercase tracking-widest"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              {category.name}
            </h1>
          </div>
          {category.description && (
            <p className="text-zinc-500 text-sm ml-4">{category.description}</p>
          )}
          <p className="text-zinc-600 text-xs ml-4 mt-1">
            {category.count} article{category.count > 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Article Featured */}
      {featured && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div
            className="relative overflow-hidden group cursor-pointer"
            style={{ height: "400px" }}
          >
            {featured.featuredImage?.node?.sourceUrl ? (
              <Image
                src={featured.featuredImage.node.sourceUrl}
                alt={featured.featuredImage.node.altText || featured.title}
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
                  "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)",
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
              <span
                style={{ background: "#C8102E" }}
                className="text-white text-xs font-black uppercase tracking-widest px-3 py-1 inline-block mb-3"
              >
                {category.name}
              </span>
              <h2
                className="text-white text-xl md:text-3xl font-black leading-tight"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                <a
                  href={`/actualites/${featured.slug}`}
                  className="hover:text-red-400 transition-colors"
                >
                  {featured.title}
                </a>
              </h2>
              <div className="hidden md:flex items-center gap-3 mt-4 text-zinc-400 text-xs">
                <span className="font-bold text-white">
                  {featured.author?.node?.name}
                </span>
                <span>·</span>
                <span>
                  {new Date(featured.date).toLocaleDateString("fr-FR", {
                    day: "numeric", month: "long", year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Layout Principal */}
      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Grille Articles */}
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-4 mb-6">
            <span style={{ background: "#C8102E" }} className="w-1 h-6 inline-block" />
            <h2 className="text-white text-xl font-black uppercase tracking-widest">
              Tous les articles
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rest?.map((post) => (
              <ArticleCard key={post.id} post={post} />
            ))}
          </div>
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
                Dernières infos
              </h3>
            </div>
            {latestPosts?.map((post) => (
              <SidebarCard key={post.id} post={post} />
            ))}
          </div>
        </aside>

      </div>

      {/* Dernières infos sur mobile */}
      <div
        className="md:hidden max-w-7xl mx-auto px-4 pb-10"
        style={{ borderTop: "1px solid #2A2A2A" }}
      >
        <div className="flex items-center gap-4 my-6">
          <span style={{ background: "#C8102E" }} className="w-1 h-6 inline-block" />
          <h2 className="text-white text-xl font-black uppercase tracking-widest">
            Dernières infos
          </h2>
        </div>
        <div className="flex flex-col gap-4">
          {latestPosts?.slice(0, 4).map((post) => (
            <SidebarCard key={post.id} post={post} />
          ))}
        </div>
      </div>

    </main>
  );
}