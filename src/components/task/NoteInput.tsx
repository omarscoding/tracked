import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { SPACING } from '@/src/constants/theme';

interface NoteInputProps {
  visible: boolean;
  taskName: string;
  onSubmit: (note?: string) => void;
  onSkip: () => void;
}

export function NoteInput({
  visible,
  taskName,
  onSubmit,
  onSkip,
}: NoteInputProps) {
  const [note, setNote] = useState('');

  const handleSubmit = () => {
    onSubmit(note.trim() || undefined);
    setNote('');
  };

  const handleSkip = () => {
    onSkip();
    setNote('');
  };

  return (
    <Modal visible={visible} onClose={handleSkip} title={`${taskName} completed!`}>
      <Input
        placeholder="Add a note for today (optional)"
        value={note}
        onChangeText={setNote}
        multiline
        numberOfLines={3}
        maxLength={280}
      />
      <View style={styles.buttons}>
        <Button
          title="Skip"
          variant="ghost"
          onPress={handleSkip}
          style={styles.button}
        />
        <Button
          title="Save"
          onPress={handleSubmit}
          style={styles.button}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: SPACING.sm,
  },
  button: {
    flex: 1,
  },
});
