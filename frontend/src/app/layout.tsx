import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./provider";
import { EnvironmentProvider } from "web3-connect-react";
import { Inter } from 'next/font/google'



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