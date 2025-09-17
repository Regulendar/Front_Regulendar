type IFormatDateProps =
  | {
      year: number;
      month: number;
      day: number;
    }
  | string;

type IFormatDate = (date: IFormatDateProps) => { year: number; month: number; day: number; dateString: string };

export const formatDate: IFormatDate = (date) => {
  const isDateString = typeof date === 'string';
  if (isDateString) {
    const [yearString, monthString, dayString] = date.split('-');
    const year = Number(yearString);
    const month = Number(monthString);
    const day = Number(dayString);
    return {
      year,
      month,
      day,
      dateString: date,
    };
  }

  const { year, month, day } = date;
  const yearString = year.toString();
  const monthString = month < 10 ? `0${month}` : `${month}`;
  const dayString = day < 10 ? `0${day}` : `${day}`;
  const dateString = `${yearString}-${monthString}-${dayString}`;
  return { year, month, day, dateString };
};
