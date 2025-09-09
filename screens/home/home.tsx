import { memo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, Text } from 'tamagui';

export const HomeScreen = memo(() => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack flex={1} justify="center" items="center">
        <Text>HomeScreen</Text>
      </Stack>
    </SafeAreaView>
  );
});
