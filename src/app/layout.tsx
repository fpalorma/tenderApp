import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "tender",
  description: "Una app para ayudarte a saber el estado del clima y tomar decisiones en cuanto a dónde colgar la ropa a secar",
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
        <h1 className="text-center text-3xl text-red-700 font-bold mb-2">tender</h1>
        <div className="absolute inset-0 top-0 z-[-2] min-h-screen w-fullbg-blue-700"></div>        {children}
      </body>
    </html>
  );
}
