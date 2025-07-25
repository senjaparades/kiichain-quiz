'use client';

import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

export default function WalletConnect() {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted || typeof window === 'undefined' || !window.ethereum) return;

    const provider = new ethers.BrowserProvider(window.ethereum);

    const checkConnection = async () => {
      const accounts = await provider.listAccounts();
      if (accounts.length > 0) {
        const addr = accounts[0].address;
        setAccount(addr);
        fetchBalance(addr);
      }
    };

    const handleAccountsChanged = (accounts: string[]) => {
      const newAddr = accounts[0] || null;
      setAccount(newAddr);
      if (newAddr) fetchBalance(newAddr);
    };

    checkConnection();
    window.ethereum.on?.('accountsChanged', handleAccountsChanged);

    return () => {
      window.ethereum.removeListener?.('accountsChanged', handleAccountsChanged);
    };
  }, [hasMounted]);

  const fetchBalance = async (addr: string) => {
    if (!window.ethereum) return;
    const provider = new ethers.BrowserProvider(window.ethereum);
    const balanceBigInt = await provider.getBalance(addr);
    const ethBalance = ethers.formatEther(balanceBigInt);
    setBalance(parseFloat(ethBalance).toFixed(4) + ' KII');
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('MetaMask not detected!');
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      const addr = accounts[0];
      setAccount(addr);
      fetchBalance(addr);
    } catch (err) {
      console.error('Wallet connection failed:', err);
    }
  };

  const disconnect = () => {
    setAccount(null);
    setShowModal(false);
  };

  if (!hasMounted) return null; // Prevent hydration error

  return (
    <>
      <div className="absolute top-4 right-4 z-50">
        {account ? (
          <button
            onClick={() => setShowModal(true)}
            className="bg-yellow-500 text-black px-4 py-2 rounded font-bold hover:bg-yellow-400 transition"
          >
            {account.slice(0, 6)}...{account.slice(-4)}
          </button>
        ) : (
          <button
            onClick={connectWallet}
            className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-2 rounded font-bold transition"
          >
            Connect Wallet
          </button>
        )}
      </div>

      {showModal && account && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-gray-900 text-white rounded-lg p-6 w-[90%] max-w-md relative shadow-xl border border-yellow-500 animate-fadeInScale">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-2xl text-yellow-400 hover:text-red-500 transition"
            >
              ✕
            </button>
            <h2 className="text-3xl font-bold mb-6 text-yellow-400">Wallet Info</h2>

            <div className="mb-4">
              <p className="text-lg font-semibold">Address:</p>
              <p className="break-words text-base">{account}</p>
            </div>

            <div className="mb-4">
              <p className="text-lg font-semibold">Balance:</p>
              <p className="text-yellow-400 text-xl font-bold">{balance}</p>
            </div>

            <div className="mb-6">
              <p className="text-lg font-semibold">Network:</p>
              <p className="text-base">Kiichain Testnet</p>
            </div>

            <button
              onClick={disconnect}
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-6 py-3 rounded transition"
            >
              Disconnect
            </button>
          </div>
        </div>
      )}
    </>
  );
}
