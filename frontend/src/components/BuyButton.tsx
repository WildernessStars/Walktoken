'use client'

import { useState, useEffect } from 'react'
import { Button } from '@mui/material';
import { ethers, ContractTransactionReceipt } from 'ethers';
import tokenABI from "./abi.json";
import productABI from "./nft_abi.json";
import address from "./address.json";

interface BuyButtonProps {
  price: number;
  tokenURI: string;
  onPurchase: () => void;
}

interface MintedToken {
  tokenURI: string;
  unused: string[];
}




export default function BuyButton({ price, tokenURI, onPurchase }: BuyButtonProps) {
  const [isPurchased, setIsPurchased] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const checkIfMinted = async () => {
      try {
        const response = await fetch('/api/minted');
        const data: MintedToken[] = await response.json();
        if (Array.isArray(data)) {
          const isMinted = data.some(item => item.tokenURI === tokenURI);
          if (isMinted) {
            setIsPurchased(true);
            onPurchase(); // Call the onPurchase callback
          }
        }
      } catch (error) {
        console.error("Error checking if minted:", error);
      }
    };

    checkIfMinted();
  }, [tokenURI, onPurchase]);

  const handleBuy = async () => {
    setIsProcessing(true);
    if (window.ethereum) {
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
        // tokenContract.on("QuestUpdated", (user, steps) => {
        //   console.log(`User ${user} updated quest with steps: ${steps.toString()}`);
        // });
        // await tokenContract.takeQuest(userAddress);

        const burnTx = await tokenContract.burnTokens(userAddress, price * 1000);
        await burnTx.wait();
        
        // Call mintProduct function
        const mintTx = await productContract.mintProduct(userAddress, tokenURI);
        const receipt = await mintTx.wait();

      alert(`You purchased a new NFT`);
      setIsPurchased(true);
      onPurchase(); // Call the onPurchase callback
      if(receipt instanceof ContractTransactionReceipt ){
        fetch('/api/minted', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            url: tokenURI,
            id: ['1', ""]
          }),
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          // Dispatch a custom event to notify of the purchase
          window.dispatchEvent(new CustomEvent('nftPurchased'));
        })
        .catch((error) => console.error('Error:', error));
      }
    } catch (error) {
      console.error("Error during purchase:", error);
      alert("You don't have enough Walk Token");
    } finally {
      setIsProcessing(false);
    }
  }
  };

  return (
    <Button 
      onClick={handleBuy} 
      disabled={isPurchased || isProcessing}
      style={{
        backgroundColor: isPurchased ? 'gray' : '',
        color: isPurchased ? 'white' : '',
      }}
    >
      {isProcessing ? 'Processing...' : isPurchased ? 'Sold!' : 'Buy Now'}
    </Button>
  );
}

