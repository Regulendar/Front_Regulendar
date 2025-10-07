import { ComponentProps, memo, useMemo } from 'react';
import { FlexAlignType, OpaqueColorValue } from 'react-native';
import {
  ColorTokens,
  FontSizeTokens,
  FontWeightTokens,
  Label,
  SizeTokens,
  Stack,
  Input as TamaguiInput,
} from 'tamagui';

type IInputProps = {
  w?: SizeTokens;
  labelContent?: string;
  labelFontSize?: FontSizeTokens;
  labelFontWeight?: FontWeightTokens;
  labelPosition?: 'flex-start' | 'center' | 'flex-end';
  labelFontColor?: ColorTokens | OpaqueColorValue;
} & ComponentProps<typeof TamaguiInput>;

export const Input = memo<IInputProps>(
  ({ w, labelContent, labelFontSize, labelFontWeight, labelPosition, labelFontColor, ...rest }) => {
    const width = useMemo<SizeTokens>(() => {
      if (!w) {
        return '$fluid';
      }
      return w;
    }, [w]);

    const labelAlignItems = useMemo<FlexAlignType>(() => {
      if (!labelPosition) {
        return 'flex-start';
      }
      return labelPosition;
    }, [labelPosition]);

    const labelWeight = useMemo<FontWeightTokens>(() => {
      if (!labelFontWeight) {
        return '500';
      }
      return labelFontWeight;
    }, [labelFontWeight]);

    const labelColor = useMemo<ColorTokens | OpaqueColorValue>(() => {
      if (!labelFontColor) {
        return '$colors.black';
      }
      return labelFontColor;
    }, [labelFontColor]);

    return (
      <Stack width={width} justify="center" items={labelAlignItems} gap="$size.x1">
        {labelContent && (
          <Label
            width="$fit"
            px="$size.x2"
            fontSize={labelFontSize}
            fontWeight={labelWeight}
            color={labelColor}
            lineHeight="$1"
            htmlFor={labelContent}>
            {labelContent}
          </Label>
        )}
        <TamaguiInput width={width} {...rest} />
      </Stack>
    );
  }
);
