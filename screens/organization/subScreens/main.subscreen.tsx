import { Card } from '@/components';
import { getScreenSize } from '@/utils';
import { memo } from 'react';
import { ScrollView, Stack, Text } from 'tamagui';

export const OrganizationMainSubScreen = memo(() => {
  const { windowWidth } = getScreenSize();
  return (
    <Stack flex={1} width="$fluid" py="$size.x2">
      <ScrollView width="$fluid" horizontal pagingEnabled showsHorizontalScrollIndicator={false} py="$size.x1_5">
        <Stack width={windowWidth} px="$size.x5">
          <Card width="$fluid" type="creditCard" backgroundColor="$colors.componentGreen">
            <Stack width="$fluid">
              <Text>
                This is the main sub-screen for the organization section. Here you can find various details and
              </Text>
            </Stack>
          </Card>
        </Stack>
      </ScrollView>
    </Stack>
  );
});
