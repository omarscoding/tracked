import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useTaskStore, useCoinStore } from '@/src/store';
import { useStreak, useCountdown } from '@/src/hooks';
import { TASK_COLORS } from '@/src/types';
import { calculateCoinsForStreak } from '@/src/services/coinService';
import { formatDate } from '@/src/utils/date';
import { ScreenContainer } from '@/src/components/layout/ScreenContainer';
import { Card } from '@/src/components/common/Card';
import { Button } from '@/src/components/common/Button';
import { IconButton } from '@/src/components/common/IconButton';
import { StreakBadge } from '@/src/components/task/StreakBadge';
import { NoteInput } from '@/src/components/task/NoteInput';
import { CoinReward } from '@/src/components/coins/CoinReward';
import { Heatmap } from '@/src/components/heatmap/Heatmap';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '@/src/constants/theme';

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [showCoinReward, setShowCoinReward] = useState(false);
  const [earnedCoins, setEarnedCoins] = useState(0);

  const task = useTaskStore((state) => state.getTask(id));
  const completions = useTaskStore((state) => state.completions);
  const completeTask = useTaskStore((state) => state.completeTask);
  const addCoins = useCoinStore((state) => state.addCoins);

  const streak = useStreak(id);
  const { formatted: countdown } = useCountdown();

  if (!task) {
    return (
      <ScreenContainer>
        <Text style={styles.notFound}>Task not found</Text>
      </ScreenContainer>
    );
  }

  const taskColor = TASK_COLORS[task.color];
  const taskCompletions = completions.filter((c) => c.taskId === id);

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
    router.push(`/task/${id}/edit`);
  };

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={[styles.colorBadge, { backgroundColor: taskColor }]} />
          <View style={styles.headerContent}>
            <Text style={styles.title}>{task.name}</Text>
            {task.description && (
              <Text style={styles.description}>{task.description}</Text>
            )}
          </View>
          <IconButton icon="pencil" onPress={handleEdit} />
        </View>

        <Card style={styles.streakCard}>
          <View style={styles.streakContent}>
            <StreakBadge streak={streak.currentStreak} size="lg" />
            <Text style={styles.streakLabel}>
              {streak.currentStreak === 1 ? 'day streak' : 'day streak'}
            </Text>
          </View>

          {!streak.isCompletedToday && streak.currentStreak > 0 && (
            <Text style={styles.countdown}>{countdown} until reset</Text>
          )}

          {streak.isCompletedToday && (
            <Text style={styles.completedText}>Completed today!</Text>
          )}
        </Card>

        {!streak.isCompletedToday && (
          <View style={styles.completeContainer}>
            <CoinReward
              amount={earnedCoins}
              visible={showCoinReward}
              onAnimationComplete={() => setShowCoinReward(false)}
            />
            <Button
              title="Complete Today"
              onPress={handleComplete}
              size="lg"
              style={[styles.completeButton, { backgroundColor: taskColor }]}
            />
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Activity</Text>
          <Card padding="sm">
            <Heatmap
              completions={completions}
              taskId={id}
              taskColor={taskColor}
            />
          </Card>
        </View>

        {taskCompletions.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Notes</Text>
            {taskCompletions
              .filter((c) => c.note)
              .slice(0, 5)
              .map((completion) => (
                <Card key={completion.id} style={styles.noteCard}>
                  <Text style={styles.noteDate}>
                    {formatDate(completion.localDate, 'MMM d, yyyy')}
                  </Text>
                  <Text style={styles.noteText}>{completion.note}</Text>
                </Card>
              ))}
          </View>
        )}
      </ScrollView>

      <NoteInput
        visible={showNoteInput}
        taskName={task.name}
        onSubmit={handleNoteSubmit}
        onSkip={handleNoteSkip}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  notFound: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SPACING.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.lg,
  },
  colorBadge: {
    width: 8,
    height: 40,
    borderRadius: BORDER_RADIUS.full,
    marginRight: SPACING.sm,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: '700',
    color: COLORS.text,
  },
  description: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  streakCard: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  streakContent: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: SPACING.sm,
  },
  streakLabel: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.textSecondary,
  },
  countdown: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.warning,
    marginTop: SPACING.xs,
  },
  completedText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.success,
    marginTop: SPACING.xs,
  },
  completeContainer: {
    position: 'relative',
    marginBottom: SPACING.lg,
  },
  completeButton: {
    width: '100%',
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  noteCard: {
    marginBottom: SPACING.sm,
  },
  noteDate: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textMuted,
    marginBottom: SPACING.xs,
  },
  noteText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
  },
});
