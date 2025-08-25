import { memo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, Text } from 'tamagui';

export const GreetingScreen = memo(() => {
  return (
    <SafeAreaView edges={[]} style={{ flex: 1, backgroundColor: '#00B906' }}>
      <Stack flex={1} justify="center" items="center" gap="$size.x2">
        <Text fontSize="$11" fontWeight="800" color="$colors.white">
          Regulendar
        </Text>
        <Text fontSize="$8" fontWeight="700" color="$colors.white">
          정기적인 모임 관리의 시작
        </Text>
      </Stack>
    </SafeAreaView>
  );
});
