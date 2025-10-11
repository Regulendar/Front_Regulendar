import { memo } from 'react';
import { Stack, Text } from 'tamagui';

export const Navbar = memo(() => {
  return (
    <Stack width="$fluid" borderWidth={1} justify="center" items="center" py="$size.x8">
      <Stack width="$fluid" flexDirection="row" justify="space-between" items="center" borderWidth={1}>
        <Text>Navbar</Text>
      </Stack>
    </Stack>
  );
});
