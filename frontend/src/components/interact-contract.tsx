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
import address from "./address.json";


  const contract = address.WalkTokenAddress;
  
  /**
   * This component allows user to upload a contract and interact with it.
   * It will parse the contract and display the contract's methods.
   * @constructor
   */
  export default function InteractContract() {
    const { sdk, signIn, signOut } = useWallet();

    const{ balance, error } = useBalance("ethereum")
    // const { balance } = useSplWalletBalance(
    //   "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr",
    // );
    // const getContractMethods = (abi: any) => {
    //   return abi.filter((method: any) => method.type === "function");
    // };
  
    // /**
    //  * Get list of parameters for a method
    //  * @param abi
    //  * @param method
    //  */
    // const getParams = (abi: any, method: any) => {};
  
    
    const [currentBalance, setCurrentBalance] = useState<string>("7");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    // const { sdk } = useWallet();
  
    const getBalance = async () => {
      try{
        console.log('get');
        const [addresses] = await sdk.getWalletAddress("ethereum");
        console.log('ree');
        const result = await sdk.callContractMethod({
          method: "balanceOf",
          params: [addresses],
          abi: abi,
          contractAddress: contract,
        });
        // console.log(result);
        setCurrentBalance(result.toString());
        console.log('set');
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    } finally {
      console.log('ccc');
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
  