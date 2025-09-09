import { supabaseAuth } from '@/libs';
import { useRouter } from 'expo-router';
import { memo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDidMount } from 'rooks';
import { Stack, Text } from 'tamagui';

export const GreetingScreen = memo(() => {
  const route = useRouter();

  useDidMount(async () => {
    const { data } = await supabaseAuth.getUser();
    const isUserLoggedIn = !!data?.user;
    if (isUserLoggedIn) {
      // #TODO(@Milgam06): MainScreen으로 변경
    }
    route.navigate('/register/register');
    return;
  });

  return (
    <Stack flex={1} bg="$colors.darkGreen">
      <SafeAreaView style={{ flex: 1 }}>
        <Stack flex={1} justify="center" items="center" gap="$size.x2">
          <Text fontSize="$12" fontWeight="800" color="$colors.white">
            Regulendar
          </Text>
          <Text fontSize="$8" fontWeight="700" color="$colors.white">
            정기적인 모임 관리의 시작
          </Text>
        </Stack>
      </SafeAreaView>
    </Stack>
  );
});
