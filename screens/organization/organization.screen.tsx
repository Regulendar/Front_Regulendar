import { Navbar } from '@/components';
import { memo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, Text } from 'tamagui';

type IOrganizationScreenProps = {
  organizationId: string;
};

export const OrganizationScreen = memo<IOrganizationScreenProps>(({ organizationId }) => {
  return (
    <Stack flex={1}>
      <SafeAreaView edges={['top']} style={{ flex: 1, borderWidth: 1 }}>
        <Stack flex={1} width="$fluid">
          <Text>{organizationId} Organization Screen</Text>
        </Stack>
      </SafeAreaView>
      <Navbar />
    </Stack>
  );
});
