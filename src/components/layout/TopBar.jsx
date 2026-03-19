import Link from "next/link";

export default function TopBar({ categories }) {
  return (
    <div
      style={{
        background: "#C8102E",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 0,
        height: "36px",
      }}
      className="px-4 items-center hidden md:flex"
    >
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
        <p className="text-white text-xs font-medium tracking-widest uppercase">
          {new Date().toLocaleDateString("fr-FR", {
            weekday: "long", day: "numeric", month: "long", year: "numeric",
          })}
        </p>
        <div className="flex gap-6 text-white text-xs font-medium tracking-widest uppercase">
          {categories?.map((cat) => (
            <Link key={cat.id} href={`/categorie/${cat.slug}`} className="hover:opacity-70 transition-opacity whitespace-nowrap">
              {cat.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}