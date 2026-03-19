import ArticleCard from "@/components/ui/ArticleCard";
import Sidebar from "@/components/ui/Sidebar";

export default function ArticleGrid({ posts, internationalPosts, sportPosts }) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid grid-cols-5 gap-8">
        {/* Sidebar Gauche - International */}
        <Sidebar
          title="International"
          posts={internationalPosts}
          position="left"
        />

        {/* Grille Centrale */}
        <div className="col-span-3">
          <div className="flex items-center gap-4 mb-8">
            <span
              style={{ background: "#C8102E" }}
              className="w-1 h-6 inline-block"
            />
            <h2 className="text-white text-xl font-black uppercase tracking-widest">
              À la une
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-0">
            {posts?.map((post) => (
              <ArticleCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* Sidebar Droite - Sport */}
        <Sidebar title="Sport" posts={sportPosts} position="right" />
      </div>
    </section>
  );
}
