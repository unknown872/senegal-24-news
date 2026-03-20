import { getPosts, getPostsByCategory } from "@/lib/services/posts";
import HeroSection from "@/components/sections/HeroSection";
import ArticleGrid from "@/components/sections/ArticleGrid";
import BreakingNewsTicker from "@/components/ui/BreakingNewsTicker";

export default async function Home() {
  const [posts, internationalPosts, sportPosts] = await Promise.all([
    getPosts(),
    getPostsByCategory("international", 5),
    getPostsByCategory("sport", 5),
  ]);

  const featured = posts?.slice(0, 3);
  const secondary = posts?.slice(0, 2);
  const rest = posts?.slice(0, 16);

  return (
    <main className="min-h-screen" style={{ background: "#0F0F0F" }}>
      <HeroSection featured={featured} secondary={secondary} />
      <BreakingNewsTicker posts={posts} />
      <ArticleGrid
        posts={rest}
        internationalPosts={internationalPosts}
        sportPosts={sportPosts}
      />
    </main>
  );
}