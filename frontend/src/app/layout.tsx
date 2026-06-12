import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Career Copilot — AI Career Operating System",
  description:
    "AI-powered career platform with resume analysis, skill gap identification, learning roadmaps, interview coaching, job matching, and blockchain-verified credentials.",
  keywords: [
    "AI career",
    "resume analysis",
    "skill gap",
    "interview preparation",
    "blockchain credentials",
    "career roadmap",
  ],
  openGraph: {
    title: "Career Copilot — AI Career Operating System",
    description: "Launch your career with AI-powered guidance and blockchain verification.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
