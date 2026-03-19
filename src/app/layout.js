import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import NavbarSecondary from "@/components/layout/NavbarSecondary";
import Footer from "@/components/layout/Footer";
import { getCategories } from "@/lib/services/categories";
import "./globals.css";

export const metadata = {
  title: {
    default: "SENEGAL24 - L'actualité en temps réel",
    template: "%s | SENEGAL24",
  },
  description: "Le média de référence au Sénégal. Actualités politiques, économiques, culturelles et sportives en temps réel.",
  keywords: ["Sénégal", "actualité", "news", "politique", "économie", "sport", "culture"],
  authors: [{ name: "SENEGAL24" }],
  creator: "SENEGAL24",
  publisher: "SENEGAL24",
  metadataBase: new URL("https://senegal24.com"),
  openGraph: {
    type: "website",
    locale: "fr_SN",
    url: "https://senegal24.com",
    siteName: "SENEGAL24",
    title: "SENEGAL24 - L'actualité en temps réel",
    description: "Le média de référence au Sénégal.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SENEGAL24",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SENEGAL24 - L'actualité en temps réel",
    description: "Le média de référence au Sénégal.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({ children }) {
  const categories = await getCategories();

  return (
    <html lang="fr">
      <body style={{ background: "#0F0F0F", paddingTop: "80px" }}>
        <TopBar categories={categories}/>
        <Navbar categories={categories} />
        <NavbarSecondary categories={categories} />
        {children}
        <Footer categories={categories} />
      </body>
    </html>
  );
}