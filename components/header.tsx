'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Container from '@/components/ui/container';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAccount, useDisconnect, useBalance } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { formatUnits } from 'viem';
import ClientOnly from '@/components/ClientOnly';
import abi from '@/abi/abi.json';
import { ethers } from 'ethers';

const contractAddress = '0x21ee9D5B2B6Bd524dE7bd8c65f17587B2Bd61117';
const rpcUrl = process.env.NEXT_PUBLIC_KIICHAIN_RPC!;

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address });
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    async function checkOwner() {
      if (!address) return;
      try {
        const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
        const contract = new ethers.Contract(contractAddress, abi, provider);
        const owner = await contract.owner();
        setIsOwner(owner.toLowerCase() === address.toLowerCase());
      } catch (err) {
        console.error('Failed to fetch contract owner:', err);
      }
    }
    checkOwner();
  }, [address]);

  const shortAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : '';

  const formattedBalance = balance
    ? `${parseFloat(formatUnits(balance.value, balance.decimals)).toFixed(4)} KII`
    : '';

  return (
    <nav className="bg-blue-950 text-yellow-400 shadow-lg">
      <Container>
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-4xl font-extrabold text-black stroke-white drop-shadow-[3px_3px_0px_white] hover:text-yellow-300 transition"
            >
              KiiQuiz
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link
              href="/leaderboard"
              className="text-2xl font-extrabold text-yellow-300 hover:text-white transition"
            >
              Leaderboard
            </Link>
            <Link
              href="/create"
              className="text-2xl font-extrabold text-yellow-300 hover:text-white transition"
            >
              Create Quiz
            </Link>
            {isOwner && (
              <Link
                href="/admin"
                title="Admin Panel"
                className="text-lg text-yellow-300 hover:text-white transition"
              >
                🛠
              </Link>
            )}

            <ClientOnly>
              {isConnected ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="glass-badge text-left px-3 py-1 max-w-[200px]">
                      <div className="text-sm font-bold leading-none">{shortAddress}</div>
                      <div className="text-base font-extrabold leading-tight">
                        {formattedBalance}
                      </div>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-sm rounded-2xl shadow-xl bg-white dark:bg-zinc-900 text-zinc-800 dark:text-white px-6 py-5 space-y-5">
                    <DialogTitle className="text-xl font-bold">Wallet Details</DialogTitle>

                    {/* Wallet Address */}
                    <div className="flex items-center justify-between">
                      <div className="font-mono text-sm break-all">{address}</div>
                      <button
                        onClick={() => navigator.clipboard.writeText(address || '')}
                        className="text-xs px-2 py-1 rounded bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition"
                      >
                        Copy
                      </button>
                    </div>

                    {/* Wallet Info */}
                    <div className="flex flex-col gap-1">
                      <div className="text-lg font-semibold">OKX Wallet</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Kiichain Testnet</div>
                    </div>

                    {/* Balance */}
                    <div className="text-3xl font-extrabold text-yellow-500">
                      {formattedBalance}
                    </div>

                    {/* Main Actions */}
                    <div className="grid grid-cols-2 gap-3">
                      <button className="py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
                        Send
                      </button>
                      <button className="py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition">
                        Receive
                      </button>
                    </div>

                    {/* Extra Tools */}
                    <div className="space-y-2 text-sm">
                      <button className="w-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 px-4 py-2 rounded-lg text-left transition">
                        Transactions
                      </button>
                      <button className="w-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 px-4 py-2 rounded-lg text-left transition">
                        View Assets
                      </button>
                      <button className="w-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 px-4 py-2 rounded-lg text-left transition">
                        Manage Wallet
                      </button>
                    </div>

                    {/* Disconnect Button */}
                    <button
                      onClick={() => disconnect()}
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition"
                    >
                      Disconnect Wallet
                    </button>
                  </DialogContent>
                </Dialog>
              ) : (
                <ConnectButton showBalance={false} chainStatus="icon" />
              )}
            </ClientOnly>
          </div>

          {/* Mobile Toggle Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-yellow-400 hover:text-white hover:bg-yellow-700 transition"
            >
              {menuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 bg-blue-900">
          <Link
            href="/leaderboard"
            className="block text-xl font-bold text-yellow-300 hover:text-white"
          >
            Leaderboard
          </Link>
          <Link
            href="/create"
            className="block text-xl font-bold text-yellow-300 hover:text-white"
          >
            Create Quiz
          </Link>
          {isOwner && (
            <Link
              href="/admin"
              title="Admin Panel"
              className="block text-lg text-yellow-300 hover:text-white"
            >
              🛠
            </Link>
          )}
          <ClientOnly>
            {isConnected ? (
              <div className="space-y-2">
                <span className="block text-sm glass-badge w-fit px-3">{shortAddress}</span>
                <button
                  onClick={() => disconnect()}
                  className="w-full bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-white text-sm transition"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <ConnectButton showBalance={false} chainStatus="none" accountStatus="avatar" />
            )}
          </ClientOnly>
        </div>
      )}
    </nav>
  );
}

export default Header;
