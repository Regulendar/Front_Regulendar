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
    <Stack width="$fluid" justify="center" items="center" px="$size.x4" py="$size.x5">
      <Stack
        width="$fluid"
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
              boxShadow={isSelected ? '0 4px 10px rgba(0,0,0,0.1)' : ''}
              style={{
                borderRadius: 48,
              }}
              onPress={handlePressItem(value)}>
              <FontAwesomeIcon size={28} icon={icon} color={isSelected ? '#00B906' : '#f5f5f5'} />
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
});
