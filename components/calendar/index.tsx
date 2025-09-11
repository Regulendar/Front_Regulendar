import { memo, useMemo, useState } from 'react';
import { DateData, LocaleConfig, Calendar as RNCalendar } from 'react-native-calendars';
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
  isMarked?: boolean;
};

export const Calendar = memo(() => {
  const today = useMemo(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const monthString = month < 10 ? `0${month}` : `${month}`;
    const day = date.getDate();
    const dayString = day < 10 ? `0${day}` : `${day}`;
    const todayDateString = `${year}-${monthString}-${dayString}`;
    return todayDateString;
  }, []);
  const [selectedDate, setSelectedDate] = useState<string>(today);

  const DayComponent = memo<IDayComponentProps>(({ date, isMarked }) => {
    const isSelected = selectedDate === date.dateString;
    const isToday = today === date.dateString;
    const day = date.day;
    const todayTextColor = isToday ? '$colors.componentGreen' : '$colors.black';
    const dayTextColor = isSelected ? '$colors.white' : todayTextColor;
    const backgroundColor = isSelected ? '$colors.componentGreen' : 'transparent';
    const dayTextFontWeight = isSelected ? 700 : 500;
    return (
      <Stack
        width="$fluid"
        aspectRatio={1}
        justify="space-between"
        items="center"
        bg={backgroundColor}
        style={{ borderRadius: 6, paddingVertical: 6 }}
        onPress={() => {
          setSelectedDate(date.dateString);
        }}>
        <Text fontSize="$6" fontWeight={dayTextFontWeight} color={dayTextColor}>
          {day}
        </Text>
        {isSelected && <Circle size="$x1_5" bg={isSelected ? '$colors.white' : '$colors.backgroundBlack'} />}
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
          weekVerticalMargin: 4,
        }}
        dayComponent={({ date }) => {
          const hasNotDate = !date;
          if (hasNotDate) return;
          return <DayComponent date={date} />;
        }}
        hideExtraDays
        onDayPress={({ dateString }) => {
          setSelectedDate(dateString);
        }}
      />
    </Stack>
  );
});
