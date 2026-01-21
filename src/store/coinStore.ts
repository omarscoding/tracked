import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getZustandStorage } from '@/src/storage/adapters';
import { getISOTimestamp } from '@/src/utils/date';

interface CoinStoreState {
  balance: number;
  lifetimeEarned: number;
  lastUpdated: string;

  addCoins: (amount: number) => void;
  spendCoins: (amount: number) => boolean;
}

export const useCoinStore = create<CoinStoreState>()(
  persist(
    (set, get) => ({
      balance: 0,
      lifetimeEarned: 0,
      lastUpdated: getISOTimestamp(),

      addCoins: (amount) => {
        set((state) => ({
          balance: state.balance + amount,
          lifetimeEarned: state.lifetimeEarned + amount,
          lastUpdated: getISOTimestamp(),
        }));
      },

      spendCoins: (amount) => {
        const { balance } = get();
        if (balance < amount) return false;
        set((state) => ({
          balance: state.balance - amount,
          lastUpdated: getISOTimestamp(),
        }));
        return true;
      },
    }),
    {
      name: 'tracked-coins',
      storage: createJSONStorage(() => getZustandStorage()),
    }
  )
);
