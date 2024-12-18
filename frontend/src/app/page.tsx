"use client";
import { useRef } from 'react';
import HeroSection from '@/components/hero-section'
import Navbar from "@/components/nav-bar";
import ProductGrid from '@/components/ProductGrid'
import ImageGallery from '@/components/ImageGallery'
import TokenSection from "@/components/token-section";
import ValueProposition from "@/components/value-proposition"
import ERC20EventListener from "@/components/event-listener";



export default function Home() {
  const tokenSectionRef = useRef<HTMLDivElement>(null);

  const scrollToTokenSection = () => {
    tokenSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <div>
       <main className="flex min-h-screen flex-col items-center justify-between">
         <Navbar scrollToTokenSection={scrollToTokenSection} />
         <HeroSection scrollToTokenSection={scrollToTokenSection} />
         <TokenSection 
           ref={tokenSectionRef}
           contract="" 
           helpText="1000 steps = 1 WLK"
         />
         <div>
           <h1 className="text-3xl font-bold mb-8 text-center">Your Own NFTs</h1>
           <div className="mb-8">
             <ImageGallery />
           </div>
         </div>
         <ProductGrid />
       </main>
      <div>
        <ERC20EventListener />
      </div>
      <div>
        <ValueProposition />
      </div>
    </div>
  );
}
