import { Calendar, IRenderActionsProps, Swipeable } from '@/components';
import { DUMMY_EVENTS } from '@/dummy';
import { IEventType } from '@/types';
import { formatDate, getToday } from '@/utils';
import { memo, useState } from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { useDidUpdate } from 'rooks';
import { getTokenValue, ScrollView, Stack, Text } from 'tamagui';

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

  const swipeableContentWidth = getTokenValue('$size.x30');
  const swipeableContentMarginX = getTokenValue('$size.x1');
  const LeftSwipeableComponent = memo<IRenderActionsProps>(({ drag, onClose }) => {
    const swipeLength = swipeableContentWidth + swipeableContentMarginX;
    const styledAnimation = useAnimatedStyle(() => ({
      transform: [{ translateX: drag.value - swipeLength }],
    }));
    return (
      <AnimatedStack
        style={[styledAnimation, { borderRadius: 8, marginLeft: swipeableContentMarginX }]}
        width={swipeableContentWidth}
        borderWidth="$size.x0_5"
        justify="center"
        items="center"
        onPress={onClose}>
        <Text>Left Action</Text>
      </AnimatedStack>
    );
  });

  const RightSwipeableComponent = memo<IRenderActionsProps>(({ drag, onClose }) => {
    const swipeLength = swipeableContentWidth + swipeableContentMarginX;
    const styledAnimation = useAnimatedStyle(() => ({
      transform: [{ translateX: drag.value + swipeLength }],
    }));
    return (
      <AnimatedStack
        style={[styledAnimation, { borderRadius: 8, marginRight: swipeableContentMarginX }]}
        width={swipeableContentWidth}
        borderWidth="$size.x0_5"
        justify="center"
        items="center"
        onPress={onClose}>
        <Text>Right Action</Text>
      </AnimatedStack>
    );
  });

  return (
    <Stack flex={1} width="$fluid" justify="space-between" items="center">
      <Calendar value={selectedDate} onDayChange={setSelectedDate} />
      <ScrollView flex={1} width="$fluid">
        <Stack flex={1} width="$fluid" gap="$size.x2">
          {currentEvents.map((event) => {
            return (
              <Swipeable
                key={event.id}
                hasOvershoot={false}
                leftActionsWidth={swipeableContentWidth}
                swipeDirections="both"
                rightActionsWidth={swipeableContentWidth}
                renderRightActions={({ drag, onClose }) => <RightSwipeableComponent drag={drag} onClose={onClose} />}
                renderLeftActions={({ drag, onClose }) => <LeftSwipeableComponent drag={drag} onClose={onClose} />}
                containerStyle={{ paddingHorizontal: 8 }}>
                <Stack
                  width="$fluid"
                  px="$size.x5"
                  py="$size.x8"
                  borderWidth="$size.x0_5"
                  borderColor="$colors.mediumGray"
                  style={{ borderRadius: 8 }}>
                  <Text>{event.eventTitle}</Text>
                  <Text>{event.eventDuration}</Text>
                </Stack>
              </Swipeable>
            );
          })}
        </Stack>
      </ScrollView>
    </Stack>
  );
});
