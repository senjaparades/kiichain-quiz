'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Container from '@/components/ui/container';
import Link from 'next/link';
import { useAccount } from 'wagmi';

export default function Home() {
  const { isConnected } = useAccount();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <Container>
      <section className="flex flex-col items-center justify-center min-h-[50vh] py-6 px-4 text-center relative">
        <h1
          className={`
            text-4xl md:text-6xl font-extrabold uppercase 
            text-black relative inline-block tracking-wider
            animate-[pulse_1.5s_infinite] scale-110 
          `}
          style={{
            WebkitTextStroke: '3px white',
            color: 'black',
            filter: 'drop-shadow(0 0 6px #fff)',
          }}
        >
          Kiiper Quiz
        </h1>

        <p
          className="mt-4 text-lg md:text-xl text-yellow-200 max-w-xl animate-[slideInUp_1.5s_ease-out] glow-text"
        >
          Test your knowledge about KiiChain and earn your spot on the weekly leaderboard.
        </p>

        {/* Connect Wallet or Start Quiz Button */}
        <div className="mt-6">
          {!isConnected ? (
            <div className="border-4 border-red-400 bg-red-700 text-white text-2xl font-bold px-6 py-4 rounded-xl shadow-2xl animate-[flash_1s_infinite]">
              🚨 Please connect your wallet
            </div>
          ) : (
            <Link href="/quiz">
              <button className={`
                bg-yellow-400 hover:bg-yellow-300 active:scale-95 
                text-blue-900 text-3xl md:text-4xl font-extrabold 
                px-10 py-4 rounded-full shadow-2xl border-4 border-yellow-500 
                animate-[bounce_1.5s_infinite] 
                relative overflow-hidden transition-all duration-200
                hover:shadow-yellow-500 group
              `}>
                <span className="relative z-10">🚀 START QUIZ</span>
                <span className="absolute inset-0 bg-white opacity-10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
              </button>
            </Link>
          )}
        </div>

        <div className="mt-8 animate-[zoomIn_1.2s_ease-out]">
          <Image
            src="/funquiz.png"
            alt="funquiz"
            width={400}
            height={200}
            className="mx-auto"
          />
        </div>
      </section>

      {/* Extra Animations CSS */}
      <style jsx global>{`
        @keyframes slideInUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes flash {
          0%, 50%, 100% { opacity: 1; }
          25%, 75% { opacity: 0; }
        }
        @keyframes zoomIn {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .glow-text {
          text-shadow: 0 0 6px #facc15, 0 0 10px #facc15;
        }
      `}</style>
    </Container>
  );
}
