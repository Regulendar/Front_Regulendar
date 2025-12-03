import { Image } from 'expo-image';
import { memo } from 'react';
import { Stack, Text } from 'tamagui';

export const OrganizationChatSubScreen = memo(() => {
  return (
    <Stack flex={1} width="$fluid" justify="center" items="center" gap="$size.x5">
      <Image
        source="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Crying%20Face.png"
        alt="Thinking Face"
        contentFit="contain"
        style={{ width: 120, aspectRatio: 1 }}
      />

      <Text fontSize="$8" fontWeight="$600">
        아직 준비되지 않은 기능이에요
      </Text>
    </Stack>
  );
});
