import { INavbarItem, Navbar } from '@/components';
import { faBell } from '@fortawesome/free-solid-svg-icons/faBell';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';
import { faMessage } from '@fortawesome/free-solid-svg-icons/faMessage';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { memo, useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, Text } from 'tamagui';

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

  const handleChangeNavbarItem = useCallback((value: string) => {
    setSelectedItem(value);
  }, []);

  return (
    <Stack flex={1}>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <Stack flex={1} width="$fluid">
          <Text>{organizationId} Organization Screen</Text>
        </Stack>
      </SafeAreaView>
      <Navbar itemValue={selectedItem} navbarItems={navbarItems} onChangeItemValue={handleChangeNavbarItem} />
    </Stack>
  );
});
