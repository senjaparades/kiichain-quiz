'use client';

import { useAccount, useBalance } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect, useState } from 'react';

export default function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { data: balanceData } = useBalance({
    address,
    watch: true,
  });

  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    // Reset state saat reload/tab close
    const handleUnload = () => setShowQuiz(false);
    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, []);

  useEffect(() => {
    if (isConnected) {
      setShowQuiz(true);
    }
  }, [isConnected]);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <ConnectButton />

      {isConnected ? (
        <>
          <div className="text-yellow-300 font-bold text-center">
            <p>{address?.slice(0, 6)}...{address?.slice(-4)}</p>
            <p>{balanceData?.formatted} {balanceData?.symbol}</p>
          </div>
          <button className="bg-yellow-500 text-black px-6 py-3 rounded mt-2 font-bold hover:bg-yellow-400">
            START QUIZ
          </button>
        </>
      ) : (
        <p className="text-yellow-300 mt-2">Please connect your wallet to start quiz!</p>
      )}
    </div>
  );
}
