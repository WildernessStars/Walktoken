import { Card, CardContent, Typography, Box, styled, Button } from '@mui/material';
import { HelpCircle } from "lucide-react"
import {
    AvailableProvider,
    useAddresses,
    useBalance,
    useWallet,
  } from "web3-connect-react";
import { JsonRpcProvider, ethers } from "ethers";
import { useState,useEffect, forwardRef } from "react"
import { LogOut, Wallet } from "lucide-react";
import CustomGlowingButton from './glowing-button';
import CircularImage from './circular-image';
import abi from "./abi.json";


const contract = "0x5878605A2EedbAB94C5CeA8324fe42B3778adDc7";

const TransparentCard = styled(Card)(({ theme }) => ({
    backgroundColor: 'rgba(13, 17, 37, 0.8)',
    color: 'white',
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    backdropFilter: 'blur(4px)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    aspectRatio: '9 / 19',
    display: 'flex',
    flexDirection: 'column',
  }));
  
  const IllustrationBox = styled(Box)({
    position: 'relative',
    width: '300px',
    height: '300px',
    margin: '0 auto 24px', // Reduced bottom margin
  });
  
  const TextOverlay = styled(Box)({
    textAlign: 'center',
    marginTop: '16px', // Add space between image and text
  });
  
  interface TokenSectionProps {
    sdk: any;
    abi: any;
    contract: string;
  }
  
  const TokenSection = forwardRef<HTMLDivElement, TokenSectionProps>(({}, ref) => {
    const { sdk, signIn, signOut } = useWallet();
    const { balance, error } = useBalance(
        "ethereum"
      );
    const [isConnected, setIsConnected] = useState(false);
    const [currentBalance, setCurrentBalance] = useState('');
    const [notIssued, setNotIssued] = useState('');
    

    // const router = useRouter();
    const { addresses, isLoading: isAddressesLoading } = useAddresses(
    "ethereum"
    );

    const handleSignOut = async () => {
    await signOut();
    };

    useEffect(() => {
        // Check initial connection status
        setIsConnected(!!sdk.provider);
      }, [sdk.provider]);
    
      const getBalance = async () => {
        try {
          const [addresses] = await sdk.getWalletAddress("ethereum");
          const result = await sdk.callContractMethod({
            method: "balanceOf",
            params: [addresses],
            abi: abi,
            contractAddress: contract,
          });
          const formattedBalance = (Number(result) / 1000).toFixed(3);
          setCurrentBalance(formattedBalance);
        } catch (error) {
          // console.error(error);
          // alert(error);
        }
      };
      const getNotIssued = async () => {
        try {
          const provider = new JsonRpcProvider('https://rpc5.gemini.axiomesh.io/');
          const contracti = new ethers.Contract(contract, abi, provider);
  
          const result = await contracti.totalSupply();
          const formattedTotal = (1000000 - Number(result) / 1000).toFixed(3);
          setNotIssued(formattedTotal);
        } catch (error) {
          console.error("Error fetching unissued tokens:", error);
          setNotIssued('Error');
        }
      };

      useEffect(() => {
        getNotIssued();
      }, []); 

    
      useEffect(() => {
        if (isConnected) {
          getBalance();
        }
        getNotIssued();
      }, [isConnected]);

    const handleSignIn = async (providerName: AvailableProvider) => {
    await signIn(providerName, {
        onSignedIn: async (walletAddress, provider, session) => {
        sessionStorage.setItem("session", JSON.stringify(session));
        // router.refresh();
        },
        getSignInData: async () => {},
    });
    };
    return (
      <Box 
        ref={ref}
        sx={{ 
          width: '100%', 
          py: 16, 
          bgcolor: '#023047', 
          position: 'relative', 
          overflow: 'hidden'
        }}
      >
        {/* Background grid pattern */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            opacity: 0.1,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234299E1' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        
        <Box sx={{ maxWidth: '350px', mx: 'auto', px: 2 }}>
          <TransparentCard>
            <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
              {/* Header */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Typography variant="subtitle1" component="h2">
                  Dream to Earn Token Crowdsale
                </Typography>
                <HelpCircle style={{ color: 'gray', width: 20, height: 20 }} />
              </Box>
  
                 {/* Illustration with Overlaid Text */}
            <IllustrationBox>
              <CircularImage 
                src="/image/logo.jpg" 
                alt="Token illustration"
                size={290} 
              />
              <TextOverlay>
                {!isConnected ? (
                  <>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: 'white',
                        textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                        mb: 1
                      }}
                    >
                      Not connected.. /
                    </Typography>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontFamily: 'monospace',
                        color: 'white',
                        textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                      }}
                    >
                      {notIssued} left
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: 'white',
                        textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                        mb: 1
                      }}
                    >
                      Success /
                    </Typography>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontFamily: 'monospace',
                        color: 'white',
                        textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                      }}
                    >
                      Balance: {currentBalance}
                    </Typography>
                  </>
                )}
              </TextOverlay>
            </IllustrationBox>
  
              {/* Connect Button */}
               {/* Connect Button */}
               <div className="relative group" key="r">
               <div className="absolute -inset-0.5 bg-green-500 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-1000 group-hover:duration-200 animate-pulse" key="b"></div>
                    {sdk?.walletProviders
                    .filter((p) => p.isVisible(false))
                    .map((p) => {
                        // isConnected =
                        // sdk.provider?.metadata.name === p.metadata.name;
                        return (
                        
                            <CustomGlowingButton key="connect" 
                                onClick={async () => {
                                if (p.isEnabled(sdk.walletProviders)) {
                                    await handleSignIn(p.metadata.name);
                                } else {
                                    window.open(p.metadata.downloadLink, "_blank");
                                }
                                }}
                            >
                                {!isConnected && <Wallet className="w-4 h-4 mr-2" />}
                                {isConnected
                                ? "Connected"
                                : p.isEnabled(sdk.walletProviders)
                                    ? "Connect"
                                    : "Not Installed"}
                            </CustomGlowingButton>
                        
                        );
                    })}
                </div>
  
              {/* Footer Text */}
              <Typography variant="caption" sx={{ color: 'gray', textAlign: 'center', mt: 2 }}>
                Walk to Earn Tokens are sold at 200000 WLK / 1 USDT
              </Typography>
            </CardContent>
          </TransparentCard>
        </Box>
        <span><>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</></span>
              {sdk.provider && (
                <Button variant="contained" size="small" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign out
                </Button>
              )}
      </Box>
    );
});

TokenSection.displayName = 'TokenSection';

export default TokenSection;