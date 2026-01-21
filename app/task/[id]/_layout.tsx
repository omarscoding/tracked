import { Stack } from 'expo-router';

export default function TaskIdLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        contentStyle: { backgroundColor: '#fff' },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: '',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name="edit"
        options={{
          presentation: 'modal',
          headerTitle: 'Edit Task',
        }}
      />
    </Stack>
  );
}
