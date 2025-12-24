import { supabaseAuth } from '@/libs';
import { useUserStore } from '@/stores';
import { useRouter } from 'expo-router';
import { memo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDidMount } from 'rooks';
import { Stack, Text } from 'tamagui';

export const SplashScreen = memo(() => {
  const route = useRouter();
  const { setUserId } = useUserStore();

  useDidMount(async () => {
    const {
      data: { user },
    } = await supabaseAuth.getUser();
    const isUserLoggedIn = !!user;
    if (isUserLoggedIn) {
      setUserId(user.id);
      route.replace('/participation/participation');
      return;
    }
    route.replace('/register/register');
    return;
  });

  return (
    <Stack flex={1} animation="lazy" enterStyle={{ background: '$colors.backgroundWhite' }} bg="$colors.darkGreen">
      <Stack asChild flex={1}>
        <SafeAreaView>
          <Stack flex={1} justify="center" items="center" gap="$size.x2">
            <Text fontSize="$12" fontWeight="800" color="$colors.backgroundWhite">
              Regulendar
            </Text>
            <Text fontSize="$8" fontWeight="700" color="$colors.backgroundWhite">
              정기적인 모임 관리의 시작
            </Text>
          </Stack>
        </SafeAreaView>
      </Stack>
    </Stack>
  );
});
