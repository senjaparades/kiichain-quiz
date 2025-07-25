'use client';

import React, { useEffect, useState } from 'react';
import Container from '@/components/ui/container';
import { supabase } from '@/lib';
import { useAccount } from 'wagmi';
import isOwner from '@/lib/isOwner';
import { toast } from 'sonner';

interface LeaderboardEntry {
  id: string;
  address: string;
  score: number;
  submitted_at: string;
}

export default function LeaderboardPage() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const { address } = useAccount();

  const fetchLeaderboard = async () => {
    const { data, error } = await supabase
      .from('LEADERBOARD')
      .select('*')
      .order('score', { ascending: false });

    if (error) {
      console.error('Fetch error:', error.message);
    } else {
      setEntries(data || []);
    }

    setLoading(false);
  };

  const handleResetLeaderboard = async () => {
    const confirmed = window.confirm('Are you sure you want to reset the leaderboard?');
    if (!confirmed) return;

    const { error } = await supabase.from('LEADERBOARD').delete().neq('id', '');

    if (error) {
      toast.error('Failed to reset leaderboard');
    } else {
      toast.success('Leaderboard reset successfully');
      fetchLeaderboard(); // refresh
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  useEffect(() => {
    const checkAdmin = async () => {
      if (address) {
        const result = await isOwner(address);
        setIsAdmin(result);
      }
    };
    checkAdmin();
  }, [address]);

  return (
    <Container className="pt-28 animate-fade-up">
      <h1 className="text-4xl md:text-5xl font-bold text-yellow-300 drop-shadow-[2px_2px_0px_black] text-center mb-6">
        🏆 Leaderboard
      </h1>

      <div className="text-center mb-6 space-x-4">
        <button
          onClick={fetchLeaderboard}
          className="text-blue-400 hover:text-blue-600 text-sm underline"
        >
          🔄 Refresh Leaderboard
        </button>

        {isAdmin && (
          <button
            onClick={handleResetLeaderboard}
            className="text-red-500 hover:text-red-700 text-sm underline"
          >
            ❌ Reset Leaderboard (Admin)
          </button>
        )}
      </div>

      {loading ? (
        <p className="text-center text-gray-400">Loading leaderboard...</p>
      ) : entries.length === 0 ? (
        <p className="text-center text-gray-400">No entries yet.</p>
      ) : (
        <div className="max-w-3xl mx-auto bg-white dark:bg-zinc-900 rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-sm md:text-base">
              <thead className="bg-gray-200 dark:bg-zinc-800 text-gray-800 dark:text-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left">Rank</th>
                  <th className="px-4 py-3 text-left">Wallet</th>
                  <th className="px-4 py-3 text-left">Score</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, idx) => (
                  <tr
                    key={entry.id}
                    className={
                      idx % 2 === 0
                        ? 'bg-gray-50 dark:bg-zinc-900'
                        : 'bg-white dark:bg-zinc-800'
                    }
                  >
                    <td className="px-4 py-3">{idx + 1}</td>
                    <td className="px-4 py-3 font-mono text-sm">
                      {entry.address.slice(0, 6)}...
                      {entry.address.slice(-4)}
                    </td>
                    <td className="px-4 py-3">{entry.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Container>
  );
}
