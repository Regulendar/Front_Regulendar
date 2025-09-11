import { Calendar } from '@/components';
import { memo } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, Text } from 'tamagui';

export const HomeScreen = memo(() => {
  return (
    <SafeAreaView edges={['top']} style={{ flex: 1 }}>
      <Stack flex={1} width="$fluid" justify="space-between" items="center">
        <Calendar />
        <Text>HomeScreen</Text>
      </Stack>
    </SafeAreaView>
  );
});
