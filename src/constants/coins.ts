import { CoinRewardTier } from '@/src/types';

/**
 * Coin reward tiers based on streak day
 * Progressive rewards encourage maintaining streaks
 */
export const COIN_REWARD_TIERS: CoinRewardTier[] = [
  { minStreakDay: 1, maxStreakDay: 1, coinsPerCompletion: 1 },
  { minStreakDay: 2, maxStreakDay: 2, coinsPerCompletion: 2 },
  { minStreakDay: 3, maxStreakDay: 3, coinsPerCompletion: 3 },
  { minStreakDay: 4, maxStreakDay: 4, coinsPerCompletion: 4 },
  { minStreakDay: 5, maxStreakDay: 5, coinsPerCompletion: 5 },
  { minStreakDay: 6, maxStreakDay: 6, coinsPerCompletion: 6 },
  { minStreakDay: 7, maxStreakDay: 7, coinsPerCompletion: 10 },
  { minStreakDay: 8, maxStreakDay: 13, coinsPerCompletion: 7 },
  { minStreakDay: 14, maxStreakDay: 14, coinsPerCompletion: 15 },
  { minStreakDay: 15, maxStreakDay: 29, coinsPerCompletion: 8 },
  { minStreakDay: 30, maxStreakDay: 30, coinsPerCompletion: 25 },
  { minStreakDay: 31, maxStreakDay: Infinity, coinsPerCompletion: 10 },
];

/**
 * Milestone definitions for special rewards
 */
export const MILESTONES: Record<number, { name: string; bonus: number }> = {
  7: { name: 'Week Champion', bonus: 3 },
  14: { name: 'Two Week Warrior', bonus: 7 },
  30: { name: 'Month Master', bonus: 17 },
  100: { name: 'Century Legend', bonus: 50 },
  365: { name: 'Year Champion', bonus: 100 },
};
