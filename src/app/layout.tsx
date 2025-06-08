import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:{
    default: "Event-MS",
    template: "%s | Event-MS",
  } ,
  description: "Event-MS is a microservice-based event management system.",
  openGraph: {
    title: "Event-MS",
    description: "Event-MS is a microservice-based event management system.",
  },
  twitter: {
    title: "Event-MS",
    description: "Event-MS is a microservice-based event management system.",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png", 
  },
  themeColor: "#000000",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "Event-MS",
  },
  metadataBase: new URL("https://event-ms.com"),
  alternates: {
    canonical: "https://event-ms.com",
    types: {
      "application/rss+xml": "/feed.xml",
      "application/atom+xml": "/atom.xml",
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    noarchive: false,
  }

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
