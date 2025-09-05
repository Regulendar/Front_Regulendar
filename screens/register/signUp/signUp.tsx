import { memo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, Text } from 'tamagui';

export const SignUpScreen = memo(() => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack flex={1} width="$fluid">
        <Text>회원가입</Text>
      </Stack>
    </SafeAreaView>
  );
});
