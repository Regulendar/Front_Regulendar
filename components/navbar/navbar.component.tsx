import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { memo, useCallback } from 'react';
import { Stack } from 'tamagui';

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
  const handlePressItem = useCallback(
    (value: string) => () => {
      return onChangeItemValue(value);
    },
    [onChangeItemValue]
  );
  return (
    <Stack width="$fluid" borderWidth={1} justify="center" items="center" px="$size.x2" py="$size.x10">
      <Stack
        width="$fluid"
        flexDirection="row"
        justify="space-between"
        items="center"
        borderWidth={1}
        style={{ borderRadius: 12 }}>
        {navbarItems.map(({ icon, value }, index) => {
          const isSelected = itemValue === value;

          return (
            <Stack
              key={index}
              width="$fit"
              borderWidth={1}
              p="$size.x2"
              bg={isSelected ? '$colors.componentGreen' : 'transparent'}
              style={{
                borderRadius: 48,
              }}
              onPress={handlePressItem(value)}>
              <FontAwesomeIcon size={28} icon={icon} color={isSelected ? '#FFF' : '#000000'} />
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
});
