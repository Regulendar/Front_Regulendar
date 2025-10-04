import { memo, ReactNode, useMemo } from 'react';
import { OpaqueColorValue } from 'react-native';
import { GetThemeValueForKey, Image, SizeTokens, Card as TamaguiCard } from 'tamagui';

type ICardPlacement = 'header' | 'footer';

type ICardProps = {
  children: ReactNode;
  size: SizeTokens;
  cardPlacement?: ICardPlacement;
  backgroundImg?: string;
  backgroundColor?: OpaqueColorValue | GetThemeValueForKey<'backgroundColor'>;
  onPressCard?: () => void;
};

export const Card = memo<ICardProps>(
  ({ children, size, cardPlacement, backgroundImg, backgroundColor, onPressCard }) => {
    const placement = useMemo<ICardPlacement>(() => {
      const hasNotPlacement = !cardPlacement;
      if (hasNotPlacement) {
        return 'footer';
      }
      return cardPlacement;
    }, [cardPlacement]);

    return (
      <TamaguiCard
        width={size}
        aspectRatio={1}
        onPress={onPressCard}
        bg={backgroundColor}
        borderRadius="$size.x3"
        overflow="hidden"
        pressStyle={{ opacity: 0.6 }}>
        {placement === 'header' && (
          <TamaguiCard.Header width="$fluid" flex={1} p={0}>
            {children}
          </TamaguiCard.Header>
        )}
        {placement === 'footer' && (
          <TamaguiCard.Footer width="$fluid" flex={1} p={0}>
            {children}
          </TamaguiCard.Footer>
        )}
        {backgroundImg && (
          <TamaguiCard.Background>
            <Image flex={1} source={{ uri: backgroundImg }} width="fluid" height="fluid" objectFit="cover" />
          </TamaguiCard.Background>
        )}
      </TamaguiCard>
    );
  }
);
