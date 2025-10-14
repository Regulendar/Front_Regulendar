import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { memo, useCallback, useState } from 'react';
import { useDidMount } from 'rooks';
import { Adapt, Popover, Sheet, Stack, Text } from 'tamagui';

export type INavbarItem = {
  value: string;
  icon: IconDefinition;
};

type INavbarProps = {
  itemValue: string;
  navbarItems: INavbarItem[];
  onChangeItemValue: (value: string) => void;
};

export const Navbar = memo<INavbarProps>(({ itemValue, navbarItems, onChangeItemValue }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  useDidMount(() => {
    // TODO(@Milgam06): get isAdmin from user role
    setIsAdmin(true);
  });
  const handlePressItem = useCallback(
    (value: string) => () => {
      return onChangeItemValue(value);
    },
    [onChangeItemValue]
  );
  return (
    <Stack
      width="$fluid"
      flexDirection="row"
      justify="center"
      items="center"
      px="$size.x4"
      py="$size.x5"
      gap="$size.x2">
      <Stack
        flex={1}
        flexDirection="row"
        justify="space-between"
        items="center"
        bg="$colors.darkGreen"
        style={{ borderRadius: 48 }}
        px="$size.x3"
        py="$size.x2"
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
              <FontAwesomeIcon size={28} icon={icon} color={isSelected ? '#00B906' : '#f5f5f5'} />
            </Stack>
          );
        })}
      </Stack>
      {isAdmin && (
        <Popover placement="top-start">
          <Popover.Trigger
            width="$fit"
            p="$size.x3"
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
                style={{ borderRadius: 8 }}>
                <Text fontSize="$6" fontWeight="900" color="$colors.componentGreen">
                  이벤트 생성하기
                </Text>
              </Stack>
            </Stack>
          </Popover.Content>
        </Popover>
      )}
    </Stack>
  );
});
