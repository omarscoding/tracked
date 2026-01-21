import React from 'react';
import { FlatList, StyleSheet, RefreshControl } from 'react-native';
import { Task } from '@/src/types';
import { TaskCard } from './TaskCard';
import { SPACING } from '@/src/constants/theme';

interface TaskListProps {
  tasks: Task[];
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function TaskList({ tasks, refreshing = false, onRefresh }: TaskListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <TaskCard task={item} />}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
      refreshControl={
        onRefresh ? (
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        ) : undefined
      }
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingVertical: SPACING.sm,
  },
});
