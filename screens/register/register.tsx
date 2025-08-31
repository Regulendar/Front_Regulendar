import { LinearGradient } from 'expo-linear-gradient';
import { memo, useMemo } from 'react';
import { ColorValue } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, getTokenValue, Stack, Text } from 'tamagui';

export const RegisterScreen = memo(() => {
  const gradientColors = useMemo<[ColorValue, ColorValue]>(() => {
    const color1: ColorValue = getTokenValue('$colors.darkGreen');
    const color2: ColorValue = getTokenValue('$colors.lightGreen');
    return [color1, color2];
  }, []);
  return (
    <LinearGradient colors={gradientColors} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack flex={1} justify="space-between" items="center">
          <Stack flex={1} width="100%" borderWidth={1}>
            <Text>asdf</Text>
          </Stack>
          <Stack width="100%" borderWidth={1} justify="space-around" px="$size.x4" mb="$size.x10" gap="$size.x2">
            <Button height="auto" px="$size.x6" py="$size.x3" bg="$colors.backgroundWhite">
              <Text fontSize="$9">Register</Text>
            </Button>
            <Button height="auto" px="$size.x6" py="$size.x3" bg="$colors.backgroundWhite">
              <Text fontSize="$9">Register</Text>
            </Button>
          </Stack>
        </Stack>
      </SafeAreaView>
    </LinearGradient>
  );
});
