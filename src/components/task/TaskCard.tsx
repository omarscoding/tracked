import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Task, TASK_COLORS } from '@/src/types';
import { useStreak } from '@/src/hooks';
import { useTaskStore, useCoinStore } from '@/src/store';
import { calculateCoinsForStreak } from '@/src/services/coinService';
import { Card } from '../common/Card';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { StreakBadge } from './StreakBadge';
import { CountdownTimer } from './CountdownTimer';
import { CompleteButton } from './CompleteButton';
import { TaskMenu } from './TaskMenu';
import { NoteInput } from './NoteInput';
import { CoinReward } from '../coins/CoinReward';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '@/src/constants/theme';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showCoinReward, setShowCoinReward] = useState(false);
  const [earnedCoins, setEarnedCoins] = useState(0);

  const streak = useStreak(task.id);
  const completeTask = useTaskStore((state) => state.completeTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const addCoins = useCoinStore((state) => state.addCoins);

  const taskColor = TASK_COLORS[task.color];

  const handleComplete = () => {
    setShowNoteInput(true);
  };

  const handleNoteSubmit = (note?: string) => {
    const nextStreakDay = streak.nextStreakDay;
    const coins = calculateCoinsForStreak(nextStreakDay);

    completeTask(task.id, coins, nextStreakDay, note);
    addCoins(coins);

    setShowNoteInput(false);
    setEarnedCoins(coins);
    setShowCoinReward(true);
  };

  const handleNoteSkip = () => {
    const nextStreakDay = streak.nextStreakDay;
    const coins = calculateCoinsForStreak(nextStreakDay);

    completeTask(task.id, coins, nextStreakDay);
    addCoins(coins);

    setShowNoteInput(false);
    setEarnedCoins(coins);
    setShowCoinReward(true);
  };

  const handleEdit = () => {
    router.push(`/task/${task.id}/edit`);
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    deleteTask(task.id);
    setShowDeleteConfirm(false);
  };

  const handleCardPress = () => {
    router.push(`/task/${task.id}`);
  };

  return (
    <View style={styles.wrapper}>
      <Pressable onPress={handleCardPress}>
        <Card style={styles.card}>
          <View style={styles.header}>
            <View style={[styles.colorIndicator, { backgroundColor: taskColor }]} />
            <View style={styles.titleContainer}>
              <Text style={styles.title} numberOfLines={1}>
                {task.name}
              </Text>
              {task.description && (
                <Text style={styles.description} numberOfLines={1}>
                  {task.description}
                </Text>
              )}
            </View>
            <TaskMenu onEdit={handleEdit} onDelete={handleDelete} />
          </View>

          <View style={styles.footer}>
            <View style={styles.streakInfo}>
              <StreakBadge streak={streak.currentStreak} />
              {!streak.isCompletedToday && streak.currentStreak > 0 && (
                <CountdownTimer />
              )}
            </View>

            <View style={styles.completeContainer}>
              <CoinReward
                amount={earnedCoins}
                visible={showCoinReward}
                onAnimationComplete={() => setShowCoinReward(false)}
              />
              <CompleteButton
                isCompleted={streak.isCompletedToday}
                taskColor={taskColor}
                onPress={handleComplete}
              />
            </View>
          </View>
        </Card>
      </Pressable>

      <NoteInput
        visible={showNoteInput}
        taskName={task.name}
        onSubmit={handleNoteSubmit}
        onSkip={handleNoteSkip}
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
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  card: {
    marginBottom: SPACING.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  colorIndicator: {
    width: 4,
    height: '100%',
    minHeight: 40,
    borderRadius: BORDER_RADIUS.full,
    marginRight: SPACING.sm,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
  },
  description: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SPACING.sm,
    paddingLeft: SPACING.md,
  },
  streakInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  completeContainer: {
    position: 'relative',
  },
});
