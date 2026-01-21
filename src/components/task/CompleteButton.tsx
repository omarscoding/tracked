import React from 'react';
import { Pressable, View, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { COLORS, BORDER_RADIUS } from '@/src/constants/theme';

interface CompleteButtonProps {
  isCompleted: boolean;
  taskColor: string;
  onPress: () => void;
  size?: number;
}

export function CompleteButton({
  isCompleted,
  taskColor,
  onPress,
  size = 48,
}: CompleteButtonProps) {
  const handlePress = async () => {
    if (isCompleted) return;

    if (Platform.OS !== 'web') {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    onPress();
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={isCompleted}
      role="button"
      style={({ pressed }) => [
        pressed && { opacity: 0.8, transform: [{ scale: 0.95 }] }
      ]}
    >
      <View
        style={[
          styles.button,
          {
            width: size,
            height: size,
            backgroundColor: isCompleted ? taskColor : COLORS.backgroundSecondary,
            borderColor: isCompleted ? taskColor : COLORS.border,
          },
        ]}
      >
        <Ionicons
          name={isCompleted ? 'checkmark' : 'add'}
          size={size * 0.5}
          color={isCompleted ? '#fff' : COLORS.textSecondary}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
});
