import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { formatCoinReward } from '@/src/services/coinService';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '@/src/constants/theme';

interface CoinRewardProps {
  amount: number;
  visible: boolean;
  onAnimationComplete?: () => void;
}

export function CoinReward({
  amount,
  visible,
  onAnimationComplete,
}: CoinRewardProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        onAnimationComplete?.();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [visible, onAnimationComplete]);

  if (!show) return null;

  return (
    <View style={styles.container}>
      <Ionicons name="logo-bitcoin" size={20} color={COLORS.coin} />
      <Text style={styles.text}>{formatCoinReward(amount)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: -40,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    backgroundColor: COLORS.surface,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
    shadowColor: COLORS.coin,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  text: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '700',
    color: COLORS.coin,
  },
});
