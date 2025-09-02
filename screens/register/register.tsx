import { useRouter } from 'expo-router';
import { memo, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Stack, Text } from 'tamagui';

export const RegisterScreen = memo(() => {
  const router = useRouter();

  const onPressSignIn = useCallback(() => {
    return router.push('/register/signIn/signIn');
  }, [router]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack flex={1} justify="space-between" items="center">
        <Stack flex={1} justify="center" items="center" gap="$size.x2">
          <Text fontSize="$12" fontWeight="800" color="$colors.componentGreen">
            Regulendar
          </Text>
          <Text fontSize="$8" fontWeight="700" color="$colors.componentGreen">
            정기적인 모임 관리의 시작
          </Text>
        </Stack>
        <Stack width="100%" justify="space-around" px="$size.x4" mb="$size.x6" gap="$size.x2">
          <Button
            height="auto"
            px="$size.x6"
            py="$size.x3"
            bg="$colors.componentGreen"
            pressStyle={{ bg: '$colors.darkGreen', scale: 0.99 }}>
            <Text fontSize="$8" fontWeight="700" color="$colors.white">
              회원 가입
            </Text>
          </Button>
          <Button
            height="auto"
            px="$size.x6"
            py="$size.x3"
            bg="$colors.componentGreen"
            pressStyle={{ bg: '$colors.darkGreen', scale: 0.99 }}
            onPress={onPressSignIn}>
            <Text fontSize="$8" fontWeight="700" color="$colors.white">
              로그인
            </Text>
          </Button>
        </Stack>
      </Stack>
    </SafeAreaView>
  );
});
