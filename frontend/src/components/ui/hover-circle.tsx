import React from 'react'
import { HelpCircle } from 'lucide-react'

interface HoverTextIconProps {
  text: string
  iconColor?: string
  iconSize?: number
}

export function HoverTextIconCSS({ text, iconColor = 'gray', iconSize = 20 }: HoverTextIconProps) {
  return (
    <div className="relative inline-block group">
      <HelpCircle style={{ color: iconColor, width: iconSize, height: iconSize }} />
      <span className="absolute z-50 right-0 top-full mt-2 px-2 py-1 text-sm text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        {text}
        <span className="absolute bottom-full right-1 border-4 border-transparent border-b-gray-800"></span>
      </span>
    </div>
  )
}

