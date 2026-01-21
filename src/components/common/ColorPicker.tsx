import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TaskColor, TASK_COLORS } from '@/src/types';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from '@/src/constants/theme';

interface ColorPickerProps {
  value: TaskColor;
  onChange: (color: TaskColor) => void;
  label?: string;
}

const colorOptions = Object.keys(TASK_COLORS) as TaskColor[];

export function ColorPicker({ value, onChange, label }: ColorPickerProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.grid}>
        {colorOptions.map((color) => (
          <TouchableOpacity
            key={color}
            onPress={() => onChange(color)}
            activeOpacity={0.7}
            style={[
              styles.colorButton,
              { backgroundColor: TASK_COLORS[color] },
              value === color && styles.selected,
            ]}
          >
            {value === color && (
              <Ionicons name="checkmark" size={20} color="#fff" />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  colorButton: {
    width: 44,
    height: 44,
    borderRadius: BORDER_RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  selected: {
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
});
