import { memo, useState } from 'react';
import { LocaleConfig, Calendar as RNCalendar } from 'react-native-calendars';
import { Stack } from 'tamagui';

LocaleConfig.locales['kr'] = {
  monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘',
};
LocaleConfig.defaultLocale = 'kr';

export const Calendar = memo(() => {
  const [selectedDate, setSelectedDate] = useState<string>('');

  return (
    <Stack width="$fluid" px="$size.x2">
      <RNCalendar
        style={{ width: '100%' }}
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
        }}
        onDayPress={({ dateString }) => {
          setSelectedDate(dateString);
        }}
      />
    </Stack>
  );
});
