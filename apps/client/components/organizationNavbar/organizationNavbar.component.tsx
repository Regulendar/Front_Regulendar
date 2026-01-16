import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useRouter } from 'expo-router';
import { memo, useCallback, useRef } from 'react';
import { Adapt, Popover, Sheet, Stack, Text } from 'tamagui';

export type IOrganizationNavbarItem = {
  value: string;
  icon: IconDefinition;
};

type IOrganizationNavbar = {
  isAdmin: boolean;
  itemValue: string;
  navbarItems: IOrganizationNavbarItem[];
  onChangeItemValue: (value: string) => void;
};

export const OrganizationNavbar = memo<IOrganizationNavbar>(
  ({ isAdmin, itemValue, navbarItems, onChangeItemValue }) => {
    const route = useRouter();
    const popOverRef = useRef<Popover>(null);

    const handlePressItem = useCallback(
      (value: string) => () => {
        return onChangeItemValue(value);
      },
      [onChangeItemValue]
    );

    const handlePressCreateEvent = useCallback(() => {
      popOverRef.current?.close();
      route.navigate('/create/createEvent/createEvent');
    }, [route]);

    return (
      <Stack
        width="$fluid"
        flexDirection="row"
        justify="center"
        items="center"
        px="$size.x4"
        pb="$size.x5"
        pt="$size.x3"
        gap="$size.x2">
        <Stack
          flex={1}
          flexDirection="row"
          justify="space-between"
          items="center"
          bg="$colors.primaryGreen"
          style={{ borderRadius: 48 }}
          p="$size.x2"
          boxShadow="0 0 20px rgba(0, 0, 0, 0.4)">
          {navbarItems.map(({ icon, value }, index) => {
            const isSelected = itemValue === value;
            return (
              <Stack
                key={index}
                width="$fit"
                p="$size.x3"
                bg={isSelected ? '$colors.backgroundWhite' : 'transparent'}
                boxShadow={isSelected ? '0 4px 12px rgba(0,0,0,0.1)' : ''}
                style={{
                  borderRadius: 48,
                }}
                onPress={handlePressItem(value)}>
                <FontAwesomeIcon size={24} icon={icon} color={isSelected ? '#00B906' : '#f5f5f5'} />
              </Stack>
            );
          })}
        </Stack>
        {isAdmin && (
          <Popover placement="top-start" ref={popOverRef}>
            <Popover.Trigger
              width="$fit"
              p="$size.x3"
              bg="$colors.backgroundWhite"
              boxShadow="0 4px 12px rgba(0,0,0,0.4)"
              style={{
                borderRadius: 48,
              }}>
              <FontAwesomeIcon size={32} icon={faPlus} color="#00B906" />
            </Popover.Trigger>

            <Adapt platform="touch">
              <Sheet animation="quick" snapPoints={[24]} modal dismissOnSnapToBottom>
                <Sheet.Frame
                  bg="$colors.backgroundWhite"
                  p="$size.x4"
                  borderTopLeftRadius="$size.x3"
                  borderTopRightRadius="$size.x3">
                  <Adapt.Contents />
                </Sheet.Frame>
                <Sheet.Overlay
                  animation="medium"
                  enterStyle={{ opacity: 1 }}
                  exitStyle={{ opacity: 0 }}
                  bg="rgba(0,0,0,0.4)"
                />
              </Sheet>
            </Adapt>

            <Popover.Content>
              <Stack width="$fluid" height="$fluid" justify="space-between" items="center" gap="$size.x1">
                <Stack
                  width="$fluid"
                  flex={1}
                  justify="center"
                  px="$size.x2"
                  pressStyle={{ opacity: 0.6 }}
                  onPress={handlePressCreateEvent}
                  style={{ borderRadius: 8 }}>
                  <Text fontSize="$6" fontWeight="900" color="$colors.primaryGreen">
                    이벤트 생성하기
                  </Text>
                </Stack>
              </Stack>
            </Popover.Content>
          </Popover>
        )}
      </Stack>
    );
  }
);
