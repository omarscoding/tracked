import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING } from '@/src/constants/theme';

interface ScreenContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  noPadding?: boolean;
}

export function ScreenContainer({
  children,
  style,
  noPadding = false,
}: ScreenContainerProps) {
  return (
    <SafeAreaView style={styles.safe}>
      <View
        style={[
          styles.container,
          !noPadding && styles.padding,
          style,
        ]}
      >
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  padding: {
    paddingHorizontal: SPACING.md,
  },
});
