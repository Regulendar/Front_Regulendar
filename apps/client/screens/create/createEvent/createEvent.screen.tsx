import { memo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, Text } from 'tamagui';

export const CreateEventScreen = memo(() => {
  return (
    <SafeAreaView edges={['top']} style={{ flex: 1 }}>
      <Stack flex={1} justify="center" items="center">
        <Text>Create Event Screen</Text>
      </Stack>
    </SafeAreaView>
  );
});
