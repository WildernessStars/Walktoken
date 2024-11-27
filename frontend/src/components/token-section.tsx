import { Card, CardContent, Typography, Box, styled, Button, LinearProgress } from '@mui/material';
import {
    AvailableProvider,
    useAddresses,
    useBalance,
    useWallet,
  } from "web3-connect-react";
import { JsonRpcProvider, ethers } from "ethers";
import { useState,useEffect, forwardRef } from "react"
import { LogOut, Wallet, Coins } from "lucide-react";
import CustomGlowingButton from './glowing-button';
import CircularImage from './circular-image';
import abi from "./abi.json";
import address from "./address.json";
import { HoverTextIconCSS } from './ui/hover-circle';



const contract = address.WalkTokenAddress;

interface TokenSectionProps {
  helpText?: string
}

const TransparentCard = styled(Card)(({ theme }) => ({
    backgroundColor: 'rgba(13, 17, 37, 0.8)',
    color: 'white',
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    backdropFilter: 'blur(4px)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    aspectRatio: '9 / 18',
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
  
const MintButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  bottom: '16px',
  left: '50%',
  transform: 'translateX(-50%)',
  minWidth: '160px',
  padding: '8px 24px',
  borderRadius: '20px',
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
  color: 'white',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(45deg, #1976D2 30%, #00B4E5 90%)',
    transform: 'translateX(-50%) translateY(-2px)',
    boxShadow: '0 6px 10px 2px rgba(33, 203, 243, .3)',
  },
  '&:disabled': {
    background: 'linear-gradient(45deg, #9e9e9e 30%, #757575 90%)',
    color: 'rgba(255,255,255,0.5)',
  },
}));
  const TokenSection = forwardRef<HTMLDivElement, TokenSectionProps>(({helpText="1000 step = 1 WLK"}, ref) => {
    const { sdk, signIn, signOut } = useWallet();
    const { balance, error } = useBalance(
        "ethereum"
      );
    const [isConnected, setIsConnected] = useState(false);
    const [currentBalance, setCurrentBalance] = useState('');
    const [notIssued, setNotIssued] = useState('');
    const [mintDone, setMintDone] = useState<string>("notmint");
    const [stepGoal, setStepGoal] = useState(0);
    const [currentSteps, setCurrentSteps] = useState(0);
    const [checkedIn, setCheckedIn] = useState(false);
    const [takenChallenge, setTakenChallenge] = useState(false);
  
    

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
      const handleStepChallenge = () => {
        setTakenChallenge(true);
        const newGoal = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000;
        setStepGoal(newGoal);
        setCurrentSteps(0);
        // Simulate step progress
        const interval = setInterval(() => {
          setCurrentSteps(prev => {
            if (prev >= newGoal) {
              clearInterval(interval);
              return newGoal;
            }
            return prev + Math.floor(Math.random() * 100);
          });
        }, 1000);
      };
    
      const handleCheckIn = () => {
        setCheckedIn(true);
        setTimeout(() => setCheckedIn(false), 24 * 60 * 60 * 1000); // Reset after 24 hours
      };
      function getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      const getMintToken = async () => {
        try{
          const [addresses] = await sdk.getWalletAddress("ethereum");
          console.log('ree');
          const result = await sdk.callContractMethod({
            method: "mintTokens",
            params: [addresses, getRandomInt(8000, 20000)],
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

      useEffect(() => {
        getNotIssued();
      }, []); 

    
      useEffect(() => {
        if (isConnected) {
          getBalance();
        }
        getNotIssued();
      }, [isConnected, mintDone]);

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
        
        <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        maxWidth: '1200px', 
        mx: 'auto', 
        px: 2,
        gap: 4
      }}>
          <TransparentCard>
            <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
              {/* Header */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Typography variant="subtitle1" component="h2">
                  Stide to Earn Token
                </Typography>
                <HoverTextIconCSS text={helpText} />
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
                        
                            <CustomGlowingButton key="connect" color="#011C13" 
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

              <div>

              </div>
            </CardContent>
            {isConnected && (
            <MintButton
              onClick={getMintToken}
              startIcon={<Coins className="w-4 h-4" />}
            >
              Mint Tokens
            </MintButton>
          )}
            {/* {isConnected && (
                  <MintButton 
                      variant="outlined" 
                      size="small" 
                      onClick={getMintToken}
                      sx={{ mt: 0 }} // Add margin top for spacing
                  >
                      Mint
                  </MintButton>
              )} */}
          </TransparentCard>
                  {/* Step Challenge Card */}
        <TransparentCard sx={{ flex: 1 }}>
        <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '87%', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Typography variant="subtitle1" component="h2">
                Step Challenge
                </Typography>
              </Box>
              <br></br>
              <br></br>
              <br></br>
              <CircularImage 
                  src="/image/quest.png" 
                  alt="take quest"
                  size={290} 
                />
              <Typography variant="subtitle1">
                Goal: {stepGoal} steps
              </Typography>

              <LinearProgress 
                variant="determinate" 
                value={(currentSteps / stepGoal) * 100} 
                sx={{ 
                  mt: 2,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#4CAF50'
                  }
                }}
              />
              <Typography variant="body2" sx={{ mt: 1 }}>
                Current: {currentSteps} steps
              </Typography>
            <br></br>
            <br></br>
            <div className="relative group" key="r">
               <div className="absolute -inset-0.5 bg-blue-500 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-1000 group-hover:duration-200 animate-pulse" key="b"></div>

            {/* <Button 
              variant="contained" 
              onClick={handleStepChallenge}
              sx={{
                backgroundColor: '#2196F3',
                '&:hover': {
                  backgroundColor: '#1976D2'
                }
              }}
            >
              Start New Challenge
            </Button> */}

            <CustomGlowingButton key="challenge" 
                                onClick={handleStepChallenge}
                                color="#1976D2"
                            >
                                {isConnected
                                ? (takenChallenge ? (currentSteps >= stepGoal ? "Done": "In progress")
                                : "Start New Challenge") : "Start New Challenge"}
              </CustomGlowingButton>
            </div>
          </CardContent>
        </TransparentCard>
               {/* Check-in Card */}
               <TransparentCard sx={{ flex: 1 }}>
        <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '87%', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Typography variant="subtitle1" component="h2">
                Daily Check-in
                </Typography>
              </Box>
            <br></br> 
            <div>            
              <CircularImage 
                src="/image/hkust.jpg" 
                alt="Check point"
                size={290} 
                object-fit="cover"
              />
              </div>          
            <br></br>                       
            <br></br>                       
            <br></br>                       

            <div className="relative group" key="r">
               <div className="absolute -inset-0.5 bg-[#4b901a] rounded-full opacity-75 group-hover:opacity-100 blur transition duration-1000 group-hover:duration-200 animate-pulse" key="b"></div>

            <CustomGlowingButton key="checkin" color="#4b901a"
              onClick={handleCheckIn}
            >
              {checkedIn ? 'Checked In' : 'Check In'}
            </CustomGlowingButton>
            </div>
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