import { INavbarItem, Navbar } from '@/components';
import { faBell } from '@fortawesome/free-solid-svg-icons/faBell';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';
import { faMessage } from '@fortawesome/free-solid-svg-icons/faMessage';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { memo, useCallback, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'tamagui';
import { OrganizationHomeSubScreen } from './subScreens';

type IOrganizationScreenProps = {
  organizationId: string;
};

export const OrganizationScreen = memo<IOrganizationScreenProps>(({ organizationId }) => {
  const [selectedItem, setSelectedItem] = useState<string>('Home');
  const navbarItems: INavbarItem[] = [
    { value: 'Home', icon: faHome },
    { value: 'Search', icon: faSearch },
    { value: 'Notifications', icon: faBell },
    { value: 'Messages', icon: faMessage },
  ];

  const renderSubScreen = useMemo(() => {
    switch (selectedItem) {
      case 'Home':
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
