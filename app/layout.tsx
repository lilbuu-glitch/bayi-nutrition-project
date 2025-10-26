import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Makanan Bayi 0–1 Tahun",
  description: "Rekomendasi makanan bayi berdasarkan usia: 0–4, 4–6, 6–9, dan 9–12 bulan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
