import { DUMMY_EVENTS } from '@/dummy';
import { IEventType } from '@/types';
import { formatDate, getToday } from '@/utils';
import { memo, useCallback, useState } from 'react';
import { DateData, LocaleConfig, Calendar as RNCalendar } from 'react-native-calendars';
import { useDidMount } from 'rooks';
import { Circle, Stack, Text } from 'tamagui';

LocaleConfig.locales['kr'] = {
  monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘',
};
LocaleConfig.defaultLocale = 'kr';

type IDayComponentProps = {
  date: DateData;
};

type ICalendarProps = {
  value: string;
  onDayChange: (date: string) => void;
};

export const Calendar = memo<ICalendarProps>(({ value, onDayChange }) => {
  const { today, month } = getToday();

  const [monthEvents, setMonthEvents] = useState<IEventType[]>(DUMMY_EVENTS);
  const [selectedDate, setSelectedDate] = useState<string>(value);
  //TODO(@Milgam06): 월별 이벤트 불러오기

  useDidMount(() => {
    console.log(`fetch events for month: ${month}`);
  });

  const DayComponent = memo<IDayComponentProps>(({ date: { dateString, day } }) => {
    const isSelected = selectedDate === dateString;
    const isToday = today === dateString;
    const hasEvent = monthEvents.some((event) => {
      const { dateString: eventDateString } = formatDate({
        year: event.eventDateYear,
        month: event.eventDateMonth,
        day: event.eventDateDay,
      });
      return eventDateString === dateString;
    });
    const todayTextColor = isToday ? '$colors.componentGreen' : '$colors.black';
    const dayTextColor = isSelected ? '$colors.white' : todayTextColor;
    const backgroundColor = isSelected ? '$colors.componentGreen' : 'transparent';
    const dayTextFontWeight = isSelected ? 700 : 500;

    const onDayPress = useCallback(() => {
      onDayChange(dateString);
      setSelectedDate(dateString);
    }, [dateString]);
    return (
      <Stack
        width="$fluid"
        aspectRatio={1}
        justify="space-between"
        items="center"
        bg={backgroundColor}
        gap="$size.x1"
        style={{
          borderRadius: 6,
          paddingVertical: 8,
        }}
        onPress={onDayPress}>
        <Text fontSize="$6" fontWeight={dayTextFontWeight} color={dayTextColor}>
          {day}
        </Text>
        {hasEvent && <Circle size="$x1_5" bg={isSelected ? '$colors.white' : '$colors.componentGreen'} />}
      </Stack>
    );
  });

  return (
    <Stack width="$fluid" px="$size.x2">
      <RNCalendar
        style={{ width: '100%' }}
        markingType="custom"
        markedDates={{
          [selectedDate]: {
            selected: true,
            marked: true,
            selectedColor: '#3ABF67',
          },
        }}
        monthFormat="MM월"
        theme={{
          todayTextColor: '#00B906',
          textDayFontWeight: 700,
          textDayFontSize: 18,
          textDayHeaderFontWeight: 900,
          textDayHeaderFontSize: 16,
          calendarBackground: 'transparent',
          weekVerticalMargin: 2,
        }}
        dayComponent={({ date }) => {
          const hasNotDate = !date;
          if (hasNotDate) return;
          return <DayComponent date={date} />;
        }}
        onMonthChange={({ month }) => {
          console.log('month changed', month);
        }}
        hideExtraDays
      />
    </Stack>
  );
});
