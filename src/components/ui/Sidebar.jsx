import SidebarCard from "@/components/ui/SidebarCard";

export default function Sidebar({ title, posts, position }) {
  return (
    <aside className="col-span-1">
      {/* Header Sidebar */}
      <div
        className="flex items-center gap-3 mb-6 pb-3"
        style={{ borderBottom: `2px solid #C8102E` }}
      >
        <span
          style={{ background: "#C8102E" }}
          className="w-1 h-5 inline-block"
        />
        <h3 className="text-white text-sm font-black uppercase tracking-widest">
          {title}
        </h3>
      </div>

      {/* Articles */}
      <div>
        {posts?.length > 0 ? (
          posts.map((post) => <SidebarCard key={post.id} post={post} />)
        ) : (
          <p className="text-zinc-600 text-xs">Aucun article disponible</p>
        )}
      </div>
    </aside>
  );
}