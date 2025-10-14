import { INavbarItem, Navbar } from '@/components';
import { faCalendar } from '@fortawesome/free-solid-svg-icons/faCalendar';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { memo, useCallback, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'tamagui';
import { OrganizationHomeSubScreen } from './subScreens';

type IOrganizationScreenProps = {
  organizationId: string;
};

enum EOrganizationScreenItem {
  Home = 'Home',
  Calendar = 'Calendar',
  Profile = 'Profile',
}

export const OrganizationScreen = memo<IOrganizationScreenProps>(({ organizationId }) => {
  const [selectedItem, setSelectedItem] = useState<string>(EOrganizationScreenItem.Home);
  const navbarItems: INavbarItem[] = [
    { value: EOrganizationScreenItem.Home, icon: faHome },
    { value: EOrganizationScreenItem.Calendar, icon: faCalendar },
    { value: EOrganizationScreenItem.Profile, icon: faUser },
  ];

  const renderSubScreen = useMemo(() => {
    switch (selectedItem) {
      case EOrganizationScreenItem.Home:
        return <OrganizationHomeSubScreen />;
    }
  }, [selectedItem]);

  const handleChangeNavbarItem = useCallback((value: string) => {
    setSelectedItem(value);
  }, []);

  return (
    <Stack flex={1}>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        {renderSubScreen}
      </SafeAreaView>
      <Navbar itemValue={selectedItem} navbarItems={navbarItems} onChangeItemValue={handleChangeNavbarItem} />
    </Stack>
  );
});
