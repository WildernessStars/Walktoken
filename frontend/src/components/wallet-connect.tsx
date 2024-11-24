"use client";
import Button from '@mui/material/Button';
import { Card, CardContent, CardHeader } from '@mui/material';
import Typography from '@mui/material/Typography';
// import { useRouter } from "next/navigation";
import React from "react";
import {
  AvailableProvider,
  useAddresses,
  useBalance,
  useWallet,
} from "web3-connect-react";
import { LogOut, Wallet } from "lucide-react";


export function WalletConnect() {
  const { sdk, signIn, signOut } = useWallet();
  const { balance, error } = useBalance(
    "ethereum"
  );
  // const router = useRouter();
  const { addresses, isLoading: isAddressesLoading } = useAddresses(
    "ethereum"
  );

  const handleSignOut = async () => {
    await signOut();
  };

  const handleSignIn = async (providerName: AvailableProvider) => {
    await signIn(providerName, {
      onSignedIn: async (walletAddress, provider, session) => {
        sessionStorage.setItem("session", JSON.stringify(session));
        // router.refresh();
      },
      getSignInData: async () => {},
    });
  };

  const getChainName = (index: number) => {
    if (index === 0) {
      return "ethereum";
    }

    if (index === 1) {
      return "solana";
    }

    if (index === 2) {
      return "optimism";
    }

    if (index === 3) {
      return "polygon";
    }

    if (index === 4) {
      return "arbitrum";
    }

    if (index === 5) {
      return "bnb";
    }

    return "solana";
  };

  return (
    <div className="w-full">
      <Card className="w-full">
        <CardHeader>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
            Wallet Connection
          </Typography>
          <Typography variant="body2">
            Connect your wallet to interact with the application
          </Typography>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Current Provider</h3>
            <div className="flex items-center justify-between bg-secondary p-3 rounded-md flex-wrap">
              <span>{sdk?.provider?.metadata.name || "None"}</span>
              {sdk.provider && (
                <Button variant="contained" size="small" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign out
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}