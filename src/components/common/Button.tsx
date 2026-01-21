import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from '@/src/constants/theme';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: TextStyle;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  textStyle,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const variantStyles = {
    primary: styles.primary,
    secondary: styles.secondary,
    ghost: styles.ghost,
    danger: styles.danger,
  };

  const sizeStyles = {
    sm: styles.smSize,
    md: styles.mdSize,
    lg: styles.lgSize,
  };

  const textVariantStyles = {
    primary: styles.primaryText,
    secondary: styles.secondaryText,
    ghost: styles.ghostText,
    danger: styles.dangerText,
  };

  const textSizeStyles = {
    sm: styles.smText,
    md: styles.mdText,
    lg: styles.lgText,
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
      style={[
        styles.base,
        variantStyles[variant],
        sizeStyles[size],
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? '#fff' : COLORS.primary}
        />
      ) : (
        <Text
          style={[
            styles.text,
            textVariantStyles[variant],
            textSizeStyles[size],
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDER_RADIUS.md,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        userSelect: 'none',
      },
    }),
  },
  disabled: {
    opacity: 0.5,
  },

  // Variants
  primary: {
    backgroundColor: COLORS.primary,
  },
  secondary: {
    backgroundColor: COLORS.backgroundSecondary,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  danger: {
    backgroundColor: COLORS.error,
  },

  // Sizes
  smSize: {
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
  },
  mdSize: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },
  lgSize: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },

  // Text
  text: {
    fontWeight: '600',
  },
  primaryText: {
    color: '#fff',
  },
  secondaryText: {
    color: COLORS.text,
  },
  ghostText: {
    color: COLORS.primary,
  },
  dangerText: {
    color: '#fff',
  },
  smText: {
    fontSize: FONT_SIZES.sm,
  },
  mdText: {
    fontSize: FONT_SIZES.md,
  },
  lgText: {
    fontSize: FONT_SIZES.lg,
  },
});
