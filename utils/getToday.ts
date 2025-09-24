type IGetToday = () => { today: string; month: number; year: number; day: number };

export const getToday: IGetToday = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const monthString = month < 10 ? `0${month}` : `${month}`;
  const day = date.getDate();
  const dayString = day < 10 ? `0${day}` : `${day}`;
  const today = `${year}-${monthString}-${dayString}`;
  return { today, month, year, day };
};
