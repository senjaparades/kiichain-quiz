export function getLeaderboard() {
  if (typeof window === 'undefined') return [];

  try {
    const data = localStorage.getItem('leaderboard');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load leaderboard from localStorage:', error);
    return [];
  }
}

export function saveLeaderboard(data: any) {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem('leaderboard', JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save leaderboard to localStorage:', error);
  }
}
