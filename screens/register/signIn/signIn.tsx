import { memo, useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Stack, Text } from 'tamagui';
import { isEmail, isMobilePhone, isStrongPassword } from 'validator';

import { Input } from '@/components';
import { supabaseAuth } from '@/libs';
import { useRouter } from 'expo-router';

export const SignInScreen = memo(() => {
  const route = useRouter();
  const [emailOrNumber, setEmailOrNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isSignInFailed, setIsSignInFailed] = useState<boolean>(false); // TODO(@Milgam06): 추후에 실패했을 때 UI 변경 필요

  const handleChangeEmailOrNumber = useCallback((text: string) => {
    setEmailOrNumber(text);
  }, []);

  const handleChangePassword = useCallback((text: string) => {
    setPassword(text);
  }, []);

  const handlePressSignIn = useCallback(async () => {
    const isEmailValid = isEmail(emailOrNumber);
    const isPhoneNumberValid = isMobilePhone(emailOrNumber, 'ko-KR');
    const isPasswordValid = isStrongPassword(password, {
      minLength: 6,
      minUppercase: 1,
      minNumbers: 0,
      minSymbols: 0,
    });

    if (!isPasswordValid) {
      console.log('비밀번호 형식이 올바르지 않습니다.');
      return;
    }

    if (!isEmailValid && !isPhoneNumberValid) {
      console.log('이메일 또는 전화번호 형식이 올바르지 않습니다.');
      return;
    }

    if (isEmailValid) {
      const { error } = await supabaseAuth.signInWithPassword({ email: emailOrNumber, password });
      if (error) {
        setIsSignInFailed(true);
        return;
      }
      route.navigate('/home/home');
      return;
    }

    if (isPhoneNumberValid) {
      const { error } = await supabaseAuth.signInWithPassword({ phone: emailOrNumber, password });
      if (error) {
        setIsSignInFailed(true);
        return;
      }
      route.navigate('/home/home');

      return;
    }
  }, [emailOrNumber, password, route]);

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1 }}>
      <Stack flex={1} width="$fluid" px="$size.x5" py="$size.x10" justify="space-between">
        <Stack items="center" gap="$size.x8">
          <Stack width="$fluid" gap="$size.x2">
            <Text fontSize="$9" fontWeight="800" color="$colors.black">
              돌아오신 것을 환영해요!
            </Text>
            <Text fontSize="$6" fontWeight="700" color="$colors.mediumGray">
              사용자님의 계정으로 로그인해주세요.
            </Text>
          </Stack>
          <Stack width="$fluid" gap="$size.x5">
            <Input
              value={emailOrNumber}
              onChangeText={handleChangeEmailOrNumber}
              w="$fluid"
              placeholder="example@example.com"
              labelContent="이메일 or 전화번호"
              keyboardType="email-address"
              size="$x12"
              px="$size.x3"
              borderColor="$colors.lightGray"
              fontWeight="500"
              focusStyle={{ borderColor: '$colors.darkGreen', borderWidth: 2 }}
            />
            <Input
              value={password}
              onChangeText={handleChangePassword}
              w="$fluid"
              placeholder="password"
              labelContent="비밀번호"
              secureTextEntry
              size="$x12"
              px="$size.x3"
              borderColor="$colors.lightGray"
              fontWeight="500"
              focusStyle={{ borderColor: '$colors.darkGreen', borderWidth: 2 }}
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
