import { config } from '@/tamagui.config';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TamaguiProvider } from 'tamagui';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <TamaguiProvider config={config}>
        <Stack screenOptions={{ headerShown: false }} />
      </TamaguiProvider>
    </SafeAreaProvider>
  );
}
