"use client";

import InteractContract from "@/components/interact-contract";
import { WalletConnect } from "@/components/wallet-connect";
import TokenMint from "@/components/token-mint";
import HeroSection from '@/components/hero-section'
import PartnersSection from '@/components/partner-section'
import Navbar from "@/components/nav-bar";



export default function Home() {
  return (
    
    <div>
       <main className="flex min-h-screen flex-col items-center justify-between">
       <Navbar />
      <HeroSection />
      <PartnersSection />
    </main>
    <div className="p-4">
      <WalletConnect/>
    </div>
    <div>
      <InteractContract />
    </div>
    <div>
      <TokenMint />
    </div>
   </div>
  );
}
