import { Calendar, IRenderActionsProps, Swipeable } from '@/components';
import { DUMMY_EVENTS } from '@/dummy';
import { IEventType } from '@/types';
import { formatDate, getToday } from '@/utils';
import { memo, useState } from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { useDidUpdate } from 'rooks';
import { getTokenValue, Stack, Text } from 'tamagui';

export const OrganizationHomeSubScreen = memo(() => {
  const { today } = getToday();
  const [selectedDate, setSelectedDate] = useState<string>(today);
  const [currentEvents, setCurrentEvents] = useState<IEventType[]>([]);
  const AnimatedStack = Animated.createAnimatedComponent(Stack);

  useDidUpdate(() => {
    const events = DUMMY_EVENTS.filter(({ eventDateYear, eventDateMonth, eventDateDay }) => {
      const eventDate = formatDate({
        year: eventDateYear,
        month: eventDateMonth,
        day: eventDateDay,
      });
      return eventDate.dateString === selectedDate;
    });
    setCurrentEvents(events);
  }, [selectedDate]);

  const swipeableContentWidth = getTokenValue('$size.x10');
  const LeftSwipeableComponent = memo<IRenderActionsProps>(({ drag, onClose }) => {
    const styledAnimation = useAnimatedStyle(() => ({
      transform: [{ translateX: drag.value - swipeableContentWidth }],
    }));
    return (
      <AnimatedStack
        style={[styledAnimation, { borderWidth: 1 }]}
        width={swipeableContentWidth}
        justify="center"
        items="center"
        onPress={onClose}>
        <Text>Left Action</Text>
      </AnimatedStack>
    );
  });

  return (
    <Stack flex={1} width="$fluid" justify="space-between" items="center">
      <Calendar value={selectedDate} onDayChange={setSelectedDate} />
      <Stack flex={1} width="$fluid" justify="center" items="center">
        {currentEvents.map((event) => {
          return (
            <Swipeable
              key={event.id}
              hasOvershoot={false}
              leftActionsWidth={swipeableContentWidth}
              swipeDirections="left"
              renderLeftActions={({ drag }) => <LeftSwipeableComponent drag={drag} />}>
              <Stack width="$fluid" px="$size.x5" bg="$colors.componentGreen" style={{ borderRadius: 8 }}>
                <Text>{event.eventTitle}</Text>
              </Stack>
            </Swipeable>
          );
        })}
      </Stack>
    </Stack>
  );
});
