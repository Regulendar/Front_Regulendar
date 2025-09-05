import { memo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, Text } from 'tamagui';

export const SignUpScreen = memo(() => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack flex={1} width="$fluid" px="$size.x5" py="$size.x10" gap="$size.x20">
        <Stack items="center" gap="$size.x8">
          <Stack width="$fluid" gap="$size.x2">
            <Stack width="$fluid" gap="$size.x1">
              <Text fontSize="$9" fontWeight="800" color="$colors.darkGreen">
                똑똑한 일정 관리
              </Text>
              <Text fontSize="$9" fontWeight="800" color="$colors.black">
                시작해볼까요?
              </Text>
            </Stack>

            <Text fontSize="$6" fontWeight="700" color="$colors.mediumGray">
              양식을 작성하여 회원가입을 완료해주세요.
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </SafeAreaView>
  );
});
