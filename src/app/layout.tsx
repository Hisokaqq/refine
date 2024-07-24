import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { getUser } from "@/lib/lucia";
import Nav from "@/components/nav";
import Checker from "./Checker";
import { SpeedInsights } from "@vercel/speed-insights/next"
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className=" fixed top-0 left-0 w-full z-20 bg-white">
          <Nav user={user} />
          <Checker user={user} />
        </div>
        <div className="pt-[3rem] min-h-[calc(100vh-3rem)]">
          {children}
        </div>
        <Toaster />
        <SpeedInsights />
      </body>
    </html>
  );
}
