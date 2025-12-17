import { memo, ReactNode } from 'react';
import { FlexAlignType, OpaqueColorValue, StyleProp, ViewStyle } from 'react-native';
import { GetThemeValueForKey, Button as TamaguiButton } from 'tamagui';

type IJustify = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';

type IButton = {
  isFullWidth?: boolean;
  bg?: OpaqueColorValue | GetThemeValueForKey<'backgroundColor'>;
  justify?: IJustify;
  items?: FlexAlignType;
  px?: GetThemeValueForKey<'paddingHorizontal'>;
  py?: GetThemeValueForKey<'paddingVertical'>;
  disableShadow?: boolean;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
  onPressButton?: () => void;
};

export const Button = memo<IButton>(
  ({
    isFullWidth = true,
    bg = '$colors.componentGreen',
    justify = 'center',
    items = 'center',
    px = '$size.x6',
    py = '$size.x3',
    disableShadow = false,
    style,
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
        bg={bg}
        boxShadow={disableShadow ? '' : '0 2px 20px rgba(0, 0, 0, 0.2)'}
        pressStyle={{ opacity: 0.8 }}
        style={style}
        onPress={onPressButton}>
        {children}
      </TamaguiButton>
    );
  }
);
