import React from 'react';
import { Button, styled } from '@mui/material';
import { keyframes } from '@emotion/react';

const glowAnimation = (color: string) => keyframes`
  0%, 100% {
    box-shadow: 0 0 5px ${color}, 0 0 10px ${color}, 0 0 15px ${color}, 0 0 20px ${color};
  }
  50% {
    box-shadow: 0 0 10px ${color}, 0 0 20px ${color}, 0 0 30px ${color}, 0 0 40px ${color};
  }
`;

const GlowingButton = styled(Button)<{ customcolor: string }>(({ theme, customcolor }) => ({
  backgroundColor: customcolor,
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
    animation: `${glowAnimation(customcolor)} 3s ease-in-out infinite`,
    zIndex: -1,
  },
  '&:hover': {
    backgroundColor: '#011C13',
    '&::before': {
      animation: `${glowAnimation(customcolor)} 1.5s ease-in-out infinite`,
    },
  },
}));

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  color?: string;
}

const CustomGlowingButton: React.FC<Props> = ({ children, onClick, color = '#00ff00' }) => {
  return (
    <GlowingButton variant="contained" fullWidth onClick={onClick} customcolor={color}>
      {children}
    </GlowingButton>
  );
};

export default CustomGlowingButton;

