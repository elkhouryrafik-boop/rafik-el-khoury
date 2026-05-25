import type { Metadata } from "next";
import { Newsreader, Geist_Mono, Archivo_Black } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

const newsreader = Newsreader({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const archivoBlack = Archivo_Black({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Rafik El Khoury — AI Engineer for the Built Environment",
  description:
    "Civil engineer, urban planner, and AI researcher at IAAC. Building tools for automated compliance checking, project-manager communication pipelines, and augmented regenerative design.",
  metadataBase: new URL("https://rafik-el-khoury.pages.dev"),
  openGraph: {
    title: "Rafik El Khoury — AI Engineer for the Built Environment",
    description:
      "Civil engineer, urban planner, and AI researcher at IAAC.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${geistMono.variable} ${archivoBlack.variable}`}
    >
      <body className="min-h-dvh">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
