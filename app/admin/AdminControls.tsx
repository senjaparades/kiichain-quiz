'use client';

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import {
  getRound,
  setMaxScorePerRound,
  isQuizActive,
  setQuizActive,
  getMaxScorePerRound, // ✅ Import fungsi ambil max score
} from '@/lib/contracts';
import isOwner from '@/lib/isOwner';
import { Button } from '@/components/ui/button';

export default function AdminControls() {
  const { address, isConnected } = useAccount();
  const [currentRound, setCurrentRound] = useState(0);
  const [inputMaxScore, setInputMaxScore] = useState('');
  const [currentMaxScore, setCurrentMaxScore] = useState<number | null>(null);
  const [quizActive, setQuizActiveState] = useState(false);
  const [isOwnerAddress, setIsOwnerAddress] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [round, active, ownerCheck, maxScore] = await Promise.all([
          getRound(),
          isQuizActive(),
          isOwner(address!),
          getMaxScorePerRound(), // ✅ Ambil nilai skor maksimal saat ini
        ]);

        setCurrentRound(round);
        setQuizActiveState(active);
        setIsOwnerAddress(ownerCheck);
        setCurrentMaxScore(maxScore);
      } catch (error) {
        console.error('❌ AdminControls error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isConnected && address) {
      fetchData();
    }
  }, [isConnected, address]);

  const handleSetMaxScore = async () => {
    const scoreValue = parseInt(inputMaxScore);
    if (!isNaN(scoreValue) && scoreValue > 0) {
      try {
        await setMaxScorePerRound(scoreValue);
        setCurrentMaxScore(scoreValue); // ✅ Update skor saat ini di UI
        setInputMaxScore('');
      } catch (err) {
        console.error('❌ setMaxScorePerRound error:', err);
      }
    }
  };

  const handleToggleQuiz = async () => {
    try {
      await setQuizActive(!quizActive);
      setQuizActiveState(!quizActive);
    } catch (err) {
      console.error('❌ setQuizActive error:', err);
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-zinc-900 text-white rounded-xl mt-6">
        <p>Loading admin controls...</p>
      </div>
    );
  }

  if (!isOwnerAddress) {
    return (
      <div className="p-6 bg-zinc-900 text-white rounded-xl mt-6">
        <h2 className="text-xl font-semibold">🔒 Admin Only</h2>
        <p>Connect with the deployer wallet to control the quiz.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-zinc-900 text-white rounded-xl mt-6">
      <h2 className="text-2xl font-bold mb-4">🛠 Admin Controls</h2>

      <p className="mb-2">
        📍 Current Round: <strong>{currentRound}</strong>
      </p>
      <p className="mb-4">
        🎯 Max Score Per Round: <strong>{currentMaxScore ?? 'Loading...'}</strong>
      </p>

      <div className="mb-4 flex items-center">
        <input
          type="number"
          value={inputMaxScore}
          onChange={(e) => setInputMaxScore(e.target.value)}
          placeholder="Update max score"
          className="px-3 py-2 rounded text-black w-40"
        />
        <Button
          onClick={handleSetMaxScore}
          className="ml-2 bg-yellow-500 text-black hover:bg-yellow-400"
        >
          🎯 Set Max Score
        </Button>
      </div>

      <div>
        <Button
          onClick={handleToggleQuiz}
          className={`${
            quizActive ? 'bg-red-500 hover:bg-red-400' : 'bg-green-500 hover:bg-green-400'
          } text-white`}
        >
          {quizActive ? '🛑 Deactivate Quiz' : '✅ Activate Quiz'}
        </Button>
      </div>
    </div>
  );
}
