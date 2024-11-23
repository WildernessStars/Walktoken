"use client";
import InteractContract from "@/components/interact-contract";
import { WalletConnect } from "@/components/wallet-connect";
import TokenMint from "@/components/token-mint";
import HeroSection from '@/components/hero-section'
import PartnersSection from '@/components/partner-section'
import Navbar from "@/components/nav-bar";
import ProductGrid from '@/components/ProductGrid'
import { WalletConnect } from "@/components/wallet-connect";



export default function Home() {
  return (
    
    <div>
       <main className="flex min-h-screen flex-col items-center justify-between">
       <Navbar />
      <HeroSection />
      <PartnersSection />
              <h1 className="text-3xl font-bold mb-8 text-center">Our Products</h1>
      <ProductGrid />
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
<!-- <main className="container mx-auto py-8">

    </main> -->

  );
}

