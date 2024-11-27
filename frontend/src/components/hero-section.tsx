import Image from 'next/image'
import Button from '@mui/material/Button';


interface HeroSectionProps {
    scrollToTokenSection: () => void;
  }
  
export default function HeroSection({ scrollToTokenSection }: HeroSectionProps) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-green-50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px] items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Get rewarded for walking joyfully
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
              Stride into Wealth: Convert Your Steps into Cryptocurrency with WalkToken. Actively accumulate digital assets as you embrace a healthier lifestyle. Through the synergy of blockchain and wellness, every step you take can lead to financial prosperity.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button variant="contained"  className="bg-purple-600 hover:bg-purple-700 text-white" onClick={scrollToTokenSection}>Invest now</Button>
              <div className="flex gap-2">
                <a href="#" className="inline-flex items-center justify-center">
                  <Image src="/image/googleplay.png" alt="Get it on Google Play" width={135} height={40} />
                </a>
                <a href="#" className="inline-flex items-center justify-center">
                  <Image src="/image/appstore.png" alt="Download on the App Store" width={120} height={40} />
                </a>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image 
              src="/image/walkicon2.png" 
              alt="Walk to Earn App Interface" 
              width={550} 
              height={400} 
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

