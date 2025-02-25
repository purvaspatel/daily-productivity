import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Healthy Reminders - Stay Focused & Productive",
  description: "Boost your productivity and well-being with science-backed reminders for hydration, mindfulness, and breaks. Stay refreshed and focused!",
  keywords: "productivity, health reminders, hydration, mindfulness, break reminders, focus booster, wellness, work-life balance, how can I stay focused at work",
  authors: [{ name: "PurvaPatel", url: "https://purvaspatel24.vercel.app/" }],
  creator: "Purva @VisionNxt",
  openGraph: {
    title: "Healthy Reminders - Stay Focused & Productive",
    description: "Get timely notifications to drink water, stretch, and take mindful breaks. Improve focus and health with science-backed reminders!",
    url: "https://daily-productivity.vercel.app/",
    type: "website",
    images: [
      {
        url: "https://daily-productivity.vercel.app/main.svg",
        width: 1200,
        height: 630,
        alt: "Healthy Reminders Web App",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourTwitterHandle",
    title: "Healthy Reminders - Stay Focused & Productive",
    description: "Boost your focus with hydration, mindfulness, and break reminders. Stay healthy and productive!",
    images: ["https://daily-productivity.vercel.app/main.svg"]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Purva@VisionNxt" />
        <meta name="theme-color" content="#007bff" />
        <link rel="canonical" href="https://daily-productivity.vercel.app/" />
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
