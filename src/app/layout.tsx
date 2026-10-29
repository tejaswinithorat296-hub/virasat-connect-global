import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Virasat Connect Global — Explore the World's Living Heritage",
  description: "A comprehensive AI-powered platform to discover, preserve, and celebrate world cultural heritage, monuments, traditions, arts, and indigenous cultures.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-full bg-slate-950 text-slate-100 flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
