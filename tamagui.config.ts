import { defaultConfig } from '@tamagui/config/v4';
import { createTamagui, createTokens } from 'tamagui';

const tokens = createTokens({
  size: {
    true: 4,
    x1: 4,
    x2: 8,
    x3: 12,
    x4: 16,
    x5: 20,
    x6: 24,
    x7: 28,
    x8: 32,
    x9: 36,
    x10: 40,
  },
});

export const tamaguiConfig = createTamagui({
  ...defaultConfig,

  tokens: { ...defaultConfig.tokens, ...tokens },
  media: {
    ...defaultConfig.media,
    xs: { maxWidth: 660 },
    gtXs: { minWidth: 660 + 1 },
    sm: { maxWidth: 860 },
    gtSm: { minWidth: 860 + 1 },
    md: { maxWidth: 980 },
    gtMd: { minWidth: 980 + 1 },
    lg: { maxWidth: 1120 },
    gtLg: { minWidth: 1120 + 1 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' },
  },
  settings: { ...defaultConfig.settings, styleCompat: 'react-native' },
});

export type AppConfig = typeof tamaguiConfig;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}
