"use client";
import {
    useAddresses,
    useBalance,
    useSplWalletBalance,
    useWallet,
  } from "web3-connect-react";
  import abi from "./abi.json";
import Button from '@mui/material/Button';
import {useState} from 'react';


  const contract = "0x5878605A2EedbAB94C5CeA8324fe42B3778adDc7";
  
  /**
   * This component allows user to upload a contract and interact with it.
   * It will parse the contract and display the contract's methods.
   * @constructor
   */
  export default function TokenMint() {
    const { sdk, signIn, signOut } = useWallet();

    const{ balance, error } = useBalance("ethereum")
  
    // /**
    //  * Get list of parameters for a method
    //  * @param abi
    //  * @param method
    //  */
    // const getParams = (abi: any, method: any) => {};
  
    
    const [mintDone, setMintDone] = useState<string>("notmint");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    // const { sdk } = useWallet();
  
    const getMintToken = async () => {
      try{
        const [addresses] = await sdk.getWalletAddress("ethereum");
        console.log('ree');
        const result = await sdk.callContractMethod({
          method: "mintTokens",
          params: [addresses, 10000],
          abi: abi,
          contractAddress: contract,
        });
        setMintDone(result.toString());
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    } finally {
      console.log('mint');
    }
  };
    return (
      <div>
        <Button onClick={getMintToken}>Mint Token</Button>
        <br />
        <span>MintSuccess: {mintDone}</span>
      </div>
    );
  }
  
