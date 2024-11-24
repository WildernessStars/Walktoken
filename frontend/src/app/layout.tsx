import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./provider";
import { EnvironmentProvider } from "web3-connect-react";
import Navbar from "@/components/nav-bar";
import { Inter } from 'next/font/google'

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
  title: "Walk to Earn",
  description: "Get rewarded for walking joyfully",
};
const inter = Inter({ subsets: ['latin'] })


export default function AuthLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html>
        
            <EnvironmentProvider isMobile={false}>
              <Providers>
        <body  className={inter.className}>
          {/* <Navbar/> */}
          <main className="pt-16">
          {children}
          </main>
          </body>
        </Providers>
        </EnvironmentProvider>
      </html>
    )
  };