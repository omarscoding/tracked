import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Modal } from '../common/Modal';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '@/src/constants/theme';

interface TaskMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

export function TaskMenu({ onEdit, onDelete }: TaskMenuProps) {
  const [visible, setVisible] = useState(false);

  const handleEdit = () => {
    setVisible(false);
    onEdit();
  };

  const handleDelete = () => {
    setVisible(false);
    onDelete();
  };

  return (
    <>
      <Pressable
        onPress={() => setVisible(true)}
        style={({ pressed }) => [styles.trigger, pressed && styles.pressed]}
      >
        <Ionicons name="ellipsis-horizontal" size={20} color={COLORS.textSecondary} />
      </Pressable>

      <Modal visible={visible} onClose={() => setVisible(false)}>
        <View style={styles.menu}>
          <Pressable
            onPress={handleEdit}
            style={({ pressed }) => [styles.menuItem, pressed && styles.menuItemPressed]}
          >
            <Ionicons name="pencil" size={20} color={COLORS.text} />
            <Text style={styles.menuItemText}>Edit Task</Text>
          </Pressable>
          <Pressable
            onPress={handleDelete}
            style={({ pressed }) => [styles.menuItem, pressed && styles.menuItemPressed]}
          >
            <Ionicons name="trash-outline" size={20} color={COLORS.error} />
            <Text style={[styles.menuItemText, styles.deleteText]}>Delete Task</Text>
          </Pressable>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    padding: SPACING.xs,
    borderRadius: BORDER_RADIUS.full,
  },
  pressed: {
    backgroundColor: COLORS.backgroundSecondary,
  },
  menu: {
    gap: SPACING.xs,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
  },
  menuItemPressed: {
    backgroundColor: COLORS.backgroundSecondary,
  },
  menuItemText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
  },
  deleteText: {
    color: COLORS.error,
  },
});
