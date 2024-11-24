import Image from 'next/image'

interface CircularImageProps {
  src: string
  alt: string
  size: number
}

const CircularImage: React.FC<CircularImageProps> = ({ src, alt, size }) => {
  return (
    <div 
      style={{ 
        width: size-10, 
        height: size-10 
      }} 
      className="relative overflow-hidden rounded-full"
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        objectFit="cover"
        className="rounded-full"
      />
    </div>
  )
}

export default CircularImage

