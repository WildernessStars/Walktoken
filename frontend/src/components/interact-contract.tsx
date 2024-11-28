"use client";
import {
    useWallet,
  } from "web3-connect-react";
  import abi from "./abi.json";
import Button from '@mui/material/Button';
import {useState} from 'react';
import address from "./address.json";


const contract = address.WalkTokenAddress;

  
  /**
   * This component allows user to upload a contract and interact with it.
   * It will parse the contract and display the contract's methods.
   * @constructor
   */
  export default function InteractContract() {
    const { sdk} = useWallet();

    
    const [currentBalance, setCurrentBalance] = useState<string>("7");
    // const { sdk } = useWallet();
  
    const getBalance = async () => {
      try{
        const [addresses] = await sdk.getWalletAddress("ethereum");
        const result = await sdk.callContractMethod({
          method: "balanceOf",
          params: [addresses],
          abi: abi,
          contractAddress: contract,
        });
        // console.log(result);
        setCurrentBalance(result.toString());
        console.log('set');
    } catch (error) {
      console.error(error);
      if(error instanceof Error){
        alert(error.message);
      }
    } finally {
      console.log('ok');
    }
  };
    return (
      <div>
        <Button onClick={getBalance}>Get balance</Button>
        <br />
        <span>Balance: {currentBalance}</span>
        <br />
      </div>
    );
  }
  