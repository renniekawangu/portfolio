import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { DataProvider } from "./admin/data-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "b34st web - Security Research & Web Development",
  description: "Security researcher and web developer. Cybersecurity writeups, bug bounties, and full-stack development services.",
  keywords: ["security research", "cybersecurity", "bug bounties", "web development", "penetration testing"],
  authors: [{ name: "b34st web" }],
  creator: "b34st web",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://b34stweb.vercel.app",
    title: "b34st web - Security Research & Web Development",
    description: "Security researcher and web developer. Cybersecurity writeups, bug bounties, and full-stack development services.",
    images: [
      {
        url: "https://b34stweb.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "b34st web"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "b34st web - Security Research & Web Development",
    description: "Security researcher and web developer. Cybersecurity writeups, bug bounties, and full-stack development services.",
    images: ["https://b34stweb.vercel.app/og-image.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: "index, follow"
  },
  verification: {
    google: "your-google-verification-code"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DataProvider>
          <Header />
          {children}
          <Footer />
        </DataProvider>
      </body>
    </html>
  );
}
