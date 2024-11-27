import Image from "next/image"
import { Card, CardContent } from '@mui/material'
import hiking1Image from "../../public/image/Hiking1.jpg"
import hiking2Image from "../../public/image/Hiking2.jpg"

interface ValueCardProps {
  title: string
  description: string
  imageAlt: string
  imageNumber: 1 | 2
  className?: string
  imageSrc: string
}

export default function ValueCard({
  title,
  description,
  imageAlt,
  imageNumber,
  className = "",
}: ValueCardProps) {
  const imageSrc = imageNumber === 1 ? hiking1Image : hiking2Image

  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardContent className="bg-green-50 p-0">
        <div className="bg-green-50 grid gap-6 sm:gap-8 md:grid-cols-2 lg:gap-12">
          <div className="relative aspect-video overflow-hidden sm:aspect-square">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col justify-center space-y-4 p-6 sm:p-8">
            <div 
              className="inline-flex rounded-full bg-[#87E577] px-4 py-2 text-sm font-semibold sm:text-base md:px-6 md:py-3 md:text-lg"
              aria-label={`Value: ${title}`}
            >
              {title}
            </div>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg" aria-label={`Description: ${description}`}>
              {description}
            </p >
          </div>
        </div>
      </CardContent>
    </Card>
  )
}