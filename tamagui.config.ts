import { defaultConfig } from '@tamagui/config/v4';
import { createTamagui, createTokens } from 'tamagui';

const tokens = createTokens({
  colors: {
    darkGreen: '#00B906',
    lightGreen: '#B9E937',
    componentGreen: '#3ABF67',

    darkGray: '#424242',
    backgroundWhite: '#FEFEFE',
    backgroundBlack: '#1C1C1C',
    white: '#FFFFFF',
    black: '#000000',
  },
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
    x11: 44,
    x12: 48,
    x13: 52,
    x14: 56,
    x15: 60,
    x16: 64,
    x17: 68,
    x18: 72,
    x19: 76,
    x20: 80,
    x21: 84,
    x22: 88,
    x23: 92,
    x24: 96,
    x25: 100,
    x37_5: 150,
    x50: 200,
  },
  zIndex: {
    true: 0,
    x1: 0,
    x2: 1,
    x3: 2,
    x4: 3,
    x5: 4,
    x6: 5,
    x7: 10,
    x8: 50,
    x9: 100,
    x10: 1000,
  },
});

export const config = createTamagui({
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

export type AppConfig = typeof config;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}
