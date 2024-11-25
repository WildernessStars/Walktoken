'use client'

import { useState } from 'react'
import { Button } from '@mui/material';
import { ethers, JsonRpcProvider } from 'ethers';
import tokenABI from "./abi.json";
import productABI from "./nft_abi.json";
// import { MetaMaskInpageProvider } from '@metamask/providers';

interface BuyButtonProps {
  productId: number;
  price: number;
  tokenURI: string;
}

export default function BuyButton({ productId, price, tokenURI }: BuyButtonProps) {
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
      const tokenContractAddress =   "0x01A963BAc60d41C65db5E131E530Ae1254bdcA0F"; 
      const productContractAddress = "0xF1270f5b9062BCeE3dA24fFa7f910ABbab225a8f"; 

      // Create contract instances
      const tokenContract = new ethers.Contract(tokenContractAddress, tokenABI, signer);
      const productContract = new ethers.Contract(productContractAddress, productABI, signer);

      // Get user's address
      const userAddress = await signer.getAddress();

      // Convert price to wei
      // const priceInWei = ethers.parseEther(price.toString());

      // Call burnTokens function
      // console.log(priceInWei)
      const burnTx = await tokenContract.burnTokens(userAddress, 1000);
      await burnTx.wait();
      
      // // Call mintProduct function
      const mintTx = await productContract.mintProduct(userAddress, tokenURI);
      await mintTx.wait();

      console.log(`Purchased product ${productId}`);
      setIsPurchased(true);
      
    } catch (error) {
      console.error("Error during purchase:", error);
      alert("There was an error processing your purchase. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Button onClick={handleBuy} disabled={isPurchased || isProcessing}>
      {isProcessing ? 'Processing...' : isPurchased ? 'Purchased!' : 'Buy Now'}
    </Button>
  );
}
