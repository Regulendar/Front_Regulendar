import { Button } from '@/components';
import { getScreenSize } from '@/utils';
import { faClock } from '@fortawesome/free-solid-svg-icons/faClock';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons/faInfoCircle';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { memo } from 'react';
import { ScrollView, Stack, Text } from 'tamagui';

export const OrganizationMainSubScreen = memo(() => {
  const { windowWidth } = getScreenSize();
  return (
    <Stack flex={1} width="$fluid" py="$size.x2">
      <ScrollView width="$fluid" horizontal pagingEnabled showsHorizontalScrollIndicator={false} py="$size.x1_5">
        <Stack width={windowWidth} px="$size.x3">
          <Stack
            width="$fluid"
            justify="space-between"
            py="$size.x3"
            bg="$colors.componentGreen"
            style={{ borderRadius: 12 }}>
            <Stack
              flexDirection="row"
              justify="space-between"
              items="center"
              px="$size.x4"
              pb="$size.x3"
              borderBottomWidth={1}
              borderBottomColor="$colors.backgroundWhite"
              borderStyle="dashed">
              <Stack gap="$size.x1">
                <Text fontSize="$9" fontWeight="900" color="$colors.backgroundWhite">
                  Event name
                </Text>
                <Stack flexDirection="row" gap="$size.x1_5" items="center">
                  <FontAwesomeIcon icon={faClock} color="#f5f5f5" />
                  <Text fontSize="$6" fontWeight="900" color="$colors.backgroundWhite">
                    Event duration
                  </Text>
                </Stack>
              </Stack>
              <Stack
                px="$size.x2"
                py="$size.x1"
                bg="$colors.backgroundWhite"
                justify="center"
                items="center"
                style={{ borderRadius: 8 }}>
                <Text fontSize="$8" fontWeight="900" color="$colors.componentGreen">
                  12
                </Text>
                <Text fontSize="$8" fontWeight="900" color="$colors.componentGreen">
                  Wed
                </Text>
              </Stack>
            </Stack>
            <Stack width="$fluid" px="$size.x4" pt="$size.x3" items="flex-start">
              <Button isFullWidth={false} px="$size.x3" py="$size.x1_5" backgroundColor="$colors.backgroundWhite">
                <FontAwesomeIcon size={20} icon={faInfoCircle} color="#3ABF67" />
                <Text fontSize="$6" fontWeight="700" color="$colors.componentGreen">
                  Details
                </Text>
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </ScrollView>
    </Stack>
  );
});
