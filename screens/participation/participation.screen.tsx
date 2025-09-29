import { Card } from '@/components';
import { memo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, Text } from 'tamagui';

export const ParticipationScreen = memo(() => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack flex={1} justify="center" items="center">
        <Text>ParticipationScreen</Text>
        <Stack width="$fluid" flexDirection="row" justify="space-between" flexWrap="wrap" items="center">
          <Card
            size="$x40"
            backgroundImg={
              'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
            }>
            <Stack p="$size.x2" flex={1} width="$fluid" justify="flex-end" items="flex-end">
              <Text fontSize="$8">Card 1</Text>
            </Stack>
          </Card>
        </Stack>
      </Stack>
    </SafeAreaView>
  );
});
