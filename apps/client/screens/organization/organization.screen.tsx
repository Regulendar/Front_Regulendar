import { faCalendar } from '@fortawesome/free-solid-svg-icons/faCalendar';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';
import { faMessage } from '@fortawesome/free-solid-svg-icons/faMessage';
import { memo, useCallback, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDidMount } from 'rooks';
import { Stack, Text } from 'tamagui';
import { Image } from 'expo-image';
import { OrganizationCalendarSubScreen, OrganizationChatSubScreen, OrganizationMainSubScreen } from './subScreens';
import { Alert, Button, IOrganizationNavbarItem, OrganizationNavbar } from '@/components';
import { useUserStore } from '@/stores';
import { OrganizationRole, useCheckIsOrganizationAdminLazyQuery, useGetOrganizationLazyQuery } from '@/libs';
import { useRouter } from 'expo-router';
import { ActivityIndicator } from 'react-native';

type IOrganizationScreen = {
  organizationId: string;
};

type IOrganization = {
  organizationId: string;
  organizationName: string;
};

enum EOrganizationScreenItem {
  Main = 'Main',
  Calendar = 'Calendar',
  Chat = 'Chat',
}

export const OrganizationScreen = memo<IOrganizationScreen>(({ organizationId }) => {
  const route = useRouter();
  const { userId } = useUserStore();
  const [organization, setOrganization] = useState<IOrganization>();
  const [selectedItem, setSelectedItem] = useState<string>(EOrganizationScreenItem.Main);
  const [isFetchingOrganizationFailed, setIsFetchingOrganizationFailed] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [getOrganizationQuery, { loading, refetch }] = useGetOrganizationLazyQuery();
  const [checkIsOrganizationAdminQuery] = useCheckIsOrganizationAdminLazyQuery();

  const navbarItems: IOrganizationNavbarItem[] = [
    { value: EOrganizationScreenItem.Main, icon: faHome },
    { value: EOrganizationScreenItem.Calendar, icon: faCalendar },
    { value: EOrganizationScreenItem.Chat, icon: faMessage },
  ];

  const renderSubScreen = useMemo(() => {
    switch (selectedItem) {
      case EOrganizationScreenItem.Calendar:
        return <OrganizationCalendarSubScreen userId={userId} />;
      case EOrganizationScreenItem.Main:
        return <OrganizationMainSubScreen organizationId={organizationId} />;
      case EOrganizationScreenItem.Chat:
        return <OrganizationChatSubScreen />;
    }
  }, [selectedItem, userId, organizationId]);

  const checkIsAdmin = useCallback(async () => {
    try {
      const { data } = await checkIsOrganizationAdminQuery({
        variables: {
          input: {
            id: userId,
          },
        },
      });
      if (!data) {
        setIsAdmin(false);
        return;
      }
      const organizationMemberData = data.getUser.user.organizationMembers.find(
        ({ organizationId: memberId }) => memberId === organizationId
      );
      if (!organizationMemberData) {
        setIsAdmin(false);
        return;
      }
      const isUserAdmin =
        organizationMemberData.role === OrganizationRole.Admin ||
        organizationMemberData.role === OrganizationRole.Owner;
      setIsAdmin(isUserAdmin);
    } catch (error) {
      // TODO(@Milgam06): Error handling
      setIsAdmin(false);
    }
  }, [checkIsOrganizationAdminQuery, userId, organizationId]);

  const fetchData = useCallback(async () => {
    const { data: organizationData, error } = await getOrganizationQuery({
      variables: {
        input: {
          organizationId,
        },
      },
    });
    const hasOrganizationData = organizationData && !error;
    if (!hasOrganizationData) {
      setIsFetchingOrganizationFailed(true);
      console.error('Failed to fetch organization data:', error);
      return;
    }
    setOrganization(organizationData.getOrganization.organization);
  }, [getOrganizationQuery, organizationId]);

  const handleChangeNavbarItem = useCallback((value: string) => {
    setSelectedItem(value);
  }, []);

  const handlePressCloseAlert = useCallback(() => {
    setIsFetchingOrganizationFailed(false);
    route.replace('/participation/participation');
  }, [route]);

  const handlePressRefetchOrganization = useCallback(async () => {
    setIsFetchingOrganizationFailed(false);
    await refetch();
  }, [refetch]);

  useDidMount(async () => {
    await checkIsAdmin();
    await fetchData();
  });

  return (
    <Stack flex={1}>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        {isFetchingOrganizationFailed && (
          <Alert isOpen={isFetchingOrganizationFailed} onClose={handlePressCloseAlert} alertPadding="$size.x5">
            <Stack justify="center" items="center" gap="$size.x6" pt="$size.x3">
              <Stack justify="center" items="center" gap="$size.x2">
                <Image
                  source="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Crying%20Face.png"
                  alt="Crying Face"
                  style={{ width: 140, aspectRatio: 1 }}
                />
                <Text fontSize="$5" fontWeight="$900">
                  조직 정보를 불러오는데 실패했습니다.
                </Text>
              </Stack>
              <Stack width="$fluid" gap="$size.x1_5">
                <Button
                  px={0}
                  py="$size.x2"
                  bg="$colors.primaryGreen"
                  fontSize="$7"
                  fontWeight="$600"
                  color="$colors.backgroundWhite"
                  pressStyle={{ bg: '$colors.primaryGreen', opacity: 0.8 }}
                  onPress={handlePressRefetchOrganization}>
                  다시 시도하기
                </Button>
              </Stack>
            </Stack>
          </Alert>
        )}
        {loading && (
          <Stack flex={1} justify="center" items="center" gap="$size.x3">
            <ActivityIndicator size="large" color="#3ABF67" />
            <Text fontSize="$6" fontWeight="$800">
              로딩 중...
            </Text>
          </Stack>
        )}
        {organization && (
          <>
            <Stack justify="center" px="$size.x5">
              <Text fontSize="$9" fontWeight="800">
                {organization.organizationName}
              </Text>
            </Stack>
            {renderSubScreen}
          </>
        )}
      </SafeAreaView>
      <OrganizationNavbar
        isAdmin={isAdmin}
        itemValue={selectedItem}
        navbarItems={navbarItems}
        onChangeItemValue={handleChangeNavbarItem}
      />
    </Stack>
  );
});
