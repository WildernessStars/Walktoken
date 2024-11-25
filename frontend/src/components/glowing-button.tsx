import React from 'react';
import { Button, styled } from '@mui/material';
import { keyframes } from '@emotion/react';

const glowAnimation = keyframes`
  0%, 100% {
    box-shadow: 0 0 5px #00ff00, 0 0 10px #00ff00, 0 0 15px #00ff00, 0 0 20px #00ff00;
  }
  50% {
    box-shadow: 0 0 10px #00ff00, 0 0 20px #00ff00, 0 0 30px #00ff00, 0 0 40px #00ff00;
  }
`;

const GlowingButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#011C13',
  color: 'white',
  padding: '12px 24px',
  fontSize: '1.2rem',
  borderRadius: '9999px', // Fully rounded corners
  border: 'none',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-2px',
    left: '-2px',
    right: '-2px',
    bottom: '-2px',
    background: 'transparent',
    borderRadius: 'inherit',
    animation: `${glowAnimation} 3s ease-in-out infinite`,
    zIndex: -1,
  },
  '&:hover': {
    backgroundColor: '#011C13',
    '&::before': {
      animation: `${glowAnimation} 1.5s ease-in-out infinite`,
    },
  },
}));

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
}

const CustomGlowingButton: React.FC<Props> = ({ children, onClick }) => {
  return (
    <GlowingButton variant="contained" fullWidth onClick={onClick}>
      {children}
    </GlowingButton>
  );
};

export default CustomGlowingButton;

