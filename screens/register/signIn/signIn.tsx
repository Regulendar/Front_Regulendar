import { memo, useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Stack, Text } from 'tamagui';
import { isEmail, isMobilePhone } from 'validator';

import { Input } from '@/components';
import { supabaseAuth } from '@/libs';

// TODO(@Milgam06): Button 추가 필요
export const SignInScreen = memo(() => {
  const [emailOrNumber, setEmailOrNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleChangeEmailOrNumber = useCallback((text: string) => {
    setEmailOrNumber(text);
  }, []);

  const handleChangePassword = useCallback((text: string) => {
    setPassword(text);
  }, []);

  const handlePressSignIn = useCallback(() => {
    const hasEmailOrPhone = emailOrNumber.length > 0;
    const hasPassword = password.length > 0;
    const isInputValid = hasEmailOrPhone && hasPassword;
    if (!isInputValid) {
      return;
    }
    const isValidEmail = isEmail(emailOrNumber);
    const isValidPhoneNumber = isMobilePhone(emailOrNumber, 'ko-KR');

    if (isValidEmail) {
      supabaseAuth.signInWithPassword({ email: emailOrNumber, password });
      return;
    }
    if (isValidPhoneNumber) {
      supabaseAuth.signInWithPassword({ phone: emailOrNumber, password });
      return;
    }
  }, [emailOrNumber, password]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack flex={1} width="$fluid" px="$size.x5" py="$size.x10" gap="$size.x20">
        <Stack items="center" gap="$size.x8">
          <Stack width="$fluid" items="center" gap="$size.x2">
            <Text fontSize="$9" fontWeight="800" color="$colors.black">
              돌아오신 것을 환영해요!
            </Text>
            <Text fontSize="$6" fontWeight="700" color="$colors.mediumGray">
              사용자님의 계정으로 로그인해주세요.
            </Text>
          </Stack>
          <Stack width="$fluid" gap="$size.x5">
            <Input
              w="$fluid"
              placeholder="example@example.com"
              labelContent="이메일 or 전화번호"
              keyboardType="email-address"
              size="$x12"
              px="$size.x3"
              borderColor="$colors.lightGray"
              fontWeight="500"
              focusStyle={{ borderColor: '$colors.darkGreen', borderWidth: 2 }}
              onChangeText={handleChangeEmailOrNumber}
            />
            <Input
              w="$fluid"
              placeholder="password"
              labelContent="비밀번호"
              secureTextEntry
              size="$x12"
              px="$size.x3"
              borderColor="$colors.lightGray"
              fontWeight="500"
              focusStyle={{ borderColor: '$colors.darkGreen', borderWidth: 2 }}
              onChangeText={handleChangePassword}
            />
          </Stack>
        </Stack>
        <Button
          width="$fluid"
          height="auto"
          px="$size.x6"
          py="$size.x3"
          bg="$colors.componentGreen"
          pressStyle={{ bg: '$colors.darkGreen', scale: 0.99 }}
          onPress={handlePressSignIn}>
          <Text fontSize="$8" fontWeight="700" color="$colors.white">
            로그인
          </Text>
        </Button>
      </Stack>
    </SafeAreaView>
  );
});
