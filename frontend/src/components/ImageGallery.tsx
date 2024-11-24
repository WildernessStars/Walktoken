import Image from 'next/image'
import { Card, CardContent } from "@mui/material"
import { ScrollArea, ScrollBar } from "@/components/scroll-area"

interface ImageGalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <h2 className="text-2xl font-bold mb-4">My Own NFTs</h2>
        <ScrollArea className="w-full whitespace-nowrap rounded-md border">
          <div className="flex w-max space-x-4 p-4">
            {images.map((image, index) => (
              <div key={index} className="shrink-0">
                <div className="overflow-hidden rounded-md">
                  <Image
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    className="aspect-[3/4] h-[200px] w-[150px] object-cover"
                    width={150}
                    height={200}
                  />
                </div>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

