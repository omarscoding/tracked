/**
 * Global coin balance state
 */
export interface CoinState {
  balance: number;
  lifetimeEarned: number;
  lastUpdated: string;
}

/**
 * Coin reward tier configuration
 */
export interface CoinRewardTier {
  minStreakDay: number;
  maxStreakDay: number;
  coinsPerCompletion: number;
}

/**
 * Transaction record for coin history
 */
export interface CoinTransaction {
  id: string;
  type: 'earned' | 'spent';
  amount: number;
  taskId?: string;
  timestamp: string;
  description: string;
}
