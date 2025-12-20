import { ComponentProps, memo, ReactNode } from 'react';
import { Button as TamaguiButton } from 'tamagui';

type IButton = {
  isFullWidth?: boolean;
  disableShadow?: boolean;
  children: ReactNode;
} & ComponentProps<typeof TamaguiButton>;
export const Button = memo<IButton>(
  ({
    isFullWidth = true,
    bg = '$colors.componentGreen',
    justify = 'center',
    items = 'center',
    px = '$size.x6',
    py = '$size.x3',
    disableShadow = false,
    children,
    ...rest
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
        {...rest}>
        {children}
      </TamaguiButton>
    );
  }
);
