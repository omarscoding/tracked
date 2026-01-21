import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CoinBalance } from '../coins/CoinBalance';
import { COLORS, SPACING, FONT_SIZES } from '@/src/constants/theme';

interface HeaderProps {
  title: string;
  showCoins?: boolean;
  rightElement?: React.ReactNode;
}

export function Header({ title, showCoins = true, rightElement }: HeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.right}>
        {showCoins && <CoinBalance />}
        {rightElement}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: '700',
    color: COLORS.text,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
});
