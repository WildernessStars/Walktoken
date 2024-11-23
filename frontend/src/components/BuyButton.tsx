'use client'

import { useState } from 'react'
import { Button } from '@mui/material';

interface BuyButtonProps {
  productId: number;
}

export default function BuyButton({ productId }: BuyButtonProps) {
  const [isPurchased, setIsPurchased] = useState(false);

  const handleBuy = () => {
    console.log(`Purchasing product ${productId}`);
    setIsPurchased(true);
    setTimeout(() => setIsPurchased(false), 2000);
  };

  return (
    <Button onClick={handleBuy} disabled={isPurchased}>
      {isPurchased ? 'Purchased!' : 'Buy Now'}
    </Button>
  );
}

