import { COIN_REWARD_TIERS, MILESTONES } from '@/src/constants/coins';

/**
 * Calculate coins earned for completing a task at a given streak day
 */
export function calculateCoinsForStreak(streakDay: number): number {
  const tier = COIN_REWARD_TIERS.find(
    (t) => streakDay >= t.minStreakDay && streakDay <= t.maxStreakDay
  );

  return tier?.coinsPerCompletion ?? 1;
}

/**
 * Milestone bonus info
 */
export interface MilestoneBonus {
  isMilestone: boolean;
  milestoneName?: string;
  bonusAmount?: number;
}

/**
 * Get bonus milestone info if applicable
 */
export function getMilestoneBonus(streakDay: number): MilestoneBonus {
  const milestone = MILESTONES[streakDay];
  if (milestone) {
    return {
      isMilestone: true,
      milestoneName: milestone.name,
      bonusAmount: milestone.bonus,
    };
  }

  return { isMilestone: false };
}

/**
 * Format coin reward for display
 */
export function formatCoinReward(amount: number): string {
  return `+${amount} ${amount === 1 ? 'coin' : 'coins'}`;
}
