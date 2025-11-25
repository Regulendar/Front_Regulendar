import { INavbarItem, Navbar } from '@/components';
import { DUMMY_ORGANIZATIONS } from '@/dummy';
import { supabaseAuth } from '@/libs';
import { IOrganizationType } from '@/types';
import { faCalendar } from '@fortawesome/free-solid-svg-icons/faCalendar';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { memo, useCallback, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDidMount } from 'rooks';
import { Stack, Text } from 'tamagui';
import { OrganizationCalendarSubScreen, OrganizationMainSubScreen } from './subScreens';

type IOrganizationScreen = {
  organizationId: string;
};

enum EOrganizationScreenItem {
  Main = 'Main',
  Calendar = 'Calendar',
  Profile = 'Profile',
}

export const OrganizationScreen = memo<IOrganizationScreen>(({ organizationId }) => {
  const [userId, setUserId] = useState<string>('');
  const [organization, setOrganization] = useState<IOrganizationType>();
  const [selectedItem, setSelectedItem] = useState<string>(EOrganizationScreenItem.Main);
  const navbarItems: INavbarItem[] = [
    { value: EOrganizationScreenItem.Main, icon: faHome },
    { value: EOrganizationScreenItem.Calendar, icon: faCalendar },
    { value: EOrganizationScreenItem.Profile, icon: faUser },
  ];

  const renderSubScreen = useMemo(() => {
    switch (selectedItem) {
      case EOrganizationScreenItem.Calendar:
        return <OrganizationCalendarSubScreen userId={userId} />;
      case EOrganizationScreenItem.Main:
        return <OrganizationMainSubScreen />;
    }
  }, [selectedItem, userId]);

  const fetchData = useCallback(async () => {
    const { data } = await supabaseAuth.getUser();
    const hasUserData = !!data?.user;
    if (!hasUserData) {
      return;
    }
    setUserId(data.user.id);

    // TODO(@Milgam06): Fetch organization data
    const organizationData = DUMMY_ORGANIZATIONS.find(({ id }) => {
      const hasOrganization = id === organizationId;
      return hasOrganization;
    });
    if (!organizationData) {
      return;
    }
    setOrganization(organizationData);
  }, [organizationId]);

  const handleChangeNavbarItem = useCallback((value: string) => {
    setSelectedItem(value);
  }, []);

  useDidMount(async () => {
    await fetchData();
  });

  return (
    <Stack flex={1}>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <Stack justify="center" px="$size.x5">
          <Text fontSize="$9" fontWeight="800">
            {organization?.organizationName}
          </Text>
        </Stack>
        {renderSubScreen}
      </SafeAreaView>
      <Navbar itemValue={selectedItem} navbarItems={navbarItems} onChangeItemValue={handleChangeNavbarItem} />
    </Stack>
  );
});
