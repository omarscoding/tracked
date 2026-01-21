import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TaskColor, TASK_COLORS } from '@/src/types';
import { useTaskStore } from '@/src/store';
import { Input } from '@/src/components/common/Input';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from '@/src/constants/theme';

const colorOptions = Object.keys(TASK_COLORS) as TaskColor[];

export default function CreateTaskScreen() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState<TaskColor>('blue');
  const [error, setError] = useState('');

  const addTask = useTaskStore((state) => state.addTask);

  const handleCreate = () => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError('Task name is required');
      return;
    }

    if (trimmedName.length > 50) {
      setError('Task name must be 50 characters or less');
      return;
    }

    addTask(trimmedName, color, description.trim() || undefined);
    router.replace('/');
  };

  const handleCancel = () => {
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <Input
        label="Task Name"
        placeholder="e.g., LeetCode, Gym, Read"
        value={name}
        onChangeText={(text) => {
          setName(text);
          setError('');
        }}
        error={error}
        maxLength={50}
      />

      <Input
        label="Description (optional)"
        placeholder="What's this task about?"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={3}
        maxLength={200}
      />

      <View style={styles.colorSection}>
        <Text style={styles.colorLabel}>Color</Text>
        <View style={styles.colorGrid}>
          {colorOptions.map((c) => (
            <TouchableOpacity
              key={c}
              onPress={() => setColor(c)}
              activeOpacity={0.7}
              style={[
                styles.colorButton,
                { backgroundColor: TASK_COLORS[c] },
                color === c && styles.colorSelected,
              ]}
            >
              {color === c && (
                <Ionicons name="checkmark" size={20} color="#fff" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={handleCancel}
          activeOpacity={0.7}
          style={[styles.btn, styles.btnSecondary]}
        >
          <Text style={styles.btnSecondaryText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleCreate}
          activeOpacity={0.7}
          style={[styles.btn, styles.btnPrimary]}
        >
          <Text style={styles.btnPrimaryText}>Create Task</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: SPACING.md,
  },
  colorSection: {
    marginBottom: SPACING.md,
  },
  colorLabel: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  colorGrid: {
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
  },
  colorSelected: {
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttons: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: SPACING.lg,
  },
  btn: {
    flex: 1,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPrimary: {
    backgroundColor: COLORS.primary,
  },
  btnSecondary: {
    backgroundColor: COLORS.backgroundSecondary,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  btnPrimaryText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: FONT_SIZES.md,
  },
  btnSecondaryText: {
    color: COLORS.text,
    fontWeight: '600',
    fontSize: FONT_SIZES.md,
  },
});
