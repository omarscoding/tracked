import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { TaskColor } from '@/src/types';
import { useTaskStore } from '@/src/store';
import { Input } from '@/src/components/common/Input';
import { Button } from '@/src/components/common/Button';
import { ColorPicker } from '@/src/components/common/ColorPicker';
import { ConfirmDialog } from '@/src/components/common/ConfirmDialog';
import { SPACING } from '@/src/constants/theme';

export default function EditTaskScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const task = useTaskStore((state) => state.getTask(id));
  const updateTask = useTaskStore((state) => state.updateTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);

  const [name, setName] = useState(task?.name ?? '');
  const [description, setDescription] = useState(task?.description ?? '');
  const [color, setColor] = useState<TaskColor>(task?.color ?? 'blue');
  const [error, setError] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!task) {
    router.back();
    return null;
  }

  const handleSave = () => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError('Task name is required');
      return;
    }

    if (trimmedName.length > 50) {
      setError('Task name must be 50 characters or less');
      return;
    }

    updateTask(id, {
      name: trimmedName,
      description: description.trim() || undefined,
      color,
    });
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    deleteTask(id);
    router.dismissAll();
    router.replace('/');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
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
        autoFocus
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

      <ColorPicker label="Color" value={color} onChange={setColor} />

      <View style={styles.buttons}>
        <Button
          title="Cancel"
          variant="secondary"
          onPress={handleCancel}
          style={styles.button}
        />
        <Button
          title="Save Changes"
          onPress={handleSave}
          style={styles.button}
        />
      </View>

      <Button
        title="Delete Task"
        variant="danger"
        onPress={handleDelete}
        style={styles.deleteButton}
      />

      <ConfirmDialog
        visible={showDeleteConfirm}
        title="Delete Task"
        message={`Are you sure you want to delete "${task.name}"? This will also delete all completion history.`}
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteConfirm(false)}
        destructive
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: SPACING.md,
  },
  buttons: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: SPACING.lg,
  },
  button: {
    flex: 1,
  },
  deleteButton: {
    marginTop: SPACING.xl,
  },
});
