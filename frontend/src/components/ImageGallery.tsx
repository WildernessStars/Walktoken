import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { Card, CardContent, Box, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import { ethers } from 'ethers';
import productABI from "./nft_abi.json";
import Caddress from "./address.json";

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

export default function ImageGallery() {
  const [nfts, setNfts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const connectAndFetchNFTs = async () => {
      if (typeof window.ethereum === 'undefined') {
        setError('Please install MetaMask!');
        setIsLoading(false);
        return;
      }

      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' })

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        console.log(address)
        const contract = new ethers.Contract(Caddress.NFTAddress, productABI, signer);
        console.log(contract)
        const tokenIds = await contract.getAllNFTs(address);
        console.log(tokenIds)
        
        const imageUrls = tokenIds.map((id: number) => `/api/nft-image/${id}`);
        setNfts(imageUrls);
      } catch (error) {
        console.error("Failed to connect wallet or fetch NFTs:", error);
        setError('Failed to fetch NFTs. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    connectAndFetchNFTs();
  }, []);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', color: 'error.main' }}>
        {error}
      </Box>
    );
  }

  if (nfts.length === 0) {
    return (
      <Box sx={{ textAlign: 'center' }}>
        No NFTs found for this wallet.
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', maxWidth: '80%', margin: '0 auto', padding: '0 16px' }}>
      <Card sx={{ bgcolor: 'transparent', boxShadow: 'none', position: 'relative' }}>
        <CardContent sx={{ p: 0, position: 'relative', '&:last-child': { pb: 0 } }}>
          <LeftGradient />
          <RightGradient />
          <ScrollArea>
            <Box sx={{ display: 'flex', p: 2 }}>
              {nfts.map((image, index) => (
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

