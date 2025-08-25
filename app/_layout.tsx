import { config } from '@/tamagui.config';
import { Stack } from 'expo-router';
import { TamaguiProvider } from 'tamagui';

export default function RootLayout() {
  return (
    <TamaguiProvider config={config}>
      <Stack screenOptions={{ headerShown: false }} />
    </TamaguiProvider>
  );
}
