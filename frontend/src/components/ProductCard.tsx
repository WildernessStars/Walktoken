import Image from 'next/image'
import { Card, CardContent } from '@mui/material';
import BuyButton from './BuyButton'
import { Product } from '@/lib/products'
import DiagonalLine from './DiagonalLine'
import { useState } from 'react'

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isPurchased, setIsPurchased] = useState(false);

  return (
    <Card className={`w-full max-w-sm relative ${isPurchased ? 'opacity-50' : ''}`}>
      <CardContent className="p-4">
        <div className="aspect-square relative mb-4">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover rounded-md"
          />
          {isPurchased && <DiagonalLine />}
        </div>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">{product.name}</h3>
            {product.id !== 0 && (
              <p className="text-sm text-gray-500">{product.price.toFixed(2)} WLKs</p>
            )}
            {product.id === 0 && (
              <p className="text-sm text-gray-500">Check In Reward</p>
            )}
          </div>
          {product.id !== 0 && (
          <BuyButton 
            productId={product.id} 
            price={product.price} 
            tokenURI={product.tokenURI}
            onPurchase={() => setIsPurchased(true)}
          />)}
        </div>
      </CardContent>
    </Card>
  )
}
