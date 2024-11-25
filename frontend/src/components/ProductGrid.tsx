import { products } from '@/lib/products'
import ProductCard from './ProductCard'

export default function ProductGrid() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-green-50">
      
      <h1 className="text-3xl font-bold mb-8 text-center" >Redeem NFTs</h1>
      <span >
        &nbsp;
      </span>     

      <div className="container px-4 md:px-6 mx-auto">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
    </div>
    </section>

  )
}

