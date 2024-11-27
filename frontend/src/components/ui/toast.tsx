import React, { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
}

const Toast: React.FC<ToastProps> = ({ message }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
    //   setIsVisible(false);
      console.log(111);
    }, 5000);

    return () => clearTimeout(timer);
  }, [message]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-lime-300 text-black px-4 py-2 rounded-lg shadow-lg transition-opacity duration-300 opacity-90 hover:opacity-100 max-w-xs mb-2">
      <p className="text-sm whitespace-pre-wrap break-words">{message}</p>
    </div>
  );
};

export default Toast;

