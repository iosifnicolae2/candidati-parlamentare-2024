import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ro } from "./i18n/ro";

const inter = Inter({ subsets: ["latin-ext"] });

export const metadata: Metadata = {
  title: ro.meta.title,
  description: ro.meta.description,
  openGraph: {
    title: ro.meta.title,
    description: ro.meta.description,
    locale: "ro_RO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body className={inter.className}>{children}</body>
    </html>
  );
}