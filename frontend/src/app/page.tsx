"use client";
import InteractContract from "@/components/interact-contract";
import { WalletConnect } from "@/components/wallet-connect";
import TokenMint from "@/components/token-mint";
import HeroSection from '@/components/hero-section'
import PartnersSection from '@/components/partner-section'
import TokenSection from "@/components/token-section";
import { useRef } from 'react';
import Navbar from "@/components/nav-bar";
import ProductGrid from '@/components/ProductGrid'




export default function Home() {
  const tokenSectionRef = useRef<HTMLDivElement>(null);

  const scrollToTokenSection = () => {
    tokenSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // <div ref={tokenSectionRef}>
  //   <TokenSection sdk={{}} abi={{}} contract="" />
  // </div>
  return (
    
    <div>
       <main className="flex min-h-screen flex-col items-center justify-between">

       <Navbar scrollToTokenSection={scrollToTokenSection} />
       <HeroSection scrollToTokenSection={scrollToTokenSection} />
      {/* <PartnersSection /> */}
      <TokenSection 
        ref={tokenSectionRef}
        sdk={{}} 
        abi={{}} 
        contract="" 
      />
                    
      <ProductGrid />
      </main>


    
    <div>
      <InteractContract />
    </div>
    <div>
      <TokenMint />
    </div>
   </div>

  );
}

