import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
// import Script from "next/script";

const circularStd = localFont({
  src: [
    {
      path: "../public/fonts/circular-std-medium-500.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-circular",
});


export const metadata: Metadata = {
  title: "Leading Alpha bootcamp",
  description: "Register for the Leading Alpha bootcamp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${circularStd.variable}`}>
      <head>
        {/* Favicon using your logo */}
        <link rel="icon" href="/VERTICAL BRANDMARK GREEN 2.png" type="image/png" />
      </head>
      <body
        className="font-sans"
      >
        {children}
      </body>
    </html>
  );
}
