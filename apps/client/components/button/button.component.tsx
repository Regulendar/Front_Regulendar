import { memo, ReactNode } from 'react';
import { FlexAlignType, OpaqueColorValue } from 'react-native';
import { GetThemeValueForKey, Button as TamaguiButton } from 'tamagui';

type IJustify = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';

type IButton = {
  isFullWidth?: boolean;
  backgroundColor?: OpaqueColorValue | GetThemeValueForKey<'backgroundColor'>;
  justify?: IJustify;
  items?: FlexAlignType;
  px?: GetThemeValueForKey<'paddingHorizontal'>;
  py?: GetThemeValueForKey<'paddingVertical'>;
  disableShadow?: boolean;
  children: ReactNode;
  onPressButton?: () => void;
};

export const Button = memo<IButton>(
  ({
    isFullWidth = true,
    backgroundColor = '$colors.componentGreen',
    justify = 'center',
    items = 'center',
    px = '$size.x6',
    py = '$size.x3',
    disableShadow = false,
    children,
    onPressButton,
  }) => {
    return (
      <TamaguiButton
        width={isFullWidth ? '$fluid' : '$fit'}
        height="auto"
        justify={justify}
        items={items}
        px={px}
        py={py}
        bg={backgroundColor}
        boxShadow={disableShadow ? '' : '0 2px 20px rgba(0, 0, 0, 0.2)'}
        pressStyle={{ opacity: 0.8 }}
        onPress={onPressButton}>
        {children}
      </TamaguiButton>
    );
  }
);
