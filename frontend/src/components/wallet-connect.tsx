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
// import { LogOut, Wallet } from "lucide-react";


export function WalletConnect() {
  const { sdk, signIn, signOut } = useWallet();
  const { balance, error } = useBalance(
    "ethereum",
    "solana",
    "bnb",
    "optimism",
  );
  // const router = useRouter();
  const { addresses, isLoading: isAddressesLoading } = useAddresses(
    "ethereum",
    "solana",
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
                  {/* <LogOut className="w-4 h-4 mr-2" /> */}
                  Sign out
                </Button>
              )}
            </div>
          </div>

          <h3 className="text-lg font-semibold mb-4">
            Available Wallet Providers
          </h3>
          <div className="space-y-4">
            {sdk?.walletProviders
              .filter((p) => p.isVisible(false))
              .map((p) => {
                const isConnected =
                  sdk.provider?.metadata.name === p.metadata.name;
                return (
                  <Card key={p.metadata.name}>
                    <CardContent className="flex items-center justify-between p-4 flex-wrap space-y-4">
                      <div>
                        <div className="font-semibold flex flex-row items-center space-x-2">
                          <span> {p.metadata.name}</span>
                          {React.cloneElement(p.metadata.image as any, {
                            className: `!w-8 !h-8 bg-[${p.metadata.iconBackgroundColor}] rounded-lg p-1`,
                          })}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {p.metadata.description}
                        </p>
                      </div>
                      <Button
                        variant={
                          isConnected
                            ? "contained"
                            : p.isEnabled(sdk.walletProviders)
                              ? "outlined"
                              : "outlined"
                        }
                        onClick={async () => {
                          if (p.isEnabled(sdk.walletProviders)) {
                            await handleSignIn(p.metadata.name);
                          } else {
                            window.open(p.metadata.downloadLink, "_blank");
                          }
                        }}
                        disabled={sdk.provider !== undefined}
                      >
                        {!isConnected }
                        {isConnected
                          ? "Connected"
                          : p.isEnabled(sdk.walletProviders)
                            ? "Connect"
                            : "Not Installed"}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
          <div className={"mt-6"}>
            <h3 className="text-lg font-semibold mb-4">Wallet addresses</h3>
            <ol>
              {!isAddressesLoading &&
                addresses.map((address, index) => (
                  <li
                    key={address ?? `unknown-${index}`}
                    className={"break-all"}
                  >
                    <b>{getChainName(index)}</b> {address}
                  </li>
                ))}
            </ol>
            <h3 className="text-lg font-semibold mb-4">Wallet Balance</h3>
            <ol>
              {error && <li>{error.message}</li>}
              {balance?.map((balance, index) => (
                <li
                  key={`unknown-${
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    index
                  }`}
                >
                  {getChainName(index)}: {balance}
                </li>
              ))}
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}