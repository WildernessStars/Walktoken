"use client";
import InteractContract from "@/components/interact-contract";
import { WalletConnect } from "@/components/wallet-connect";
import TokenMint from "@/components/token-mint";
import HeroSection from '@/components/hero-section'
import PartnersSection from '@/components/partner-section'
import Navbar from "@/components/nav-bar";
import ProductGrid from '@/components/ProductGrid'
import ImageGallery from '@/components/ImageGallery'


// TODO: 获取用户的NFTs
const myImages = [
  "/image/11.jpg?height=200&width=200",
  "/image/12.jpg?height=200&width=200",
  "/image/13.jpg?height=200&width=200",
  "/image/14.jpg?height=200&width=200",
  "/image/15.jpg?height=200&width=200",
  "/image/16.jpg?height=200&width=200",
  "/image/17.jpg?height=200&width=200",
  "/image/18.jpg?height=200&width=200",
  "/image/19.jpg?height=200&width=200",
  "/image/20.jpg?height=200&width=200"
];

export default function Home() {
  return (
    
    <div>
       <main className="flex min-h-screen flex-col items-center justify-between">
       <Navbar />
      <HeroSection />      
      <div/>
              <h1 className="text-3xl font-bold mb-8 text-center">My Own NFTs</h1>
              <div className="mb-8">
              <ImageGallery images={myImages} />
      </div>
      <div/>
              <h1 className="text-3xl font-bold mb-8 text-center">Redeem NFTs</h1>
              <div className="mb-8">
        
      </div>
      
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

  );
}

