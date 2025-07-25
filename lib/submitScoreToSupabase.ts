// lib/submitScoreToSupabase.ts
import { supabase } from './supabaseClient';

export async function submitScoreToSupabase({
  address,
  score,
}: {
  address: string;
  score: number;
}) {
  try {
    const { data, error } = await supabase
      .from('LEADERBOARD')
      .insert([{ wallet_address: address, score }]) // ✅ fix key here
      .select();

    if (error) {
      console.error('[Supabase Insert Error]', error);
      throw new Error('Failed to submit score to Supabase');
    }

    console.log('[Supabase Insert Success]', data);
    return data;
  } catch (err) {
    console.error('[submitScoreToSupabase] Unexpected error:', err);
    throw err;
  }
}
