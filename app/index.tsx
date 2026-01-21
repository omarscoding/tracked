import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTaskStore } from '@/src/store';
import { ScreenContainer } from '@/src/components/layout/ScreenContainer';
import { Header } from '@/src/components/layout/Header';
import { TaskList } from '@/src/components/task/TaskList';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from '@/src/constants/theme';

export default function HomeScreen() {
  const tasks = useTaskStore((state) => state.tasks);

  return (
    <ScreenContainer noPadding>
      <Header title="Tracked" />

      {tasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="checkbox-outline" size={64} color={COLORS.textMuted} />
          <Text style={styles.emptyTitle}>No tasks yet</Text>
          <Text style={styles.emptyDescription}>Start tracking your first habit</Text>
          <Link href="/task/create" asChild>
            <View style={styles.createButton}>
              <Text style={styles.createButtonText}>Create Task</Text>
            </View>
          </Link>
        </View>
      ) : (
        <View style={styles.listContainer}>
          <TaskList tasks={tasks} />
        </View>
      )}

      {tasks.length > 0 && (
        <Link href="/task/create" asChild>
          <View style={styles.fab}>
            <Ionicons name="add" size={28} color="#fff" />
          </View>
        </Link>
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    paddingHorizontal: SPACING.md,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
  },
  emptyTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: SPACING.md,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
    textAlign: 'center',
  },
  createButton: {
    marginTop: SPACING.lg,
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    cursor: 'pointer',
  },
  createButtonText: {
    color: '#fff',
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    bottom: SPACING.lg,
    right: SPACING.lg,
    width: 56,
    height: 56,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    cursor: 'pointer',
  },
});
