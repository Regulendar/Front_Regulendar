import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
import { faPhone } from '@fortawesome/free-solid-svg-icons/faPhone';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { memo, useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Stack, Text } from 'tamagui';

import { supabaseAuth } from '@/libs';
import { SignInWithPasswordCredentials, SignUpWithPasswordCredentials } from '@supabase/supabase-js';
import { useRouter } from 'expo-router';
import { useDidUpdate } from 'rooks';
import { isEmail, isMobilePhone, isStrongPassword } from 'validator';
import { Input } from '@/components';

type ILoginType = 'EMAIL' | 'PHONE';

export const SignUpScreen = memo(() => {
  const route = useRouter();

  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isSignUpFailed, setIsSignUpFailed] = useState<boolean>(false); // TODO(@Milgam06): 추후에 실패했을 때 UI 변경 필요
  const [loginType, setLoginType] = useState<ILoginType>('EMAIL');

  const handlePressEmailLoginType = useCallback(() => {
    setLoginType('EMAIL');
  }, []);

  const handlePressPhoneLoginType = useCallback(() => {
    setLoginType('PHONE');
  }, []);

  const handleChangeEmail = useCallback((text: string) => {
    setEmail(text);
  }, []);

  const handleChangePhone = useCallback((text: string) => {
    setPhone(text);
  }, []);

  const handleChangePassword = useCallback((text: string) => {
    setPassword(text);
  }, []);

  const handleChangeConfirmPassword = useCallback((text: string) => {
    setConfirmPassword(text);
  }, []);

  const handlePressSignUp = useCallback(async () => {
    const isInputValid = loginType === 'EMAIL' ? isEmail(email) : isMobilePhone(phone, 'ko-KR');
    const isPasswordValid = isStrongPassword(password, { minLength: 6, minUppercase: 1, minNumbers: 0, minSymbols: 0 });

    if (!isPasswordValid) {
      console.log('비밀번호는 최소 6자 이상, 대문자 1자 이상 포함해야 합니다.');
      return;
    }
    if (!isInputValid) {
      console.log('이메일 또는 전화번호 형식이 올바르지 않습니다.');
      return;
    }
    const isSamePassword = password === confirmPassword;
    if (!isSamePassword) {
      console.log('비밀번호가 일치하지 않습니다.');
      return;
    }
    const signUpPayload: SignUpWithPasswordCredentials = {
      ...(loginType === 'EMAIL' ? { email } : { phone }),
      password,
    };

    const { error: SignUpError } = await supabaseAuth.signUp(signUpPayload);
    if (SignUpError) {
      setIsSignUpFailed(true);
      return;
    }

    const emailSignInPayload: SignInWithPasswordCredentials = {
      email,
      password,
    };
    const phoneSignInPayload: SignInWithPasswordCredentials = {
      phone,
      password,
    };
    const signInPayload = loginType === 'EMAIL' ? emailSignInPayload : phoneSignInPayload;
    const { error: SignInError } = await supabaseAuth.signInWithPassword(signInPayload);
    if (SignInError) {
      setIsSignUpFailed(true);
      return;
    }
    route.replace('/participation/participation');
  }, [confirmPassword, email, loginType, password, phone, route]);

  useDidUpdate(() => {
    const isLoginTypeEmail = loginType === 'EMAIL';
    if (isLoginTypeEmail) {
      setPhone('');
    } else {
      setEmail('');
    }
  }, [loginType]);

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1 }}>
      <Stack flex={1} width="$fluid" px="$size.x5" py="$size.x10" justify="space-between">
        <Stack items="center" gap="$size.x7">
          <Stack width="$fluid" gap="$size.x1">
            <Text fontSize="$9" fontWeight="800" color="$colors.darkGreen">
              똑똑한 일정 관리
            </Text>
            <Text fontSize="$9" fontWeight="800" color="$colors.black">
              시작해볼까요?
            </Text>

            <Text fontSize="$6" fontWeight="700" color="$colors.mediumGray">
              양식을 작성하여 회원가입을 완료해주세요.
            </Text>
          </Stack>
          <Stack width="$fluid" gap="$size.x5">
            <Stack gap="$size.x2">
              {loginType === 'EMAIL' ? (
                <Input
                  value={email}
                  onChangeText={handleChangeEmail}
                  w="$fluid"
                  placeholder="example@example.com"
                  labelContent="이메일"
                  keyboardType="email-address"
                  size="$x12"
                  px="$size.x3"
                  borderColor="$colors.lightGray"
                  fontWeight="500"
                  focusStyle={{ borderColor: '$colors.darkGreen', borderWidth: '$size.x0_5' }}
                />
              ) : (
                <Input
                  value={phone}
                  onChangeText={handleChangePhone}
                  w="$fluid"
                  placeholder="01012341234"
                  labelContent="전화번호"
                  keyboardType="phone-pad"
                  size="$x12"
                  px="$size.x3"
                  borderColor="$colors.lightGray"
                  fontWeight="500"
                  focusStyle={{ borderColor: '$colors.darkGreen', borderWidth: '$size.x0_5' }}
                />
              )}
              <Stack width="$fluid" flexDirection="row" justify="space-between" items="center" gap="$size.x2">
                <Button
                  flex={1}
                  height="$fit"
                  px="$size.x6"
                  py="$size.x3"
                  bg={loginType === 'EMAIL' ? '$colors.componentGreen' : '$colors.lightGray'}
                  onPress={handlePressEmailLoginType}>
                  <Stack width="$fluid" flexDirection="row" justify="center" items="center" gap="$size.x2">
                    <FontAwesomeIcon color={loginType === 'EMAIL' ? '#fff' : '#424242'} icon={faEnvelope} />
                    <Text
                      fontSize="$5"
                      fontWeight="900"
                      color={loginType === 'EMAIL' ? '$colors.white' : '$colors.darkGray'}>
                      이메일로 가입
                    </Text>
                  </Stack>
                </Button>
                <Button
                  flex={1}
                  height="$fit"
                  px="$size.x6"
                  py="$size.x3"
                  bg={loginType === 'PHONE' ? '$colors.componentGreen' : '$colors.lightGray'}
                  onPress={handlePressPhoneLoginType}>
                  <Stack width="$fluid" flexDirection="row" justify="center" items="center" gap="$size.x2">
                    <FontAwesomeIcon color={loginType === 'PHONE' ? '#fff' : '#424242'} icon={faPhone} />
                    <Text
                      fontSize="$5"
                      fontWeight="900"
                      color={loginType === 'PHONE' ? '$colors.white' : '$colors.darkGray'}>
                      전화번호로 가입
                    </Text>
                  </Stack>
                </Button>
              </Stack>
            </Stack>
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
              focusStyle={{ borderColor: '$colors.darkGreen', borderWidth: '$size.x0_5' }}
            />
            <Input
              value={confirmPassword}
              onChangeText={handleChangeConfirmPassword}
              w="$fluid"
              placeholder="confirm password"
              labelContent="비밀번호 확인"
              secureTextEntry
              size="$x12"
              px="$size.x3"
              borderColor="$colors.lightGray"
              fontWeight="500"
              focusStyle={{ borderColor: '$colors.darkGreen', borderWidth: '$size.x0_5' }}
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
          onPress={handlePressSignUp}>
          <Text fontSize="$8" fontWeight="700" color="$colors.white">
            회원가입
          </Text>
        </Button>
      </Stack>
    </SafeAreaView>
  );
});
