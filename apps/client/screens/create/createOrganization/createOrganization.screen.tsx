import { Button, Input } from '@/components';
import { supabaseAuth } from '@/libs';
import { useCreateOrganizationMutation } from '@/libs/graphql';
import { useRouter } from 'expo-router';
import { memo, useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, Text } from 'tamagui';

export const CreateOrganizationScreen = memo(() => {
  const route = useRouter();
  const [organizationName, setOrganizationName] = useState<string>('');
  const [organizationDescription, setOrganizationDescription] = useState<string>();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isCreateOrganizationFailed, setIsCreateOrganizationFailed] = useState<boolean>(false); // TODO(@Milgam06): 추후에 실패했을 때 UI 변경 필요
  const [createOrganizationMutation] = useCreateOrganizationMutation();

  const handleChangeOrganizationName = useCallback((text: string) => {
    setOrganizationName(text);
  }, []);
  const handleChangeOrganizationDescription = useCallback((text: string) => {
    setOrganizationDescription(text);
  }, []);

  const handlePressCreateOrganization = useCallback(async () => {
    setIsDisabled(true);
    if (!organizationName) {
      setIsCreateOrganizationFailed(true); // TODO(@Milgam06): 추후에 실패했을 때 UI 변경 필요
      setIsDisabled(false);
      return;
    }
    const {
      data: { user },
    } = await supabaseAuth.getUser();
    if (!user) {
      setIsCreateOrganizationFailed(true);
      setIsDisabled(false);
      return;
    }
    const { errors } = await createOrganizationMutation({
      variables: {
        input: {
          ownerUserId: user.id,
          organizationName,
          organizationDescription,
        },
      },
    });
    if (errors) {
      setIsCreateOrganizationFailed(true);
      setIsDisabled(false);
      return;
    }
    route.push('/participation/participation');
  }, [createOrganizationMutation, organizationDescription, organizationName, route]);

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1 }}>
      <Stack flex={1} width="$fluid" justify="space-between" px="$size.x5" py="$size.x10" gap="$size.x8">
        <Stack gap="$size.x3">
          <Stack gap="$size.x0_25">
            <Text fontSize="$9" fontWeight="800" color="$colors.black">
              새로{' '}
              <Text fontSize="$9" fontWeight="800" color="$colors.darkGreen">
                생성할{' '}
              </Text>
              조직의
            </Text>
            <Text fontSize="$9" fontWeight="800" color="$colors.black">
              정보를 입력해주세요.
            </Text>
          </Stack>
          <Text fontSize="$5" fontWeight="$900" color="$colors.mediumGray">
            *는 필수 입력 항목입니다.
          </Text>
        </Stack>
        <Stack flex={1} justify="space-between">
          <Stack width="$fluid" gap="$size.x5">
            <Input
              value={organizationName}
              onChangeText={handleChangeOrganizationName}
              w="$fluid"
              placeholder="조직 이름을 입력하세요"
              labelContent="조직 이름 *"
              size="$x12"
              px="$size.x3"
              borderColor="$colors.lightGray"
              fontWeight="500"
              focusStyle={{ borderColor: '$colors.darkGreen', borderWidth: '$size.x0_5' }}
            />
            <Input
              value={organizationDescription}
              onChangeText={handleChangeOrganizationDescription}
              w="$fluid"
              placeholder="조직에 대한 설명을 입력하세요"
              labelContent="조직 설명"
              size="$x12"
              px="$size.x3"
              borderColor="$colors.lightGray"
              fontWeight="500"
              focusStyle={{ borderColor: '$colors.darkGreen', borderWidth: '$size.x0_5' }}
            />
          </Stack>
          <Button
            px="$size.x6"
            py="$size.x3"
            bg="$colors.componentGreen"
            pressStyle={{ bg: '$colors.componentGreen', scale: 0.99, opacity: 0.8 }}
            disabled={isDisabled}
            onPress={handlePressCreateOrganization}>
            <Text fontSize="$8" fontWeight="700" color="$colors.white">
              다음으로
            </Text>
          </Button>
        </Stack>
      </Stack>
    </SafeAreaView>
  );
});
