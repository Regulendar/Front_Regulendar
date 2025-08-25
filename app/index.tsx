import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, Text } from 'tamagui';

export default function Index() {
  return (
    <SafeAreaView edges={['top']} style={{ flex: 1 }}>
      <Stack flex={1} justify="center" items="center">
        <Text fontSize="$5" fontWeight="$16">
          Index
        </Text>
      </Stack>
    </SafeAreaView>
  );
}
