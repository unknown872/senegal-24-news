import Link from "next/link";

export default function Footer({ categories }) {
  return (
    <footer
      style={{ background: "#1A1A1A", borderTop: "1px solid #2A2A2A" }}
      className="py-10 px-4 mt-10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">

          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <h2
              className="text-3xl font-black text-white"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              SENEGAL<span style={{ color: "#C8102E" }}>24</span>
            </h2>
            <p className="text-zinc-500 text-sm mt-3 leading-relaxed">
              Le média de référence au Sénégal. Actualités politiques,
              économiques, culturelles et sportives en temps réel.
            </p>
          </div>

          {/* Rubriques */}
          <div>
            <h3 className="text-white text-xs font-black uppercase tracking-widest mb-4">
              Rubriques
            </h3>
            <ul className="space-y-2">
              {categories?.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/categorie/${cat.slug}`}
                    className="text-zinc-500 text-sm hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* À propos */}
          <div>
            <h3 className="text-white text-xs font-black uppercase tracking-widest mb-4">
              À propos
            </h3>
            <ul className="space-y-2">
              {["Qui sommes-nous", "Contact", "Mentions légales", "Politique de confidentialité"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-zinc-500 text-sm hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          style={{ borderTop: "1px solid #2A2A2A" }}
          className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-zinc-600 text-xs text-center md:text-left">
            © 2026 SENEGAL24 · Tous droits réservés
          </p>
          <div className="flex gap-4">
            {["Facebook", "Twitter", "Instagram", "YouTube"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-zinc-600 text-xs hover:text-white transition-colors uppercase tracking-widest"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}