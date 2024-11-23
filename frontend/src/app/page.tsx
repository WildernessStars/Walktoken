"use client";
import ProductGrid from '@/components/ProductGrid'

import { WalletConnect } from "@/components/wallet-connect";


export default function Home() {
  return (
<main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Products</h1>
      <ProductGrid />
    </main>

  );
}

