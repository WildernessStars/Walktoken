import Image from 'next/image'
import { Card, CardContent, CardHeader } from '@mui/material';
import BuyButton from './BuyButton'
import { Product } from '@/lib/products'

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="w-full max-w-sm">
      <CardContent className="p-4">
        <div className="aspect-square relative mb-4">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover rounded-md"
          />
        </div>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.price.toFixed(2)} WalkTokens</p>
          </div>
          <BuyButton productId={product.id} />
        </div>
      </CardContent>
    </Card>
  )
}

