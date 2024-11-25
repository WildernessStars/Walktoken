import React from 'react';
import Image from "next/image";
import { Card, CardContent, Box } from '@mui/material';
import { styled } from '@mui/system';

interface ImageGalleryProps {
  images: string[];
  title?: string;
}

const ScrollArea = styled('div')({
  overflowX: 'auto',
  whiteSpace: 'nowrap',
  position: 'relative',
  '&::-webkit-scrollbar': {
    height: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#f1f1f1',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#888',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: '#555',
  },
});

const GradientOverlay = styled('div')({
  position: 'absolute',
  top: 0,
  bottom: 0,
  width: '100px',
  zIndex: 1,
  pointerEvents: 'none',
});

const LeftGradient = styled(GradientOverlay)({
  left: 0,
  background: 'linear-gradient(to right, white, transparent)',
});

const RightGradient = styled(GradientOverlay)({
  right: 0,
  background: 'linear-gradient(to left, white, transparent)',
});

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  return (
    <Box sx={{ width: '100%', maxWidth: '80%', margin: '0 auto', padding: '0 16px' }}>
      {title && (
        <Box component="h2" sx={{ 
          fontSize: { xs: '1.5rem', sm: '1.875rem' }, 
          fontWeight: 'bold', 
          textAlign: 'center', 
          mb: { xs: 3, sm: 4 } 
        }}>
          {title}
        </Box>
      )}
      <Card sx={{ bgcolor: 'transparent', boxShadow: 'none', position: 'relative' }}>
        <CardContent sx={{ p: 0, position: 'relative', '&:last-child': { pb: 0 } }}>
          <LeftGradient />
          <RightGradient />
          <ScrollArea>
            <Box sx={{ display: 'flex', p: 2 }}>
              {images.map((image, index) => (
                <Box 
                  key={index} 
                  sx={{ 
                    flexShrink: 0, 
                    transition: 'transform 0.3s',
                    '&:hover': { transform: 'scale(1.05)' },
                    mr: { xs: 2, sm: 3, md: 4 }
                  }}
                >
                  <Box sx={{ 
                    overflow: 'hidden', 
                    borderRadius: '50%', 
                    border: '4px solid rgba(0, 0, 0, 0.1)', 
                    boxShadow: 3 
                  }}>
                    <Image
                      src={image}
                      alt={`NFT ${index + 1}`}
                      width={180}
                      height={180}
                      style={{
                        width: '180px',
                        height: '180px',
                        objectFit: 'cover',
                      }}
                      priority={index < 5}
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          </ScrollArea>
        </CardContent>
      </Card>
    </Box>
  );
}

