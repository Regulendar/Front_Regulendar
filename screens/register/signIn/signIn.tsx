import { memo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, Text } from 'tamagui';

export const SignInScreen = memo(() => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack>
        <Text>Sign In Screen</Text>
      </Stack>
    </SafeAreaView>
  );
});
