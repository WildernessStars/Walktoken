"use client";

import { ReactNode, useEffect, useState } from "react";
import { SessionResponse, WalletContextProvider } from "web3-connect-react";
import {
  MetaMaskProvider,
} from "web3-connect-react/providers";

export function Providers({ children }: { children: ReactNode }) {
  const  [parsedSession, setParsedSession] = useState<SessionResponse>({
    isAuth: false,
    walletAddresses: [], 
  });
  useEffect(() => {
    if (typeof window !== 'undefined') {
    const session = sessionStorage.getItem("session");
    if(session){
      setParsedSession(JSON.parse(session));
    }
  }
  }, []);
  

  return (
    <WalletContextProvider
      onSignedOut={async () => {
        sessionStorage.removeItem("session");
      }}
      session={parsedSession}
      providers={[MetaMaskProvider]}
      listenToChainChanges={false}
      listenToAccountChanges={false}
      walletConfig={{
        defaultChainConfigs: {
          solana: {
            rpcUrl: "https://api.devnet.solana.com",
          },
        },
      }}
    >
      {children}
    </WalletContextProvider>
  );
}
