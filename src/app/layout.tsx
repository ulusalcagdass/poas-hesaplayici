import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "POAS Hesaplayıcı | Gerçek Reklam Kârlılığını Ölç",
  description: "ROAS değil, POAS ile reklamlarınızın gerçek kârlılığını ölçün. Brüt kâr bazlı reklam performansı analizi, senaryo kaydetme ve raporlama.",
  keywords: ["POAS", "ROAS", "reklam kârlılığı", "e-ticaret", "dijital pazarlama", "brüt kâr"],
  authors: [{ name: "POAS Hesaplayıcı" }],
  openGraph: {
    title: "POAS Hesaplayıcı | Gerçek Reklam Kârlılığını Ölç",
    description: "ROAS değil, POAS ile reklamlarınızın gerçek kârlılığını ölçün.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
