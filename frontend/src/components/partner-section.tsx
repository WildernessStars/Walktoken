import Image from 'next/image'

const partners = [
  { name: 'CoinMarketCap', logo: '/coinmarketcap-logo.png' },
  { name: 'Binance', logo: '/binance-logo.png' },
  { name: 'Coinbase', logo: '/coinbase-logo.png' },
  { name: 'Ledger', logo: '/ledger-logo.png' },
  { name: 'Blockchain.com', logo: '/blockchain-logo.png' },
]

export default function PartnersSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-wrap justify-center items-center gap-8">
          {partners.map((partner) => (
            <div key={partner.name} className="flex items-center justify-center">
              <Image 
                src={partner.logo} 
                alt={`${partner.name} logo`} 
                width={120} 
                height={20} 
                className="h-8 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

