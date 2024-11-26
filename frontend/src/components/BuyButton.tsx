'use client'

import { useState } from 'react'
import { Button } from '@mui/material';
import { ethers } from 'ethers';
import tokenABI from "./abi.json";
import productABI from "./nft_abi.json";
import address from "./address.json";

interface BuyButtonProps {
  productId: number;
  price: number;
  tokenURI: string;
  onPurchase: () => void;
}

export default function BuyButton({ productId, price, tokenURI, onPurchase }: BuyButtonProps) {
  const [isPurchased, setIsPurchased] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBuy = async () => {
    setIsProcessing(true);
    try {
      // Connect to MetaMask
      await window.ethereum.request({ method: 'eth_requestAccounts' })

      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      
      // Contract addresses (replace with actual addresses)
      const tokenContractAddress = address.WalkTokenAddress;
      const productContractAddress = address.NFTAddress;

      // Create contract instances
      const tokenContract = new ethers.Contract(tokenContractAddress, tokenABI, signer);
      const productContract = new ethers.Contract(productContractAddress, productABI, signer);

      // Get user's address
      const userAddress = await signer.getAddress();

      // Call burnTokens function
      const burnTx = await tokenContract.burnTokens(userAddress, price * 1000);
      await burnTx.wait();
      
      // Call mintProduct function
      const mintTx = await productContract.mintProduct(userAddress, tokenURI);
      await mintTx.wait();

      alert(`Purchased product ${productId}`);
      setIsPurchased(true);
      onPurchase(); // Call the onPurchase callback
      
    } catch (error) {
      console.error("Error during purchase:", error);
      alert("You don't have enough Walk Token");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Button onClick={handleBuy} disabled={isPurchased || isProcessing}>
      {isProcessing ? 'Processing...' : isPurchased ? 'Sold!' : 'Buy Now'}
    </Button>
  );
}

