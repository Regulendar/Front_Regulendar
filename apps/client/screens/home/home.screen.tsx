import { Calendar } from '@/apps/components';
import { DUMMY_EVENTS } from '@/dummy';
import { IEventType } from '@/types';
import { formatDate, getToday } from '@/utils';
import { memo, useState } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useDidUpdate } from 'rooks';
import { Stack, Text } from 'tamagui';

export const HomeScreen = memo(() => {
  const { today } = getToday();
  const [selectedDate, setSelectedDate] = useState<string>(today);
  const [currentEvents, setCurrentEvents] = useState<IEventType[]>([]);

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

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1 }}>
      <Stack flex={1} width="$fluid" justify="space-between" items="center">
        <Calendar value={selectedDate} onDayChange={setSelectedDate} />
        <Stack flex={1} width="$fluid" justify="center" items="center">
          {currentEvents.map((event) => {
            return <Text key={event.id}>{event.eventTitle}</Text>;
          })}
        </Stack>
      </Stack>
    </SafeAreaView>
  );
});
