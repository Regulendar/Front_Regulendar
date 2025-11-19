import { memo, ReactNode } from 'react';
import { OpaqueColorValue } from 'react-native';
import { GetThemeValueForKey, Image, SizeTokens, Card as TamaguiCard } from 'tamagui';

type ICardType = 'custom' | 'square';

type ICardProps = {
  children: ReactNode;
  width: SizeTokens;
  type?: ICardType;
  backgroundImg?: string;
  backgroundColor?: OpaqueColorValue | GetThemeValueForKey<'backgroundColor'>;
  onPressCard?: () => void;
};

export const Card = memo<ICardProps>(
  ({ children, width, type = 'square', backgroundImg, backgroundColor, onPressCard }) => {
    return (
      <TamaguiCard
        width={width}
        {...(type === 'square' && { aspectRatio: 1 })}
        onPress={onPressCard}
        bg={backgroundColor}
        borderRadius="$size.x3"
        overflow="hidden"
        pressStyle={{ opacity: 0.6 }}>
        {children}
        {backgroundImg && (
          <TamaguiCard.Background>
            <Image flex={1} source={{ uri: backgroundImg }} width="$fluid" height="$fluid" objectFit="cover" />
          </TamaguiCard.Background>
        )}
      </TamaguiCard>
    );
  }
);
