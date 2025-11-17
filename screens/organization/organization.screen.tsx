import { INavbarItem, Navbar } from '@/components';
import { supabaseAuth } from '@/libs';
import { faCalendar } from '@fortawesome/free-solid-svg-icons/faCalendar';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { memo, useCallback, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDidMount } from 'rooks';
import { Stack } from 'tamagui';
import { OrganizationCalendarSubScreen, OrganizationMainSubScreen } from './subScreens';

type IOrganizationScreenProps = {
  organizationId: string;
};

enum EOrganizationScreenItem {
  Main = 'Main',
  Calendar = 'Calendar',
  Profile = 'Profile',
}

export const OrganizationScreen = memo<IOrganizationScreenProps>(({ organizationId }) => {
  const [userId, setUserId] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<string>(EOrganizationScreenItem.Main);
  const navbarItems: INavbarItem[] = [
    { value: EOrganizationScreenItem.Calendar, icon: faCalendar },
    { value: EOrganizationScreenItem.Main, icon: faHome },
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

  const fetchUserId = useCallback(async () => {
    const { data } = await supabaseAuth.getUser();
    const hasUserData = !!data?.user;
    if (!hasUserData) {
      return;
    }
    setUserId(data.user.id);
  }, []);

  const handleChangeNavbarItem = useCallback((value: string) => {
    setSelectedItem(value);
  }, []);

  useDidMount(async () => {
    await fetchUserId();
  });

  return (
    <Stack flex={1}>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        {renderSubScreen}
      </SafeAreaView>
      <Navbar itemValue={selectedItem} navbarItems={navbarItems} onChangeItemValue={handleChangeNavbarItem} />
    </Stack>
  );
});
