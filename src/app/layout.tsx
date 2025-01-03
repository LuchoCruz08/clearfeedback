import type { Metadata } from "next";
import { Geist, Azeret_Mono as Geist_Mono } from "next/font/google";
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
  title: "ClearFeedback",
  description:
    "Simplify feedback collection and drive data-driven decisions with seamless integration and intuitive design.",
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
        suppressHydrationWarning
      >
        <div className="relative min-h-screen">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-purple-50 to-white z-0"></div>
          <div className="relative z-10">{children}</div>
        </div>
      </body>
    </html>
  );
}
