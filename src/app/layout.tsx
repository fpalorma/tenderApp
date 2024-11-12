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
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col  min-h-screen bg-slate-100 dark:bg-black`}
      >
        <header className=" bg-white shadow-inner mb-2 dark:bg-black" style={{boxShadow: "0px -10px 12px -6px rgba(0,0,0,0.12) inset"}}>
        <h1 className="text-center text-3xl text-red-700 font-bold  ">tender</h1>

        </header>
        
        <main className="flex-grow">
        {children}
        </main>       
        <footer className="bg-body-tertiary text-center text-lg-start w-full shadow-inner ">
  <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}>
    Hecho por
    <a className="text-body" href="https://www.linkedin.com/in/federico-palorma-dev/" target="_blank" rel="noopener"> Federico Palorma</a>
  </div>
</footer>
      </body>
    </html>
  );
}
