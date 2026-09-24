import type { Metadata } from "next";
import {
  Caveat,
  Cormorant_Garamond,
  JetBrains_Mono,
  Noto_Serif,
} from "next/font/google";
import "./globals.css";

import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Mark Stanley",
  description: "CS, Math, Philos @ UW-Madison",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${caveat.variable} ${notoSerif.variable} ${cormorantGaramond.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream">
        <Nav />
        <main className="flex flex-1 flex-col items-center">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
