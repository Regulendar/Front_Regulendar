import { Button } from '@/components';
import { useRouter } from 'expo-router';
import { memo, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, Text } from 'tamagui';

export const RegisterScreen = memo(() => {
  const router = useRouter();

  const handlePressSignIn = useCallback(() => {
    router.navigate('/register/signIn/signIn');
  }, [router]);

  const handlePressSignUp = useCallback(() => {
    router.navigate('/register/signUp/signUp');
  }, [router]);

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1 }}>
      <Stack flex={1} justify="space-between" py="$size.x10" items="center">
        <Stack flex={1} justify="center" items="center" gap="$size.x2">
          <Text fontSize="$12" fontWeight="800" color="$colors.componentGreen">
            Regulendar
          </Text>
          <Text fontSize="$8" fontWeight="700" color="$colors.componentGreen">
            정기적인 모임 관리의 시작
          </Text>
        </Stack>
        <Stack width="100%" justify="space-around" px="$size.x4" gap="$size.x2">
          <Button
            px="$size.x6"
            py="$size.x3"
            bg="$colors.componentGreen"
            pressStyle={{ bg: '$colors.componentGreen', scale: 0.99, opacity: 0.8 }}
            onPress={handlePressSignUp}>
            <Text fontSize="$8" fontWeight="700" color="$colors.white">
              회원 가입
            </Text>
          </Button>
          <Button
            px="$size.x6"
            py="$size.x3"
            bg="$colors.componentGreen"
            pressStyle={{ bg: '$colors.componentGreen', scale: 0.99, opacity: 0.8 }}
            onPress={handlePressSignIn}>
            <Text fontSize="$8" fontWeight="700" color="$colors.white">
              로그인
            </Text>
          </Button>
        </Stack>
      </Stack>
    </SafeAreaView>
  );
});
